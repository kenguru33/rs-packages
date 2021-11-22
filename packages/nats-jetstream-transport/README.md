# Nats JetStream Transport Module for NestJS

Build Event Driven Microservices Architecture with Nats JetSteam Server and NestJS.



- At-least-once delivery; exactly once within a window

- Store messages and replay by time or sequence

- Wildcard support

- Account aware

- Data at rest encryption

- Cleanse specific messages (GDPR)

- Horizontal scalability

- Persist Streams and replay via Consumers



## Install

```bash
npm i @nestjs/microservices
npm i @nestjs-plugins/nestjs-nats-jetstream-transport
```

## Runnin Nats Jetstream server in Docker

```bash
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats -js -m 8222
```



### NatsJetStreamServerOptions

- **ConnectionOptions** - Server connection options.

- **ServerConsumerOptions** - Consumer options.

- **JetStreamOptions** - JetStream options.



### NatsJetStreamClientOptions

- **ConnectionOptions** - Server connection options

- **StreamConfig** - Stream configuration

- **JetStreamOptions**  - JetStream options

- **JetStreamPublishOptions** - Publish options



### ServerConsumerOptions

- **durable**: boolean (default: false) - Durable subscriptions remember their position even if the client is disconnected.

- **deliveryPolicy**: All | Last | New | ByStartSequence | ByStartTime | last_per_subject (default: All) - Specify where in the stream it wants to start receiving messages.

- **startSequence**: number - If deliveryPolicy is set to ByStartSequence this will specify the sequence number to start on.

- **startAtTimeDelta**: number - If If deliveryPolicy is set to ByStartTime this will specify a delta time in the stream at which to start.

- **startTime**: Date - If deliveryPolicy is set to ByStartTime this will specify the time in the stream at which to start. It will receive the closest available message on or after that time.

- **deliverTo**: string - Queue group, a balanced message delivery across a group of subscribers.

- **deliverToSubject**: string - The subject to deliver observed messages. Not allowed for pull subscriptions. Deliver subject is required for queue subscribing as it configures a subject that all the queue consumers should listen on.

- **ackPolicy**: Explicit | All | None (default: Excplicit ) - How messages should be acknowledged. If an ack is required but is not received within the AckWait window, the message will be redelivered. Excplicit is the only allowed option for pull consumers.

- **ackWait**: number (default: 30000 ) - the time in nanoseconds that the server will wait for an ack for any individual message. If an ack is not received in time, the message will be redelivered.

- **maxAckPending**: number (default: 1024) - The maximum number of messages the subscription will receive without sending back ACKs.

- **replayPolicy**: Instant | All | ByStartSequence | ByStartTime (default: Instant) - The replay policy applies when the deliver policy is `All`, `ByStartSequence` or `ByStartTime` since those deliver policies begin reading the stream at a position other than the end. If the policy is `Original`, the messages in the stream will be pushed to the client at the same rate they were originally received, simulating the original timing of messages. If the policy is `Instant` (the default), the messages will be pushed to the client as fast as possible while adhering to the Ack Policy, Max Ack Pending and the client’s ability to consume those messages.

- **maxDeliver**: number (default: ?) - The maximum number of times a specific message will be delivered. Applies to any message that is re-sent due to ack policy.

- **filterSubject**: string - When consuming from a stream with a wildcard subject, the Filter Subject allows you to select a subset of the full wildcard subject to receive messages from.

- **sample**: number - Sets the percentage of acknowledgements that should be sampled for observability, 0-100

- **idleHeartbeat**: number - If the idle heartbeat period is set, the server will send a status message to the client when the period has elapsed but it has not received any new messages. This lets the client know that it’s still there, but just isn’t receiving messages.

- **flowControl**: boolean - Flow control is another way for the consumer to manage back pressure. Instead of relying on the rate limit, it relies on the pending limits of max messages and/or max bytes. If the server sends the number of messages or bytes without receiving an ack, it will send a status message letting you know it has reached this limit. Once flow control is tripped, the server will not start sending messages again until the client tells the server, even if all messages have been acknowledged.

- **maxwaiting**: number - is the number of outstanding pulls that are allowed on any one consumer. Pulls made that exceeds this limit are discarded.

- **maxMessages**: number -

- **manualAck**: boolean - each individual message must be acknowledged.

- **limit**: number - Used to throttle the delivery of messages to the consumer, in bits per second.

- **description**: string - Description text

- **orderedConsumer**: boolean - a specialized push consumer that puts together flow control, heartbeats, and additional logic to handle message gaps. Ordered consumers cannot operate on a queue and cannot be durable.

- **deliverGroup**: string - when set will only deliver messages to subscriptions matching that group.

- **headersOnly**: boolean - configures the consumer to only deliver existing header and the `Nats-Msg-Size` header, no bodies



### ConnectionOptions

- servers: 'localhost:4222',  
  debug: true,  
  name: 'service',  
  ignoreClusterUpdates: true,  
  inboxPrefix: 'mybox',  
  maxPingOut: 1000,  
  tls: null,  
  noEcho: true,  
  maxReconnectAttempts: 3,  
  pass: 'jkj',  
  noRandomize: true,  
  pedantic: true,  
  pingInterval: 1000,  
  port: 4222,  
  reconnect: true,  
  reconnectJitter: 1000,  
  reconnectJitterTLS: 1,  
  reconnectTimeWait: 500,  
  timeout: 10000,  
  token: 'jkjkjk',  
  user: 'user',  
  verbose: true,  
  waitOnFirstConnect: true,


