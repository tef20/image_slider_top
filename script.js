const backArrow = document.querySelector('.scrollButton.back');
backArrow.addEventListener('click', (e) => {
  shiftSlide(-1)
});

const forwardArrow = document.querySelector('.scrollButton.back');
forwardArrow.addEventListener('click', (e) => {
  shiftSlide(1)
});

function shiftSlide(n) {
  document.querySelector('.inView');
  
  document.querySelectorAll('.imgContainer').forEach((imgContainer) => {
    imgContainer.style.right = '200%';
  });
}
// document.body.appendChild(newdiv);
