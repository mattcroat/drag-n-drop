"use strict";
const items = document.querySelectorAll('.item');
// https://stackoverflow.com/questions/47585409/use-spread-operator-on-nodelist-in-typescript
// const items = [...document.querySelectorAll('.item')]
items.forEach(item => {
    item.addEventListener('pointerdown', (event) => {
        item.classList.add('dragging');
    });
    item.addEventListener('pointerup', (event) => {
        item.classList.remove('dragging');
    });
});
//# sourceMappingURL=app.js.map