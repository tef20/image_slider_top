import pubSub from './pubSub.js';

const carousel = document.querySelector('.carousel');

const scrollerBar = document.createElement('div');
scrollerBar.className = 'scrollerBar';
document.querySelector('.pictureWindow').appendChild(scrollerBar);

for (let i = 0; i < 5; i++) {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'imgContainer';
  imgContainer.dataset.imageId = i;
  carousel.appendChild(imgContainer);

  const img = document.createElement('img');
  img.src = '#';
  img.alt = `image${i} placeholder`;

  imgContainer.appendChild(img);

  const dotButton = document.createElement('button');
  dotButton.className = i === 0 ? 'dotButton activeDot' : 'dotButton';
  pubSub.on('newImageSelected', updateDotHighlights);
  dotButton.dataset.imageId = i;

  scrollerBar.appendChild(dotButton);

  dotButton.addEventListener('click', (e) => {
    const activeDotID = scrollerBar.querySelector('.activeDot').dataset.imageId;
    const chosenDotID = e.target.dataset.imageId;
    const diff = activeDotID - chosenDotID;

    // Update image selection
    for (let j = 0; j < Math.abs(diff); j++) {
      rotateChildElements(carousel, diff);
    }
  });
}

const backArrow = document.querySelector('.scrollButton.back');
backArrow.addEventListener('click', (e) => {
  rotateChildElements(carousel, 1);
});

const forwardArrow = document.querySelector('.scrollButton.forward');
forwardArrow.addEventListener('click', (e) => {
  rotateChildElements(carousel, -1);
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    rotateChildElements(carousel, 1);
  } else if (e.code === 'ArrowRight') {
    rotateChildElements(carousel, -1);
  }  
});

function updateDotHighlights(newActiveID) {
  document.querySelectorAll('.dotButton').forEach((dotButton) => {
    if (dotButton.dataset.imageId === newActiveID) {
      dotButton.classList.add('activeDot');
    } else {
      dotButton.classList.remove('activeDot');
    }
  });
}

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
  
  pubSub.emit(
    'newImageSelected',
    document.querySelector('.imgContainer').dataset.imageId
  );
}
