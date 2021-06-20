

document.addEventListener('keydown', (event) => {
    let sound = document.querySelector(`audio[data-key='${event.keyCode}']`);
    let soundDiv = document.querySelector(`div[data-key='${event.keyCode}']`);

    soundDiv.classList.add('playing');

    sound.currentTime = 0;

    sound.addEventListener('ended', (event) => {
        soundDiv.classList.remove('playing');
    });
    
    sound.play();
    
    console.dir(document.querySelector(`audio[data-key='${event.keyCode}']`));
});