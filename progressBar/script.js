const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

//click, both of progress circle are changing
//progress--blockEle color;  circle--border
// button--'able' or 'disable' status.  Also, there is a critical value


let currentActive = 1;

next.addEventListener('click', () => {
    currentActive++;

    if (currentActive > circles.length) { // special condition -> critical
        currentActive = circles.length;  // fully fill
    }

    update();
})

prev.addEventListener('click', () => {
    currentActive--;

    if (currentActive < 1) {
        currentActive = 1; // assure one
    }

    update();
})

// encapsulate the main action into a context
function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            // next
            circle.classList.add('active');
        } else {
            // prev
            circle.classList.remove('active');
        }
    })

    //progress bar color
    const actives = document.querySelectorAll('.active');

    // % controlling
    // actives percentage
    progress.style.width =
        (actives.length - 1) / (circles.length - 1) * 100 + '%';

    // btn status
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}
