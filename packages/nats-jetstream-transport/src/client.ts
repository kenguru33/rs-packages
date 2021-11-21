import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy, ReadPacket, WritePacket} from "@nestjs/microservices";
import {Codec, connect, JetStreamClient, NatsConnection, StringCodec,} from "nats";
import {NATS_JETSTREAM_OPTIONS} from "./constants";
import {NatsJetStreamClientOptions} from "./interfaces";

@Injectable()
export class NatsJetStreamClientProxy extends ClientProxy {
  private nc: NatsConnection;
  private js: JetStreamClient;
  private sc: Codec<string>;

  constructor(
    @Inject(NATS_JETSTREAM_OPTIONS) private options: NatsJetStreamClientOptions
  ) {
    super();
    this.sc = StringCodec();
    options.connectOptions.waitOnFirstConnect = true;
    this.connect();
  }

  async connect(): Promise<JetStreamClient> {
    
    this.nc = await connect(this.options.connectOptions);
    this.js = this.nc.jetstream();
    return this.js;
  }
  close() {
    this.nc.close();
  }

  protected publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void
  ): () => void {
    throw new Error("Method not implemented.");
  }

  protected async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    return this.js.publish(packet.pattern, this.sc.encode(packet.data));
  }
}
