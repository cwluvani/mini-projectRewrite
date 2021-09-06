const search = document.querySelector('.search');
const input = document.querySelector('.input');
const button = document.querySelector('.btn');

button.addEventListener('click', () => {
    /* toggle() -- remove given token from the list and return false,
    if token doesn't exist, it's added token and the function return true.*/

    search.classList.toggle('active');
    input.focus();  /*window.focus -- Clicking, input get focused*/
})

/* button is just a trigger to make event*/