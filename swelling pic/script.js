const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActionClass();
        panel.classList.add('active');
    })
})

function removeActionClass() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}