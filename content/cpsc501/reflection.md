---
title: 'Reflection basics'
date: '2019-09-25'
description: ''
published: false
tags: ['cpsc501']
---

**Reflection** is the ability of a running program to:

- Examine iteslf and the run time environment aka **introspection**
- Change its behaviour, structure, or data depending on what it finds

To do **introspection**, a program must have a representation of itself available at runtime, called **metadata**. In an OO language, metadata is organized using _metaobjects_, e.g. `Class`, `Method` and `Field` objects/classes in Java.

The normal, non-reflective part of a program is called the **base program** that consists of **base level obejcts**. Each base-level object is an instance of some class. The class is represented at the **metalevel** as a **class object**.

The fields and methods for a class are represented with **Field** and **Method** metaobjects, these are contained within the class.

Once introspection is done you can change a program's structure, data, or behaviour. There are three general techniques

1. Direct metaobject modification
   - e.g. add methods or fields to an existsing class
   - **not possible in Java**
2. Operations using metadata
   - e.g. dynamic method invocation, dynamic class loading, reflective construction
   - **exists in Java**
3. Intercession
   - where code intercedes modifies behaviour as program runs
   - typically involves intercepting method calls
   - in Java, **limited to dynamic proxies**

## Issues with reflection

Since behaviour can be changed dynamically, security could be compromised. Not a problem with Java, because it has strong security model and limited intercession. Reflective techniques are indirect, thus making code more complex, use reflection only where it makes sense.

Reflective techniques are indirect, thus making code more complex. Use reflection where it makes sense and necessary. Reflective calls are usually slower.

---

## Reflection in Java

```java
public class ReflectionTest {
  public static void main(String[] args) {
    Object o = null;
    Class cls = null;

    try {
      // load the class dynamically using args[0]
      cls = Class.forName(arg[0]);
      o = cls.newInstance();

      // call method arg[1] with no arguments
      Method m = cls.getMethod(arg[1], null);
      m.invoke(object, null);
    } catch (Exception e) {
        //
    }
  }
}
```

The reflection classes are contained in following packages

- `java.lang.Class` and `java.lang.Object`
- `java.lang.reflect.Method`, `java.lang.reflect.Field`, `java.lang.reflect.Constructor`

`java.lang.Object` is the root superclass of every object. Each base-level object keeps a reference to its class object. Accessed using `getClass()`

`java.lang.Class` is the class of metalevel **class objects**. Has many useful reflective methods to:

- create new instances
- find methods, constructors, and fields of a class
- traverce the inheritance hierarchy

<!--
#TODO: Finish before ### Field type
-->

### Fields

Fields for a class or interface are represented with metaobjects of the type `java.lang.reflect.Field`. Fields can be found at runtime by querying the class object, using `Field.getField(String name);`.

#### Value

If you know the type of the primitive, it can be accessed by using methods like `boolean getBoolean(Object o)`, `double getDouble(Object o)`, etc.

#### Field Settings

Fields can be set reflectively using `void set(Object o, Object val)`.

### Modifiers
