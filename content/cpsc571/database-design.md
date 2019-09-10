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

Conceptual schema has nothing to do with the database that you have. It needs to be DBMS independent. It should be understandable to a non-specialist.

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

### Operational Stage

**Operational stage** includes **installation** of the finished design. **Operation and tuning** of the design keeps on going, until new features are required/needed.

## Entity Relationship Model

## Relational Data Model

## Relational Database Design

## Normalization

## Dependencies (Functional and Multi-value)
