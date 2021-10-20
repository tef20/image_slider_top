const carousel = document.querySelector('.carousel');
for (let i = 0; i < 5; i++) {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'imgContainer';
  carousel.appendChild(imgContainer);

  const img = document.createElement('img');
  img.src = '#';
  img.alt = `image${i} placeholder`;

  imgContainer.appendChild(img);
}

const backArrow = document.querySelector('.scrollButton.back');
backArrow.addEventListener('click', (e) => {
  rotateChildElements(carousel, 1);  
});

const forwardArrow = document.querySelector('.scrollButton.forward');
forwardArrow.addEventListener('click', (e) => {
  rotateChildElements(carousel, -1);
});

function rotateChildElements(parent, direction) {
  if (parent.children.length > 1 && direction) {
    const first = parent.firstElementChild;
    const last = parent.lastElementChild;

    if (direction > 0) {
      const overflow = last;
      parent.insertBefore(overflow, first);
    } else if (direction < 0) {
      const overflow = first;
      parent.insertBefore(overflow, last.nextElementSibling);
    }
  }
}
