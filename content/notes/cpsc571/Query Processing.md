---
tags: [cpsc571]
title: Query Processing
created: '2019-10-10T19:00:03.240Z'
modified: '2019-10-17T19:26:19.968Z'
---

# Query Processing

$$
\begin{gathered}
  \frac{|R|}{bfr} + \frac{1}{B}
\end{gathered}
$$

### INGRES Algorithm

1. Decompose each multi-variable query into a sequence of mono-variable queries with a common value.
2. Process each by a one variable query processor
    - Choose an initial execurion plan (heuristics)
    - Order the rest by considering intermediate relation sizes

Note: No statistical information is stored.

#### Decomposition

Replace an $n$ variable query $q$ by a series of queries: $q_1 \to q_2 \to \dots \to q_n$, where $q_i$ uses result of $q_{(i - 1)}$.

<!-- TODO -->

#### Detachment

1. $q$:
```sql
SELECT V2.A2, V3.A3, ..., Vn.An
FROM R1 V1, ..., Rn Vn
WHERE P1(V1.A`1) AND P2(V1.A1, V2.A2, ..., Vn.An)
```
2. $q'$:
```sql
SELECT // TODO
```

3. $q$:
```sql
SELECT // TODO
```

##### Example

Find names of employees working on "CAD/CAM" project

$q'$

```sql
SELECT EMP.ENAME
FROM EMP, ASG, PROJ
WHERE EMP.ENO = ASG.ENO AND ASG.PNO = PROJ.PNO AND PROJ.PNAME = "CAD/CAM"
```

$q_{11}$

```sql
SELECT PROJ.PNO INTO JVAR
FROM PROJ
WHERE PROJ.PNAME = "CAD/CAM"
```

$q'$

```sql
SELECT EMP.ENAME
FROM EMP, ASG, JVAR
WHERE EMP.ENO = ASG.ENO AND ASG.PNO = JVAR.PNO
```

$q_{12}$

```sql
SELECT ASG.ENO INTO GVAR
FROM ASG, JVAR
WHERE ASG.PNO = JVAR.PNO
```

$q_{13}$
```sql
SELECT EMP.ENAME
FROM EMP, GVAR
WHERE EMPT.ENO = GVAR.ENO
```

#### Tuple Substitution

$q_{11}$ is a mono-variable. $q_{12}$ and $q_{13}$ is subject to tuple substitution, going through a process reading the data. Assume `GVAR` hastwo tuples only, i.e. `E1` and `E2`. Then $q_{13}$ is tuple substituted as:

$q_{131}$
```sql
SELECT EMP, ENAME
FROM EMP
WHERE EMP.ENO = "E1"
```

$q_{132}$
```sql
SELECT EMP.ENAME
FROM EMP
WHERE EMP.ENO = "E2"
```

### What is the engine thinking?

Display the system's query execution plan. Helps with optimizing the queries. e.g. Oracle sytax is: `EXPLAIN PLAN FOR {SQL query}`
