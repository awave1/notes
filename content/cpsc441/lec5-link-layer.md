---
title: 'Link Layer'
date: '2019-03-13'
description: 'Chapter 6'
published: false
tags: ['cpsc441']
---

## Introduction

On the link layer, hosts and routers are referred to as **nodes**. Communication channels that connect adjacent nodes along communication path are called **links**. There are two types of links: _wired_ and _wireless_.

Packets on link layer are called **frames**. Data-link layer has responsibility of transferring datagram from one node to **physically adjacent** node over a link.

Datagrams can be transferred by different link protocols over different links: e.g. ethernet on one link and 802.11 on another link. Each link protocol provides different services, may or may not provide rdt over link.

**Link layer services**

- **Framing, link access**
  - Encapsulate datagram into a frame, adding header
  - Channel access, if shared medium
  - MAC addresses used in frame headers to identify source, dest (different from IP addresses)
- **Reliable delivery between adjacent nodes**
  - Error rate is low in wired connections. Seldom used on low bit-error link
  - Wireless links: high error rates, uses **stop-and-wait**
  - Assume RDT is implemented in link layer (no data is lost):
    - TCP will still be required in case if nodes are faulty
- **Flow control**
  - Pacing between adjacent sending and receiving nodes
- **Error detection**
  - Errors caused by signal attenuation, noise
  - Receiver detects presence of errors:
    - Signals sender for retransmission or drops frame
- **Error correction**
  - Receiver identifies _and corrects_ bit errors without resorting to retransmission
- **Half-duplex and full-duplex**
  - With half duplex, nodes at both ends of link can transmit, but not at the same time

**Where is the link layer implemented**

Link layer is implemented in each and every node. Link layer implemented in adapter, **network interface card**, or a chip, which implement physical layer:

- Ethernet card, 802.11 card
- Implements link, physical layer

Interface card attaches to a system bus. It is a combination of hardware, software, firmware.

**Communication**

- Sending side
  - Encapsulates datagram in frame
  - Adds error checking bits, rdt, flow control, etc.
- Receiving side
  - Looks for errors, rdt, flow control, etc
  - Extracts datagram, passes to upper layer at receiving side

## Error detection, correction

- **Error Detection and Correction (EDC)** bits for redundancy
- **Data (D)** protected by error checking, may include header fields

Error detection is **not** 100% reliable:

- protocol may miss some errors, but rarely
- larger EDC field yields better detection and correction

### Parity checking

**Single bit parity**: detects single bit errors

- XOR all bits together, and check result against **parity bit**

**Two dimensional bit parity**: detect and _correct_ single bit errors

### Cyclic redundancy check

- generator: r + 1
- divide D/(r + 1)
  - remainder will have R bits, if divisor is R + 1

**Example**:

```
D = 101110

R = - - -

[   D   ][ R ]

G = 1001

---

101110000 (last three bits are CRC)

101110000/1001

    101110000
xor 1001
    ---------
    00101
```

## Multiple access protocols

Two types of links:

- **Point to point**
  - PPP for dial-up access
  - Point-to-point link between Ethernet switch, host
- **Broadcast** (shared wire or medium)
  - upstream HFC
  - 802.11 wireless LAN

### Multiple access protocols

Single shared broadcast channel. Two or more simultaneous transmissions by nodes: interference. **Collision** if node receives two or more signals at the same time.

**Multiple access protocol**: algorithm determines how nodes share channel, i.e. determine when node can transmit.

**Ideal multiple access protocol**

Given: broadcast channel of rate $R$ bps.

1. When one node wants to transmit, it can send at rate $R$
2. When $M$ nodes want to transmit, each can send at average rate $R/M$
3. Fully decentralized:
   - no special node to coordinate transmission
   - no synchronization of clicks, slots
4. Simple

### MAC protocols: taxonomy

<!-- TODO -->

**TDMA**:

M users. 1 active user -> Tput = R/M

M active users -> each user gets R/M

**FDMA**:

### Random access protocols

#### ALOHA

Developed in 1970's in University of Hawaii by Norman Abramson.

- A user transmits at will, random access
- If two or more messages overlap in time, there's a collision
- Sender waits for roundtrip time plus a fixed delay
  - lack of ACK = collision

**Slotted ALOHA**

## LANs

### Addressing, ARP

### Ethernet

### Switches
