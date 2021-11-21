import { ModuleMetadata } from "@nestjs/common";
import { ConnectionOptions, JetStreamOptions, PubAck, StreamConfig } from "nats";

export interface NatsJetStreamClientOptions {
  streamConfig: Partial<StreamConfig>;
  connectOptions: ConnectionOptions;
  //TODO: Add jetstremoptions?
}

export interface NatsJetStreamClientAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory: (
    ...args: any[]
  ) => Promise<NatsJetStreamClientOptions> | NatsJetStreamClientOptions;
  inject?: any[];
}

export interface NatsJetStreamServerOptions {
  id: string;
  connectionOptions: ConnectionOptions;
  consumerOptions: Partial<ServerConsumerOptions>;
  jetStreamOptions?: JetStreamOptions;
}

export interface ServerConsumerOptions {
  // https://nats.io/blog/jetstream-java-client-03-consume/
  durable?: boolean;
  deliverPolicy?:
    | "All"
    | "Last"
    | "New"
    | "ByStartSequence"
    | "ByStartTime"
    | "last_per_subject";
  startSequence?: number;
  startAtTimeDelta?: number;
  startTime?: Date;
  deliverTo?: string;
  deliverToSubject?: string;
  ackPolicy?: "Explicit" | "All" | "None";
  ackWait?: number;
  maxAckPending?: number;
  replayPolicy?:
    | "Instant"
    | "All"
    | "ByStartSequenc"
    | "ByStartTime"
    | "Original";
  maxDeliver?: number;
  filterSubject?: string;
  sampleFrequency?: string;
  idleHeartbeat?: number;
  flowControl?: boolean;
  maxwaiting?: number;
  maxMessages?: number;
  manualAck?: boolean;
  limit?: number;
  description?: string;
  sample?: number;
  orderedConsumer?: boolean;
  deliverGroup?: string;
  headersOnly?: boolean;
  idleHeartBeat?: number;
  ordreredConsumer?: boolean;
  maxWaiting?: number;
}

export interface NatsJetStreamPubAck extends PubAck {}