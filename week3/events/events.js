function doSomething(event){
    console.log('Something Happened!');
    console.log(event.type);
    console.log(event.target);
    console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`);
    addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));
    addEventListener('click', (event) => {
        if (event.shiftKey) {
            console.log('A Shifty Click!');
        }
    });
}
addEventListener('click', doSomething);

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),true);
liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),true);