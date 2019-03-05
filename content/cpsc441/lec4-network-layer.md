---
title: 'Network Layer'
date: '2019-02-11'
description: ''
published: true
tags: ['cpsc441']
---

Goals:

- understand principles behind network layer services, focusing on data plane:
  - forwarding vs. routing
  - how a router works
  - generalized forwarding
- instantiation, implementation in the Internet

Data layer & control plane functionality.

Network layer is divided two sets of functionality _data plane_ and _control plane_.

Network layer provides single logical channel between two hosts. Responsibility of a network layer is to receive data packets, convert them to datagram and transport them to destination host.

## Overview of a Network Layer

The role of the network layer is to move packets from sending host to receiving host. On **sending side**, it encapsulates segments into datagrams. On **receiving side**, it delivers segments to transport layer. Network layer protocols are implemented in _every_ host, router. Router examines header fields in all IP datagrams that are passing through it.

**Network-layer functions**:

- **Forwarding**: When a packet arrives at a router's input link, the router must move thDetermine route taken by packets from source to destination.e packet to the appropriate output link. _Router-local_ action of transferring a packet from an input link interface to the appropriate output link interface.
  - _Analogy_: process of getting through single interchange.
- **Routing**: The network layer must determine the route or path taken by packets as they flow from a sender to a receiver. Routing refers to the _network-wide_ process that determines the end-to-end paths that packets take from source to destination.
  - _Analogy_: process of planning a trip from source to destination.

Every router has a **forwarding table**. A router forwards a packet by examining the value of a field in the arriving packet's header, and then using this header value to index into the router's forwarding table. The value stored in the forwarding table entry for that header indicated the router's outgoing link interface to which that packet is to be forwarded.

### Data Plane & Control Plane

**Data Plane**

Data plane is in charge of local packets, per-router function, aka _local forwarding_. It determines how a datagram arriving on router's input port is forwarded to its output port. **Forwarding function** - the actual transfer of packets from a router's incoming links to the appropriate outgoing links at that router.

**Control Plane**

All about controlling the network, how to find the right path. Control plane implements network-wide logic. It determines how a datagram is routed among routers along end-end path from source to destination host.

Two control plane approaches:

- _Traditional routing algorithms_: implemented in routers (hardware).
- _Software-defined network (SDN)_: implemented in (remote) servers.

#### Per-router control plane

Individual routing algorithm components in **each and every router** that interact in router plane. Every router configures routing (forwarding) table.

![Per-router control plane](lec4-per-router-control-plane.png)

#### Logically centralized control plane

A distinct (typically remote) controller interacts with local control agents (CAs). We separate control functionality and implement it in software in remote controller, e.g. NAS. Remote controller computes routing tables and sends them to other routers.

![Logically centralized control plane](lec4-sdn.png)

A switch/router in this scenario is "dumb", e.g. doesn't rely on hardware control plane implementation, rather makes use of software.

## Router Architecture Overview

![Router architecture](lec4-router-architecture.png)

- _Switching fabric_ - The switching fabric connects the router's input ports to its output ports. The switching fabric is completely contained within the router.
- _Output ports_ - An output port stores packets received from the switching fabric and transmits these packets on the outgoing link by performing the necessary link-layer and physical-layer functions.
- _Routing processor_ - The routing processor executes the routing protocols, maintains routing tables and attached link state information, and computes the routing table for the router.

**Input ports functions**:

At the input port the router has to implement three things; a physical layer, link layer and a network layer. Each of them has its own copy of forwarding table, that makes these ports to work independently from each other.

![Input port](lec4-input-port.png)

- **Physical layer**: bit level reception
- **Data link layer**: e.g. Ethernet
- **Decentralized switching**:
  - Using header field values, lookup output port using forwarding table in input port memory.
  - Queuing: if datagrams arrive faster than forwarding rate into switch fabric
  - _Destination-based forwarding_: forward based only on IP address (traditional).
  - _Generalized forwarding_: forward based on any set of header field values.

**Destination-based forwarding**:

Forwarding table:

| Destination | Interface |
| ----------- | --------- |
| IP          | 0         |
| ...         | ...       |

There are $2^32$ IP addresses. Therefore we will need to store all of them in a table, which is _not feasible_.

Instead, store ranges of destinations, e.g.:

| Destination Address Range                                                  | Interface |
| -------------------------------------------------------------------------- | --------- |
| 11001000 00010111 00010000 00000000 to 11001000 00010111 00010111 11111111 | 0         |
| 11001000 00010111 00011000 00000000 to 11001000 00010111 00011000 11111111 | 1         |
| 11001000 00010111 00011000 00000000 to 11001000 00010111 00011111 11111111 | 2         |
| otherwise                                                                  | 3         |

<mark>Longest prefix matching</mark>: when looking for forwarding table entry for given destination address, use **longest** address prefix that matches destination address.

| Destination Address Range              | Interface |
| -------------------------------------- | --------- |
| `11001000 00010111 00010*** *********` | 0         |
| `11001000 00010111 00011000 *********` | 1         |
| `11001000 00010111 00011*** *********` | 2         |
| otherwise                              | 3         |

### Switching Fabrics

Transfer packet from input buffer to appropriate output buffer. **Switching rate**: rate at which packets can be transferred from inputs to outputs. There are three types of switching fabrics:

![Switching fabrics](lec4-switching-fabrics.png)

- **Bus**: In this approach, an input port transfers a packet directly to the output port over a shared bus, without intervention by the routing processor.
- **Memory**: Implemented in software
- **Crossbar**: Hardware controller that enables appropriate buses for a packet.

#### Output ports

Packet loss can happen at both input ports and output ports.

![Output ports](lec4-output-ports.png)

**Buffering** required from fabric faster rate. Most of buffering is happening at output ports. Datagram (packets) can be lost due to congestion, lack of buffers. Buffering happening because capacity is less than amount of incoming traffic. **Scheduling** datagrams. Priority scheduling - who gets best performance, network neutrality. Net neutrality - do not discriminate packets based on sender.

**What is the right amount of buffer size?**

$$
max tput = C = \frac{W}{RTT} \\
max W = C \cdot RTT \text{ (Delay bandwidth (DB)) }
$$

RFC 3439 rule of thumb: average buffering equals to $RTT$ times link capacity $C$, aka **Delay-Bandwidth Product**.

## IP: Internet Protocol

Internet Protocol is simple but important protocol.
