"use strict";
// ********* Lesson 9 *********
// Mapped Types
function mappedTypes() {
    // js has for in loop
    // for (const key in object) {
    // mapped types are similar to for in loop but for types
    const point = {
        x: 1,
        y: 2,
        z: 3,
    };
    // Readonly<T> is a built-in mapped type
}
// Mappping types modifiers
function mappedTypesModifiers() {
    // usage example
    class State {
        state;
        constructor(state) {
            this.state = state;
        }
        updateState(newState) {
            // TODO: use Partial
            this.state = { ...this.state, ...newState };
        }
        getStateByKey(key) {
            return this.state[key];
        }
    }
    const state = new State({
        x: 1,
        y: 2,
        z: 3,
        name: "point",
    });
}
mappedTypesModifiers();
// Template Literal Type
function templateLiteralType() {
    // in js we have template literals
    const name = "John";
    const greeting = `Hello ${name}`;
    const greeting2 = "Hello John";
    const width = 100;
    const width2 = "100px";
    const width3 = "100em";
    function drawShapeWithColor(shapeWithColor) {
        console.log(shapeWithColor);
    }
    drawShapeWithColor("circle-red");
    // drawShapeWithColor("circle-red123"); // error
}
templateLiteralType();
// Fix autocoplete problem for literal union types
function fixAutocompleteProblemForLiteralUnionTypes() {
    function drawRectangle(color) {
        console.log(color);
    }
    drawRectangle("redd"); // no autocomplete
    function drawRectangle2(color) {
        console.log(color);
    }
    drawRectangle2("red"); // autocomplete works
}
fixAutocompleteProblemForLiteralUnionTypes();
// Satisfies constraint
function satisfiesConstraint() {
    const theme = {
        primary: "green",
        secondary: [0, 255, 0],
        danger: "red",
    };
    const [r, g, b] = theme.secondary123; // no error checking
    const theme2 = {
        primary: "green",
        secondary: [0, 255, 0],
        danger: "red",
    };
    const [r1, g1, b1] = theme2.secondary;
    const _temp = theme2;
}
satisfiesConstraint();
