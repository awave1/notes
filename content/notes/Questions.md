---
attachments: [Clipboard_2019-11-28-12-57-34.png, Clipboard_2019-11-28-13-05-33.png]
tags: [cpsc571]
title: Questions
created: '2019-11-28T19:46:17.307Z'
modified: '2019-11-28T20:37:48.604Z'
---

# Questions

1. **Transaction Management**. Are the following histories conflict serializable? If so, provide the serial execution

$$
a) r_1(x) \prec w_2(y) \prec r_3(z) \prec w_3(z) \prec r_1(z) \prec w_2(x) \prec r_2(x)
$$


Conflicting operations: Two operations are said to be conflicting if all conditions satisfy:

* They belong to different transactions
* They operate on the same data item
* At Least one of them is a write operation


1. write down all of the transactions: $T_1$, $T_2$, $T_3$. (these will be nodes)
2. find a write operation. write can always be in conflict. read only in conflict with write
3. same transaction cannot be in conflict with itself

![](@attachment/Clipboard_2019-11-28-12-57-34.png)

it is conflict serializable: the order is $T_3 \to T_2 \to T_1$

$$
b) r_1(x) \prec r_2(y) \prec w_1(x) \prec w_2(y) \prec r_1(y) \prec w_1(y) \prec r_2(x) \prec w_2(x)
$$

1. $T_1$, $T_2$
2. ![](@attachment/Clipboard_2019-11-28-13-05-33.png)

---

2. **Recoverability** For each of the following histories, identify their most restrictive recoverability status and if they are conflict serializable, provice the serialization order or indicate they are not in RCA.

* do the serialization first
* figure out recoverability

1. a) serializable. b) look at the order of the commits

---
$T_i$ reads x from $T_j$

1. RC (Recoverable): $c_j \prec c_i$
2. ACA (Avoids casacading aborts): $c_j \prec r_i(x)$
3. ST (Strict): $c_j \prec (r|w)_i(x)$ (o is any op (read or write))

