---
title: Theoretical Query Language
date: '2018-12-25'
path: '/cpsc101/w1/lecture1'
---

**Outline**:

1. Formulate queries using relational algebra
2. Formulate queries using relational calculus
3. Differentiate between procedural and non procedural languages
4. Construct queries with complex logic requirements

## Relational algebra

Relational algebra gives us basic set of operations for the relational model. It enables a user to specify **queries**. **Queries** - questions submitted to database. The result of an operation is a **new relation**, which may have been formed from one or more **input** relations. This property makes the algebra _closed_. **Closure** - result of query results in a new relation.

### Operations

- Unary relation operations
  - `SELECT` $`\sigma`$
  - `PROJECT` $`\pi`$
  - `RENAME` $`\rho`$
- ## Relational Algebra operations from set theory
  - `UNION`,`INTERSECTION`, `DIFFERENCE` (or `MINUS` (-))
  - `CARTESIAN PRODUCT`
- Binary relational operations
  - `JOIN`
  - `DIVISION`
- Additional relational operations
  - `OUTER JOIN`, `OUTER UNION`
  - Aggregate functions: `SUM`, `COUNT`, `AVG`, `MIN`, `MAX`

#### SELECT

Selects a **subset** of the tuples from a relation based on a **selection condition**.

```math
\sigma_{condition} (R)
```

**Examples**:

1.

```sql
SELECT THE EMPLOYEE TUPLES WHOSE DEPARTMENT NUMBER IS 4
```

```math
\sigma_{DNO = 4} (EMPLOYEE)
```

2.

```sql
SELECT THE EMPLOYEE TUPLES WHOSE SALARY IS GREATER THAN 30000
```

```math
\sigma_{Salary > 30000} (EMPLOYEE)
```

**Properties of SELECT**:

- The `SELECT` $`\sigma_{condition} (R)`$ operation produces a relation S that has the same schema as R
- `SELECT` \\$`\sigma`\$ is commutative: \$`\sigma\_{c1}(\sigma\_{c2} (R)) = \sigma\_{c2}(\sigma\_{c1} (R))`\$
  - Cascade of `SELECT` operations may be applied in any order
- Cascade of `SELECT` operations may be replaced by a single selection with a conjunction of all the conditions: $`\sigma_{c1} (\sigma_{c2} (R)) = \sigma{c1 AND c2} (R)`$
- The number of tuples in the resullt of a `SELECT` is less than (or equal to) the number of tuples in the input relation R

#### PROJECT $`\pi_{attr} (R)`$

Subset of attributes.

```math
\pi_{attrs}(R)
```

Attributes have to be attributes of $`R`$.

Example: $`\pi{lname, fname, salary} (EMPLOYEE)`$

![01.png](cpsc471/img/lec05/01.png)

If there are any duplicates, they will be eliminated because the result is a set.

`PROJECT` removes any duplicate tuples in the result. Number of tuples in the result of projection is always less or equal to the number. If the list of attributes includes a **key** of R, then the number of tuples in the result is **equal** to the number of tuples in R. `PROJECT` is **not commutative**.

##### Example

Retreive the first name, last name and salary of all employees who work in dep. #5.

- We can write a single relational algebra expression: $`\pi_{fname, lname, salary} (\sigma_{dno=5} (EMPLOYEE))`$
- We can explicitly show the sequence of operations

```math
DEPT_EMPL = \sigma_{dno=5} (EMPLOYEE) \\
RESULT = \pi_{name} (DEPT_EMPL)
```

#### RENAME

Rename operator $`\rho_{s} (R)`$ renames R to S.

- $`\rho_{b_1, b_2, ... b_n}(R)`$ renames R's attributes to (b1, b2, ...bn).

#### Set Operations

- R union S = all tuples in R or in S
  - no duplicates
- R intersect S = all tuples in R and in S
  - Common elements

##### Example

Q: Retrieve the SSN of all employees who either work in dep. 5 or directly supervise an employee who works in dep. 5.

```math
DEP5_EMPS = \sigma_{ono=5} (EMPLOYEE) \\
RES1 = \pi_{ssn} (DEP5_EMPS) \\
RES2(SSN) = \pi_{super_ssn} (DEP5_EMPS) \\
RES = RES1 \cup RES2
```

The union operation produces the tuples that are in either RES1 or RES2 or both.

#### Cartesian Product

```math
R(a_1, )
```

##### Example

```math
FEM_EMP = \sigma_{sex=f} (EMPLOYEE) \\
NAMES = \pi_{fname, lnamem ssn} (FEM_EMP) \\
EMP_DEPS = NAMES \times FEM_EMP \\
ACTUAL_DEPS = \sigma_{ssn=essn} (EMP_DEPS)
```

Or in english: the name of female employees and their dependents and their dependents.

#### JOIN

JOIN operation $`\Join`$

- The sequence of Cartesian Product followed by SELECT combined into single JOIN operation.
- The operation is very important for any relational database with more than a single relation, because it allows to **combine related tuples** from various relations.
- The general from of a JOIN: $`R \Join_{join condition} S`$, where R and S can be any relations that result from general relational algebra expression.

**Properties of JOIN**:

- $`R(a_1, a_2, ...a_n) \Join_{R.a_i = S.b_j} S(b_1, b_2, b_m)`$
- Result is a relation Q with degree n + m attributes: $`Q(a_1, a_2, a_n b_1, b_2, b_n)`$ in that order.
- The resulting relation state has one tuple for each combination of tuples - r from R and s from S but only if they satisfy the join condition \$`r[a_i] = s[b_j]`$. Hence if R has $`n_r`$ tuples and S has $`n_s`$ tuples, then the join result will generally have less than $`n_r * n_s`\$ tuples.
- Only related tuples (based on the join condition) will appear in the result

The general case of JOIN operations is called theta-join: $`R \Join_{theta} S`$. The join condition is called **theta**. **Theta** can be any general boolean expression on the attributes of R and S

##### EQUIJOIN

The most common use of join involves join condition with equality comparisons only. Such join where only '=' is used is called an EQUIJOIN. In the result of an EQUIJOIN we always have one or more pairs of attributes (whose names need not be identical) that have identical values in every tuple.

##### NATURAL JOIN

Same as EQUIJOIN, except that the attributes if $`R_2`$ are not included in the resulting relation; if the join attributes have the same names, they do not have to be specified at all.

```math
R_{1} <join> R_2
```

#### DIVISION

The DIVISION operation is applied to two relations. \$`R(Z) \div S(X)`$ where $`X \subset Z`$. Let $`Y = Z - X`$ (hence $`Z = X \cup Y`$), that is let $`Y`$ be the set of attributes of $`R`$ that are not attributes of $`S`\$.

The result of DIVISION is a relation \$`T(Y)`$ that includes a tuple $`t`$ if tuples $`t_R`$ appear in $`R`$ with $`t_R [Y] = t`$ and with $`t_R [X] = t_S`$ for every tuple in $`t_S`$ in $`S`\$.

For every tuple \$`t`$ to appear in the result $`T`$ of the DIVISION, the values in $`t`$ must appear in $`R`$ in combination with **every** tuple in $`S`\$.

![02.png](cpsc471/img/lec05/02.png)

## Additional Relational Operations

### Aggregate Functions and Grouping

- Work on collections of values from the database
- Common functions: SUM, AVERAGE, MAXIMUM, MINIMUM
- The COUNT function is used for counting tuples or values

## Relational Calculus

A **tuple relational calculus** expression creates a new relation, which is specified in terms of variables that range over rows of the stored database relations.

In calculus expression, there is **no order of operations** to specify how to retreive the query result - a calculus expression specifies only what information the result should contain.

Relational calculus is considered to be a **non-procedural** or **declarative** language. This differs from relational algebra, where we must write a sequence of operations to specify a retrieval request, hence relational algebra can be considered as a procedural way of starting a query.

## RA Expressions

Applying several relational algebra operations one after the other:

- A single **relational algebra expression** by nesting operations
- Apply one operation at a time and create **intermediate result relations**
