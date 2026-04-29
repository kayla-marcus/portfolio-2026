const images = document.querySelectorAll('.carousel-item');
const modal = document.getElementById('imageModal');
const modalContainer = document.querySelector('.modal-container');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle'); 
const modalDesc = document.getElementById('modalDescription'); 
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');


let currentIndex = 0;

// function updateModal(index) {
//   const img = images[index];
//   modalImg.src = img.src;
//   modalTitle.textContent = img.dataset.title || '';
//   modalDesc.textContent = img.dataset.desc || '';
// }


// Start new code

function updateModal(index) {
  const img = images[index];
  modalImg.src = img.src;
  modalTitle.textContent = img.dataset.title || '';
  modalDesc.textContent = img.dataset.desc || '';

  const blurNotice = document.getElementById('blurNotice');

  if (img.classList.contains('blur')) {
    modalImg.classList.add('blur');
    blurNotice.style.display = 'flex';
  } else {
    modalImg.classList.remove('blur');
    blurNotice.style.display = 'none';
  }
}


// End new code

function openModal(index) {
  currentIndex = index;
  updateModal(index);
  modal.style.display = 'flex';
  document.body.classList.add("modal-open"); // lock scroll

  // trigger animation
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });
}

function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // match CSS transition duration
  document.body.classList.remove("modal-open"); // unlock scroll
}

function showNext(n) {
  currentIndex = (currentIndex + n + images.length) % images.length;
  updateModal(currentIndex);
}

// Open modal on click
images.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

// Close modal
closeBtn.addEventListener('click', closeModal);

// Navigation
prevBtn.addEventListener('click', () => showNext(-1));
nextBtn.addEventListener('click', () => showNext(1));

// Close modal when clicking outside image
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'Escape') closeModal();
  }
});

