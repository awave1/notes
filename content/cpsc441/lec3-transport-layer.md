---
title: 'Transport Layer'
date: '2019-01-28'
description: ''
published: false
tags: ['cpsc441']
---

<!--TODO: Add info from ch3 and lecture notes -->

## Transport layer services

Transport services and protocols provide **logical communication** between app processes running on different hosts. Transport protocols run on end systems:

- Send side: breaks app messages into **segments** and passes to network layer
- Receive side: reassambles segments into messages and passes to application layer

There are more than one transport protocol available to applications. The ones that are used in the Internet are TCP and UDP.

**Network layer**: logical communication between hosts.

**Transport layer**: logical communication between processes. It relies on and enhances network layer services.

## Multiplexing and demultiplexing

At the destination host, the transport layer has the responsibility of delivering the data in the received segments. Each received transport-layer segment has a set of fields in the segment to determine appropriate socket for each segment. At the receiving end, the transport layer examines these fields to identify receiving sockets and direct segments to those sockets. **Demultiplexing** is the process of delivering the data in a transport-layer segment to the correct socket. The job of gathering data chunks at the source host from different sockets, encapsulating each data chunk with header information, that later will be used in *demultiplexing*, to create segments, and passing the segments to the network layers is called **multiplexing**.

Mux/demux communication:

- one-to-many communication, with UDP server
- one-to-many communication, TCP communication:
  - TCP: one socket to one client

---

- **Multiplexing (mux) at sender**: handle data from multiple sockets, add transport header (later used for demultiplexing).
- **Demultiplexing (demux) at receiver**: use header info to deliver received segments to correct sockets.

### Demultiplexing process

Host receives IP datagrams:

- each datagram has source IP address, destination IP address
- each datagram carries one transport-layer segment
- each segment has source port and destination port

![TCP/UDP segment format](lec3-tcp-udp-segment-format.png)

Host uses **IP addresses & port numbers** to direct segment to appropriate socket.

#### Connectionless multiplexing and demultiplexing

#### Connection-oriented multiplexing and demultiplexing



## Connectionless transport: UDP

- UDP doesn't establish connection, therefore less or no delay
- Simple: no connection state at sender, receiver
- Smaller header size (compare to TCP)
- No congestion control: UDP can blast away as fast as desired

### UDP Checksum

The goal of checksum is to detect errors in transmitted sender.

**Sender**:

- Treat segment contents, including header fields, as sequence of 16-bit integers
- Checksum: addition (one's complement sum) of segment contents
- Sender puts checksum value into UDP checksum field

**Receiver**:

- Compute checksum of received segment
- check if computed checksum equals field value:
  - **no**? - error detected
  - **yes**? - no errors detected.

Example of checksum calculation at the sender:
```
    1 1 1 0 0 1 1 0 0 1 1 0 0 1 1 0
+   1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1
    - - - - - - - - - - - - - - - -
  1 0 0 1 1 1 0 1 1 1 0 1 1 1 0 1 1 // wrap around extra 1
+                                 1
    - - - - - - - - - - - - - - - -
    0 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0
```

Checking checksum at the receiver:
```
    1 1 1 0 0 1 1 0 0 1 1 0 0 1 1 0
    1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1
+   0 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0
    - - - - - - - - - - - - - - - -
  1 0 0 1 1 1 0 1 1 1 0 1 1 1 0 1 1 // wrap around extra 1
+   0 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0
    - - - - - - - - - - - - - - - -
```

## Principles of reliable data transfer

### RDT 1.0

### RDT 2.0

- In real life there are probabilities that checksum will get corrupted, but for this example, checksum is perfect.
- Add a sequence number to packets to deal with packet duplicates
  - checksum will detect sequence number corruption
  - only two sequence numbers are needed (0 & 1)

#### Flaw

What happens if ACK/NAK corrupted?

- sender doesn't know what happened at the receiver
- can't just retransmit possible duplicate

To handle duplicate packets:

- sender retransmits current packet if ACK/NAK corrupted
- sender adds **sequence number** to each packet
- receiver discards (doesn't deliver up) duplicate packet

### RDT 2.1

### RDT 2.2: a NAK-free protocol

Same functionality as RDT2.1, using ACKs only. Instead of NAK, receiver sends ACK for last packet received OK. Receiver must *explicitly* include sequence number of packet being ACKed. Duplicate ACK at sender results in same action as NAK: *retransmit current packet*.

NAK behavior is implemented through *duplicate ACK*.

### RDT 3.0: Channels with errors *and* loss

New assumption: underlying channel can also lose packets (data, ACKs). Checksum, sequence number, ACKs, retransmissions will help, but not by much. Approach: Sender will have a timer; sender waits "reasonable" amount of time for ACK. The time is average round-trip time for packet to get to the server and back. It will retransmit if no ACK received in this time. If packet (or ACK) just delayed and not lost: retransmission will be duplicate, but sequence numbers already handles this. This approach requires countdown timer.

#### Performance

Thruput = amt of data transmitted in 1 round / duration of 1 round = L/(L/R + RTT) (more important to know than U_{sender})

RDT 3.0 is correct, but performance is bad. e.g. 1 Gbps link, 15 ms prop. delay, 8000 bit packet:

$$
D_{trans} = \frac{L}{R} = \frac{8000 \text{bits}}{10^9 \text{bits/s}} = 8 \cdot 10^{-6} s
$$

$U_{sender}$: **Utilization** - fraction of time sender busy sending:

$$
U_{sender} = \frac{D_{trans}}{RTT + D_{trans}} = \frac{0.008}{30.008} = 0.00027
$$

And throughput:

$$
Tput = \frac{8000}{D_{trans} + 30 \cdot 10^{-3}} = 33 kB(yes)/s
$$


if $RTT = 30msec$, 1 KB packet every 30 msec: $33 kB/s$ throughput over 1Gbps link.

### Pipelined protocols

**Pipelining**: sender allows multiple "in-flight", yer ro be acknowledged packets.

Go-back-N (easier to implement for both sender and receiver):

- Sender can have up to $N$ unacked packets in pipeline
- receiver only sends **cumulative ack**
  - doesn't ack packet if there's a gap
- Sender has timer for oldest unacked packet
  - when timer expires, retransmit *all* unacked packets

Selective Repeat:

- Sender can have up to $N$ unacked packets in pipeline
- Receiver sends **individual ack** for each packet
- Sender maintains timer for each unacked packet
  - when timer expires, retransmit only that unacked packet


#### Go-Back-N



#### Selective Repeat


## Connection-oriented transport: TCP

### Segment structure

### Reliable data transfer

### Connection management

## TCP congestion control

### Segment structure

SampleRtt

$$
EstimatedRTT = (1 - a) * EstimateRTT + a * SampleRTT
$$

$$
dev = |EstimatedRTT - SampledRTT| \\
DevRTT = (1 - b) * DevRTT + b_{dev}
$$

### Reliable data transport

TCP creates reliable data transport service on top of IP's unreliable service:

- pipelined segments
- cumulative acks
- single retransmission timer

#### Sender events

Data received from app:

- create segment with sequence number
- sequence number is byte-stream number of first data byte in segment
- start timer if not already running
  - think of timer as for oldest unacked segment
  - expiration interval `TimeOutInterval`

Timeout:

- **retransmit segment that caused timeout**
- restart timer

ack received:

- if ack acknowledges previously unacked segments
  - update what is known to be acked
  - start timer if there are still unacked segments
