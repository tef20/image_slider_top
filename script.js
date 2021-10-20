import pubSub from './pubSub.js';

const carousel = document.querySelector('.carousel');
const scrollerBar = document.createElement('div');
scrollerBar.className = 'scrollerBar';
document.querySelector('.pictureWindow').appendChild(scrollerBar);

const images = [
  // Christina Alfirovich - https://unsplash.com/photos/M0RadVcPT4Y
  'https://images.unsplash.com/photo-1634672794609-3a592575318d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80',
  // Alex Diaz - https://unsplash.com/photos/zctH4MBwdeo
  'https://images.unsplash.com/photo-1634662615277-08cf18efc6bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80', 
  // Tobias Rademacher - https://unsplash.com/photos/K1lFYNVwVNM
  'https://images.unsplash.com/photo-1634726770944-4b4c46955214?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80', 
  // Tobias Reich - https://unsplash.com/photos/CO70T8D5W6w
  'https://images.unsplash.com/photo-1634663831212-89c2c9c57551?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  // Virender Singh - https://unsplash.com/photos/hE0nmTffKtM
  'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=906&q=80'
]

for (let i = 0; i < images.length; i++) {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'imgContainer';
  imgContainer.dataset.imageId = i;
  carousel.appendChild(imgContainer);

  const img = document.createElement('img');
  img.src = images[i];
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

// Event Bindings
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
