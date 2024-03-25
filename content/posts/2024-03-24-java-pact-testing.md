---
title: "Java - Separating a Pact Provider into Several Files"
description: "Learn how to split a Pact provider class by feature for better organization and maintainability."
date: "2024-03-23T07:30:19+02:00"
tags: [java, testing]
author: Fredrik
type: post
---

[Pact](https://docs.pact.io) is a powerful tool designed for testing HTTP integrations through contract testing. In contract testing, there are typically one or more `consumers` and a `provider`. The `provider` exposes an API (HTTP, in this context), while the `consumers` interact with this API. In a microservices architecture, a single service might act as a `provider` for multiple `consumers`.

While Pact offers numerous benefits, managing the codebase of the `provider` can become challenging, especially when dealing with a provider that serves APIs for various features. Although Pact itself doesn't provide native support for splitting the `provider` into several classes, there are alternative approaches available to refactor the `provider` code effectively.

In this article, we'll explore techniques to refactor a simplified `provider` class, `ProviderTest.java`, aiming to enhance code organization and maintainability.


```java

// providerTest.java

...
import static com.providerData.feature1;
import static com.providerData.feature2;
...

@Provider("my-provider")
public class ProviderTest {
    @MockBean private Feature1 feature1Service;
    @MockBean private Feature2 feature2Service;
    
    @ExtendWith(PactVerificationSpring6Provider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        if(context != null)
            context.verifyInteraction();
    }

    @State("feature1_state1")
    void feature1_state1(){
		when(feature1Service.something()).thenReturn(feature1Data())
    }

	@State("feature1_state2")
    void feature1_state2(){
		when(feature1Service.somethingElse()).thenReturn(feature1Data())
    }

	@State("fearture2_state1")
    void feature2_state1(){
		when(feature2Service.something()).thenReturn(feature2Data())
    }

	@State("feature2_state2")
    void feature2_state2(){
		when(feature2Service.somethingElse()).thenReturn(feature2Data())
    }
}

```
This provider class contains two states for feature1 and two states for feature2. Imagine having a lot more code and features; this provider class will quickly become very bloated. All test data is specified as an abstract class in providerData.java, which will also very quickly become messy.

Let's separate code for feature1 and feature2 into separate files.

`Feature1ProviderTest.java` 

```java

// Feature1ProviderTest.java

import static com.Feature1ProviderContractData.*;

interface Feature1ProviderTest {
	Feature1 feaure1Mock();

	@State("feature1_state1")
    default void feature1_state1(){
		when(feature1Mock().something()).thenReturn(feature1Data());
    }

	@State("feature1_state2")
    default void feature1_state2(){
		when(feature1Mock().somethingElse()).thenReturn(feature1Data())
    }
}

abstract class Feature1ProviderContractData {

	public static Data feature1Data() {
		return Data.builder().build()
	}
}

```

Instead of creating another `provider` class, we created an `interface` for `Feature1` with default methods as states. We also moved the abstract test data class `Feature1ProviderContractData` into the same file to really separate the tests by feature.

The ProviderTest.java can now be simplified into something like this


```java

// ProviderTest.java

@Provider("my-provider")
public class ProviderTest implements Feature1ProviderTest, Feature2ProviderTeest {
    @MockBean private Feature1 feature1Service;
    @MockBean private Feature2 feature2Service;

    @overrride public Feature1 feature1Mock() { return feature1Service}
    @overrride public Feature2 feature2Mock() { return feature2Service}
    
    @ExtendWith(PactVerificationSpring6Provider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        if(context != null)
            context.verifyInteraction();
    }
}

```

By doing this refactoring, you get a much cleaner provider class, and the code is separated by feature.
