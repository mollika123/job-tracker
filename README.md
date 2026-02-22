1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?


answer:getElementsByClassName return HTML
collection and all elements with the given class.getElementById Use  when the id  is unique and return  HTMLElement.querySelector also return HTMLElement.querySelectorAll return NodeList.



2. How do you create and insert a new element into the DOM?


answer:I can create and insert a new element into the DOM by document.createElement() and appendChild() method.


3. What is Event Bubbling? And how does it work?


answer:Event Bubbling is when an event starts on the target element and then propagates upward to its parent elements in the DOM.


4. What is Event Delegation in JavaScript? Why is it useful?

answer:Event Delegation is attaching a single listener to a parent element to handle events on its child elements, making it efficient and dynamic.



5. What is the difference between preventDefault() and stopPropagation() methods?

answer:preventDefault() stops the browser’s default action for an event, while stopPropagation() stops the event from bubbling up to parent elements.