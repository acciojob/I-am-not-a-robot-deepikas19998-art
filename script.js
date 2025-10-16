const imageGrid = document.getElementById('image-grid');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('para');
const heading = document.getElementById('h');

let allImages = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];
let selectedImages = [];
let imageElements = [];

function init() {
  selectedImages = [];
  message.textContent = '';
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  imageGrid.innerHTML = '';

  // Duplicate one random image
  const duplicateIndex = Math.floor(Math.random() * allImages.length);
  const duplicateImage = allImages[duplicateIndex];
  let imagesToShow = [...allImages, duplicateImage];

  // Shuffle images
  imagesToShow = imagesToShow.sort(() => Math.random() - 0.5);

  // Display images
  imagesToShow.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = `images/${src}`;
    img.dataset.src = src;
    img.dataset.index = index;
    
    // Add Cypress-friendly classes: .img1, .img2, ...
    const imgNumberMatch = src.match(/img(\d)/);
    if (imgNumberMatch) {
      img.classList.add(`img${imgNumberMatch[1]}`);
    }

    img.addEventListener('click', () => handleImageClick(img));
    imageGrid.appendChild(img);
    imageElements.push(img);
  });
}

function handleImageClick(img) {
  const index = img.dataset.index;

  // Prevent selecting the same image twice
  if (selectedImages.find(i => i.dataset.index === index)) return;

  if (selectedImages.length >= 2) {
    // Clear previous selections if user clicks more than twice
    selectedImages.forEach(i => i.classList.remove('selected'));
    selectedImages = [];
    verifyBtn.style.display = 'none';
  }

  img.classList.add('selected');
  selectedImages.push(img);

  if (selectedImages.length >= 1) {
    resetBtn.style.display = 'inline-block';
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener('click', () => {
  selectedImages.forEach(i => i.classList.remove('selected'));
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';

  if (
    selectedImages.length === 2 &&
    selectedImages[0].dataset.src === selectedImages[1].dataset.src
  ) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize on page load
init();
