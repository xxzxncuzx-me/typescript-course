"use strict";
function singletonDemo() {
    class Singleton {
        static instance;
        constructor() { }
        static getInstance() {
            if (!Singleton.instance) {
                Singleton.instance = new Singleton();
            }
            return Singleton.instance;
        }
    }
    const instance1 = Singleton.getInstance();
    const instance2 = Singleton.getInstance();
    if (instance1 === instance2) {
        console.log("----EQUALS----");
    }
    else {
        console.log("--------NOT EQUALS------");
    }
}
singletonDemo();
function factoryDemo() {
    class Pizza {
    }
    class CheesePizza extends Pizza {
        prepare() {
            console.log("---Prepare CheesePizza-----");
        }
        bake() {
            console.log("---Bake CheesePizza-----");
        }
        cut() {
            console.log("---Cut CheesePizza-----");
        }
        box() {
            console.log("---Box CheesePizza-----");
        }
    }
    class PepperoniPizza extends Pizza {
        prepare() {
            console.log("---Prepare PepperoniPizza-----");
        }
        bake() {
            console.log("---Bake PepperoniPizza-----");
        }
        cut() {
            console.log("---Cut PepperoniPizza-----");
        }
        box() {
            console.log("---Box PepperoniPizza-----");
        }
    }
    class ClamPizza extends Pizza {
        prepare() {
            console.log("---Prepare ClamPizza-----");
        }
        bake() {
            console.log("---Bake ClamPizza-----");
        }
        cut() {
            console.log("---Cut ClamPizza-----");
        }
        box() {
            console.log("---Box ClamPizza-----");
        }
    }
    class VeggiePizza extends Pizza {
        prepare() {
            console.log("---Prepare VeggiePizza-----");
        }
        bake() {
            console.log("---Bake VeggiePizza-----");
        }
        cut() {
            console.log("---Cut VeggiePizza-----");
        }
        box() {
            console.log("---Box VeggiePizza-----");
        }
    }
    class PizzaStoreBad {
        constructor() { }
        orderPizza(type) {
            let pizza = null;
            // this code is not good because if we add a new type of pizza we need to change this code
            // also this code is not reusable - in case we need to create another store, it will duplicate
            if (type === "cheese") {
                pizza = new CheesePizza();
            }
            else if (type === "pepperoni") {
                pizza = new PepperoniPizza();
            }
            else if (type === "clam") {
                pizza = new ClamPizza();
            }
            else if (type === "veggie") {
                pizza = new VeggiePizza();
            }
            if (pizza) {
                pizza.prepare();
                pizza.bake();
                pizza.cut();
                pizza.box();
            }
        }
    }
    class Factory {
        createPizza(type) {
            let pizza = null;
            if (type === "cheese") {
                pizza = new CheesePizza();
            }
            else if (type === "pepperoni") {
                pizza = new PepperoniPizza();
            }
            else if (type === "clam") {
                pizza = new ClamPizza();
            }
            else if (type === "veggie") {
                pizza = new VeggiePizza();
            }
            return pizza;
        }
    }
    class PizzaStore {
        factory;
        constructor(factory) {
            this.factory = factory;
        }
        orderPizza(type) {
            let pizza;
            pizza = this.factory.createPizza(type);
            if (pizza) {
                pizza.prepare();
                pizza.bake();
                pizza.cut();
                pizza.box();
            }
        }
    }
    const client = new PizzaStore(new Factory());
    // client.orderPizza("cheese");
    client.orderPizza("pepperoni");
}
factoryDemo();
function builderDemo() {
    // The intent of the Builder design pattern is to separate the construction of a complex object from its representation.
    // By doing so, the same construction process can create different representations.[1]
    class ConcreteBuilder1 {
        product;
        constructor() {
            this.reset();
        }
        reset() {
            this.product = new Product1();
        }
        producePartA() {
            this.product.parts.push("PartA1");
        }
        producePartB() {
            this.product.parts.push("PartB1");
        }
        producePartC() {
            this.product.parts.push("PartC1");
        }
        getProduct() {
            const result = this.product;
            this.reset();
            return result;
        }
    }
    class Product1 {
        parts = [];
        listParts() {
            console.log(`Product parts : ${this.parts.join(", ")}\n`);
        }
    }
    class Director {
        builder;
        setBuilder(builder) {
            this.builder = builder;
        }
        buildMinimalViableProduct() {
            this.builder.producePartA();
        }
        buildFullFeaturedProduct() {
            this.builder.producePartA();
            this.builder.producePartB();
            this.builder.producePartC();
        }
    }
    const Client = (director) => {
        const builder = new ConcreteBuilder1();
        director.setBuilder(builder);
        console.log("Standard basic product : ");
        director.buildMinimalViableProduct();
        builder.getProduct().listParts();
        console.log("Standard full featured product : ");
        director.buildFullFeaturedProduct();
        builder.getProduct().listParts();
        console.log("custom product : ");
        builder.producePartA();
        builder.producePartC();
        builder.getProduct().listParts();
    };
    const director = new Director();
    Client(director);
}
builderDemo();
function prototypeDemo() {
    class Prototype {
        primitive = null;
        component;
        circularReference;
        clone() {
            const clone = Object.create(this);
            clone.component = Object.create(this.component);
            clone.circularReference = {
                ...this.circularReference,
                prototype: { ...this },
            };
            return clone;
        }
    }
    class ComponentWithBackReference {
        prototype;
        constructor(prototype) {
            this.prototype = prototype;
        }
    }
    function clientCode() {
        const p1 = new Prototype();
        p1.primitive = 246;
        p1.component = new Date();
        p1.circularReference = new ComponentWithBackReference(p1);
        const p2 = p1.clone();
        if (p1.primitive === p2.primitive) {
            console.log("primitive copied.");
        }
        else {
            console.log("primitive not copied.");
        }
        if (p1.component === p2.component) {
            console.log("component not copied.");
        }
        else {
            console.log("component copied.");
        }
        if (p1.circularReference === p2.circularReference) {
            console.log("circularReference not copied.");
        }
        else {
            console.log("circularReference copied.");
        }
        if (p1.circularReference.prototype === p2.circularReference.prototype) {
            console.log("back ref is linked to original.");
        }
        else {
            console.log("back ref is linked to clone.");
        }
    }
    clientCode();
}
prototypeDemo();
