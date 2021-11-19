import {
  CustomTransportStrategy,
  Server,
  Transport,
} from "@nestjs/microservices";
import {
  Codec,
  connect,
  ConnectionOptions,
  consumerOpts,
  ConsumerOpts,
  createInbox,
  JetStreamClient,
  JetStreamManager,
  JetStreamOptions,
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

  constructor(private transportID: string, private options: NatsJetStreamServerOptions) {
    super();
    this.sc = StringCodec();
  }

  async listen(callback: () => null) {
    this.nc = await connect(this.options.connectOptions);
    this.jsm = await this.nc.jetstreamManager(this.options.jetStreamOptions);
    this.bindEventHandlers();
    callback();
  }
  close() {
    this.nc.close();
  }

  private createConsumerOptions(subject: string) {
    const opts = consumerOpts();
    opts.durable(`${this.transportID}-${subject.replace('.','_').replace('*', '_ALL')}`);
    opts.manualAck();
    opts.deliverGroup("myservice");
    opts.deliverTo(createInbox());
    return opts
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
        for await (const msg of subscription) {
          const data = this.sc.decode(msg.data);
          const context = new NatsJetStreamContext([msg]);
          const stream = this.transformToObservable(
            await handler(data, context)
          );
          this.send(stream, () => null);
        }
        this.logger.log(`Subscribed to ${subject}`);
      } catch (err) {
        console.log(err.message, subject);
      }
    });
  }
}
