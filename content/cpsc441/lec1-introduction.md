---
title: 'Computer Networks and the Internet'
date: '2019-01-14'
description: ''
published: false
tags: ['cpsc441']
---

## What is the Internet?

The Internet is a computer network that interconnects millions of devices throughout the world. All of these devices are called **hosts** or **end systems**.

End systems are connected together by a network of **communication links** and **packet switches**. Different links can transmit data at different rates, with the **transmission rate** of a link measured in bps (bits/second). When one host sends data to another, the sending host segments the data and adds header bytes to each segment. The resulting packages of information, called **packets**, are then sent through the network to the destination host, where they are reassembled into the original data.

A packet switch takes a packet arriving on one of its incoming communication links and forwards packeton one of its outgoing communication links. **Routers** and **link-layer switches** are used the most for forwarding packets toward their ultimate destinations.

### A Services Description

End systems attached to the Internet provide **API** that specifies how a program running on one end of the system asks the Internet to deliver data to a specific destination program running on another end system.

### Network Protocols

A **protocol** defines the format and the order of messages exhanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.

## The Network Edge

Network edge contains hosts, clients and servers. Servers often in data centers. At the edge, networks organized as small **access networks**. Edge is connected to the core through **edge routers**.

### Access networks

**Access network** is the network that physically connects an end system to the first router (known as **edge router**) on a path from the end system to any other end system.

#### Digital Subscriber Line (DSL)

A residence typically obtains DSL Internet access from the same telephone company that provides its wired local phone. Each customer's DSL modem uses the same telephone cable. DSL connection therefore is dedicated to the user (e.g. not shared like cable).

## The Network Core

The core is a mesh of interconnected routers. **Packet-switching**: hosts break down data in packages.

### Packet-switching

Delay is calculated using this formula: $D = \frac{L}{R}$

End to end (E2E) transmission delay, with router in the midle:

$$
\frac{L}{R} + \frac{L}{R} = \frac{2L}{R}
$$

### Transmitting Multiple Packets

If we have to send N packets:

```
N packets
[A] --- (R) --- [B]
```

$$
D = N \times \frac{L}{R} + \frac{L}{R}
$$

### Delay, Loss, and Throughput in Packet-Switched Networks

### Circuit Switching
