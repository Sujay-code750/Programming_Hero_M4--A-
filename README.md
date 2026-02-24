

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
=== Finds one element with a specific ID, Finds all elements with a certain class, Finds the first element that matches a CSS selector, Finds the first element that matches a CSS selector(Id, Class, Tag), Finds all elements that match a CSS selector. Returns a static NodeList.
### 2. How do you create and insert a new element into the DOM?
=== Create a new element, add text to it, and then insert it into a parent element in the DOM.
### 3. What is Event Bubbling? And how does it work?
=== Event bubbling is when an event starts on a specific element and then “bubbles up” to it's parent elements.
### 4. What is Event Delegation in JavaScript? Why is it useful?
=== Event delegation is a technique where we are attach a single event listener to a parent element instead of many child elements. Then, inside that listener, we are check which child actually triggered the event.
### 5. What is the difference between preventDefault() and stopPropagation() methods?
=== One blocks the browser default behavior, the other blocks the event from moving up, down the DOM.
