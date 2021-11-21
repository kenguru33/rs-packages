import { CustomTransportStrategy, Server } from "@nestjs/microservices";
import {
  Codec,
  connect,
  JetStreamManager,
  NatsConnection,
  StringCodec,
} from "nats";
import { NatsJetStreamServerOptions } from "./interfaces";
import { NatsJetStreamContext } from "./nats-jetstream.context";
import { serverConsumerOptionsBuilder } from "./utils/server-consumer-options-builder";

export class NatsJetStreamServer
  extends Server
  implements CustomTransportStrategy
{
  private nc: NatsConnection;
  private jsm: JetStreamManager;
  private sc: Codec<string>;

  constructor(private options: NatsJetStreamServerOptions) {
    super();
    this.sc = StringCodec();
  }

  async listen(callback: () => null) {
    this.nc = await connect(this.options.connectionOptions);
    this.jsm = await this.nc.jetstreamManager(this.options.jetStreamOptions);
    await this.bindEventHandlers();
    callback();
  }

  async close() {
    await this.nc.close();
  }

  private createConsumerOptions(subject: string) {
    const opts = serverConsumerOptionsBuilder(this.options.consumerOptions);
    if (this.options.consumerOptions.durable) {
      opts.durable(
        `${this.options.id}-${subject.replace(".", "_").replace("*", "_ALL")}`
      );
    }
    return opts;
  }

  private async bindEventHandlers() {
    const subjects = Array.from(this.messageHandlers.keys());

    if (!subjects) {
      this.logger.log("No message handlers registered");
    }

    subjects.forEach(async (subject) => {
      const js = this.nc.jetstream();
      const opts = this.createConsumerOptions(subject);
      const handler = this.getHandlerByPattern(subject);
      try {
        const subscription = await js.subscribe(subject, opts);
        this.logger.log(`Subscribed to ${subject}`);
        for await (const msg of subscription) {
          const data = this.sc.decode(msg.data);
          const context = new NatsJetStreamContext([msg]);
          const stream = this.transformToObservable(
            await handler(data, context)
          );
          this.send(stream, () => null);
        }
      } catch (err) {
        console.log(err.message, subject);
      }
    });
  }
}
