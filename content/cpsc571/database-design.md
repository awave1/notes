---
title: 'Database Design'
date: '2019-09-10'
description: ''
published: true
tags: ['cpsc571']
---

## Design Process

### Analysis Stage

Steps performed:

- Study existing system
- Meet with user groups
- Analyze existing procedures
- Modification to improve efficiency
- Prepare the initial proposal

#### Definition of Problem

- To define a problem, develop a rough outline and scope the project.
- After the project is scoped, select an approach and determine its feasibility.
- Estimate costs;
  - initial setup
  - operational
  - risks versus benefits
- Estimate time required for each part of the cycle

#### Existing System/Procedures Analysis

Analysis of the existing system is **critical**.

- Consider the way the things are done currently. Consider things to be present in current state of business.
- If possible, design the new system to **minimize impact**.
- Ask questions and talk to everyone you can.
- Determine any _sacred cow_ and be very careful. Things like that need to be protected, because people care about those.
- Find any:
  - inefficiencies
  - duplications
  - procedural changes required
  - how the new system will affect existing procedures
- Define explicitly the new systems requirements, including:
  - systems function
  - support activities
  - data required for these activities
- Factors to consider:
  - levels of management to be supported
  - nature of functions
  - types of activities to be performed

#### Requirement Specifications

- This analysis can lead to the following two types of requirements:
  - Information requirements:
    - specify the data under the auspices of the proposed database, including
      - entities
      - attributes
      - and relationships among them
  - Processing requirements
    - the data manipulation requirements including:
      - access frequencies
      - required turnaround and response times

#### Integrity Constraints

- Discussions with the users lead to an understanding of the environment.
- The information can be used to determine "HOW" the information is processed and what rules are applied to the data to ensure its integrity e.g.,
  - unique employee ID number (primary key);
  - children must have parents/guardians (foreign key(s));
- These discussions are used to define the conceptual schema, including entities, relationships and attributed.

---

Outcomes of analysis stage:

- Data requirements
- Properties and interrelationships of the data
- Operation requirements
- Significant events and termination conditions
- Constraints

### Preliminary Design

- Preliminary design is created
- Evaluated against the initial requirements
- Users are consulted
- Required changes are made
- This is an iterative process that continues until all users are satisfied

Next step is to describe the system with a conceptual schema.

#### Conceptual Schema

Conceptual schema has nothing to do with the database that you have. It needs to be DBMS independent. It should be understandable to a non-specialist. Written using **DDL - Data Definition Language**.

- Using the high-level model:
  - Entities and relationships are identified
  - attributes are explicitly stated
  - primary keys are indicated
  - relationship cardinalities are estimated
  - constraints are specified (where possible)

##### Building the Conceptual Schema

- Centralized Schema Design:
  - requirements specification defined in a single set of specifications
  - the conceptual schema is designed from this single set
- View Integration Approach:
  - requirements specification for each user class forms the user view first, and then the conceptual schema is formed based on the individual views
  - conflicts are resolved when the views are integrated

### Design Stage

After analysis stage, we begin to **design** the system. We need to define requirement for **DBMS Software**, **hardware**. After that, we proceed to **final design**, when we define the actual tables, and database. After design is complete and implemented, the final design needs to be **tested**.

One of the first things that needs to be done is to decide what computing system you going to use.

Fundamental:

- You are probably stuck with what you get
- try to work with it whenever possible

Other considerations include things such as:

- ensure existing DBMS has adequate storage and processing abilities
  - e.g. can I increase the page size in chosen DBMS?
- report generating facilities
- menu and form-based user interface (vs. terminal only)
- should the database be distributed
- _expertise of the personnel_ and their preferences

#### Data Model Selection (DBMS Level)

- If data is mainly hierarchical, choose a hoerarchical model and a hierarchical DBMS
- If data exhibits a large number of interrelationships, the network or relational model would be preferable
- Other factors:
  - experience of personnel
  - reputation of the vendor
  - availability service from the vendor

Selection of the DBMS determines the data model.

#### Computer System Selection

Things to consider:

- Capital cost
- Conversion and initial training costs
- Operating costs including:
  - Personnel
  - Maintenance of hardware/software

#### The Three-schema Architecture

**DDL** works with _schema_, **DML** works with _data_. When defining Internal Schema, use SDL.

<!-- TODO: Finish The Three-schema Architecture -->

#### Final Design

To this point add design has been DBMS independent. Now the independent conceptual schema is translated to a DBMS dependent conceptual schema. Views of the application are derived from it as _external views_. First step is to convert from ER model to the DBMS dependent model:

<!-- TODO: Final Design -->

- ...
- ...

#### Physical Database Design

Decisions are made regarding:

- Choice of clustering of records
- Choice of file organization
- Choice of supporting indexes
- Choice of links between records

This is going to define the storage structure and how to optimize accesses.

Performance considerations:

- Size of records
- Amount of data
- Data distribution over multiple storage devices
- Indexes vs. direct access mechanisms

##### Storage Strategies

Relational table can be fragmented: horizontally or vertically. **Horizontal fragmentation** - dividing table up into rows, e.g. subset of the data (query grad students vs. undergrad). **Vertical fragmentation** - dividing table up in columns, e.g. get only the column of the value (disregard some sensitive user info and extract only needed info). Fragmenting both horizontally and vertically would result in 2 copies of some cells, therefore updating will require to update both copies.

**Hybrrid fragmentation** - store both horizontal and vertical fragments.

Problem with horizontal fragmentation: can't do aggregate queries well. Solution to that? vertical fragmentation. But it cannot be done at the same time. If a cell is in both vertical fragment and horizontal fragment, to write to it, need to lock both fragments.

Hyper fragmentation: fragmenting both vertically and horizontally and store those fragments.

<!-- TODO: Storage Strategies -->

---

Physical design is an iterative process. Each attempt is analyzed to determine if performance will be acceptable. This is done analytically, rather than pragmatically. Potential pitfalls:

- file organization inappropriate for online transactions
- records must occur on the same physical drive
- improper storage units
- too much record overflow

#### Implementation and Testing

Implementation consists of writing and compiling code for conceptual and exernal schemes in the DDL of the DBMS. Physical database is created and loaded with data. Application programs and transactions are written, using a high-level language with embedded DML.

When implemented, the design is tested to determine if functioning correctly. Documentation of the system is prepared. Backup and restart after failures are outlines.

### Operational Stage

**Operational stage** includes **installation** of the finished design. **Operation and tuning** of the design keeps on going, until new features are required/needed.

## Entity Relationship Model

## Relational Data Model

## Relational Database Design

## Normalization

## Dependencies (Functional and Multi-value)
