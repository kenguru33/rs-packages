import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, ReadPacket, WritePacket } from "@nestjs/microservices";
import {
  
  Codec,
  connect,
  ConnectionOptions,
  JetStreamClient,
  JetStreamManager,
  JetStreamOptions,
  NatsConnection,
  PublishOptions,
  StringCodec,
} from "nats";
import { NATS_JETSTREAM_OPTIONS } from "./constants";
import { NatsJetStreamClientOptions } from "./interfaces";

@Injectable()
export class NatsJetStreamClientProxy extends ClientProxy {
  private nc: NatsConnection;
  private js: JetStreamClient;
  // private jsm: JetStreamManager;
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
    // this.jsm = await this.nc.jetstreamManager();
    // await this.jsm.streams.add(this.options.streamConfig);
    // await this.jsm.streams.add({name: 'stream1', subjects: ['user:created']})
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
