---
title: Entity Relationship Model
date: '2018-12-26'
---

**Objective**

1. Understand the components of the Entity-Relationship (ER) model
2. Draw ER diagrams (ERDs)
3. Create data models using ERDs
4. Use Object-Oriented enhancements with ERDs
5. Create data models using Enhanced ERDs (EERDs)

## Methodologies for Coneptual Design

Entety relationship diagram is the most used data modeling tool.

- Entity Relationship diagrams
- Enhanced Entity Relationship (EER) Diagrams
- Use of design tools in industry for designing and documenting large scale designs
- The UML Class diagram diagrams are popular in industry to document conceptual database designs

## Entity Relationship Diagrams

#### Example `COMPANY` Database

We need to create a database schema design based on the following (simplified) **requirements** of the `COMPANY` Database:

- The company is organized into `DEPARTMENTs`. Each department has a name, number and a employee who **manages** the department. We keep track of the start date of the department manager. A department may have several locations
- Each department **controls** a number of `PROJECTs`. Each project has a unique name, number, and is located at a single location
- The database will store each `EMPLOYEE`'s SSN, number, address, salary, sex, and birthdate
  - Each employee **works for** one department but may **work on** several projects
  - The DB will keep track of the number of hours per week that an employee currently works on each project
  - It is required to keep rack of the **direct supervisor** of each employee
- Each employee may **have a number** of `DEPENDENTs`
  - For each dependent, the DB keeps a record of name, sec, birthdate, and relationship to the employee

## ER Model Concepts

**Entities** are the objects for which you need to keep information in database. The `EMPLOYEE` John Smith, the Research Department `DEPARTMENT`, the ProductX `PROJECT`

**Attributes** are properties used to describe an entity. An `EMPLOYEE` entity may have the attributes such as name, ssn, address, etc.

A specific entity will have a value for each of its attributes. For example:

```js
const entity = {
  name: 'John Smith',
  ssn: '123456789',
  address: '123, street',
  sex: 'm',
  bday: '09-jan-55',
};
```

Each attribute has a **value set** (or data type) associated with it e.g integer, string, date, etc.

### Types of Attributes

Can be either **simple** or **composite**

**Simple**: each entity has a single atomic value for the attribute. For example ssn, or sex.

**Composite**: the attribute may be composed of several components. For example name (first, middle, last). Composition may form a hierarchy where some components are themselves composite.

#### Example of a Composite Attribute

![Composite Attribute](cpsc471/img/lec02/01.png)

**Multi-valued**: an entity may have multiple values for that attribute. For example, color of a `CAR` or `PreviousDegrees` of a `STUDENT`. Denoted as `{Color}` or `{PreviousDegrees}`

In general, composite and multi-valued attributes may be nested arbitrarily to any number of levels, although this is rare.

#### Types of attributes

`PreviousDegrees` of a `STUDENT` is a composite multi-valued attribute denoted by `{PreviousDegrees(College, Year, Degree, Fiels)}`.

- Multiple `PreviousDegrees` values can exist
- Each has four subcomponent attributes: College, Year, Degree, Field

### Entity Types and Key Attributes

Entities with the same basic attributes are grouped or typed into an **entity type**. For example the entity type `EMPLOYEE` and `PROJECT`.

An attribute of an entity type for which each entity must have a unique value is called a _key attribute_ of the type. For example `SSN` of `EMPLOYEE`.

A key attribute may be composite.

- `VehicleTagNumber` is a key of the `CAR` entity type with components `(Number, State)`.
- An entity type may have more than one key
  - The `CAR` entity type may have two keys:
    - `VehicleIdentificationNumber VIN`
    - `VehicleTagNumber (Number, State)`, aka license plate

### Entity Set

Each entity type will have a collection of entities stored in the database. Called **entity set** or sometimes **entity collection**.

Entity set is the current **state** of the entities of that type that are stored in the database.

#### Value Sets (Domains) of Attributes

Each simple attribute is associated with a value set

- E.g lastname has a value which is a characted string up to 15 chars
- Date has a value consisting of MM-DD-YYYY where each letter is an int

A **value set** specifies the set of values associated with an attribute

#### Attributes and Value Sets

Value sets are similar to data types in most programing languages - int, char (n), etc. Mathematically, an attribute A for an entity type E whose value set is V is defined as a function:

$$
A: E \to P(V)
$$
