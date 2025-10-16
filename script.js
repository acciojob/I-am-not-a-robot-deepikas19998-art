const imageGrid = document.getElementById('image-grid');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('para');
const heading = document.getElementById('h');

let allImages = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg'
]; // You must have these image files available
let images = [];
let selectedImages = [];

function shuffleAndDisplayImages() {
  // Reset everything
  images = [];
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Select a random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * allImages.length);
  const duplicateImage = allImages[duplicateIndex];

  // Create image array with one duplicate
  images = [...allImages];
  images.push(duplicateImage); // Now there are 6 images including one duplicate

  // Shuffle images
  images = images.sort(() => Math.random() - 0.5);

  // Render images
  imageGrid.innerHTML = '';
  images.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = `images/${imgSrc}`; // Assuming your images are in a folder named 'images'
    img.dataset.src = imgSrc;     // To track the source for comparison
    img.dataset.index = index;
    img.addEventListener('click', handleImageClick);
    imageGrid.appendChild(img);
  });
}

function handleImageClick(e) {
  const img = e.target;
  const imgIndex = img.dataset.index;

  // If already selected, ignore double clicks
  if (selectedImages.find(i => i.index === imgIndex)) return;

  // Select image
  img.classList.add('selected');
  selectedImages.push({ src: img.dataset.src, index: imgIndex });

  if (selectedImages.length > 0) {
    resetBtn.style.display = 'inline-block';
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }

  if (selectedImages.length > 2) {
    // Only allow two selections
    selectedImages.forEach(i => {
      const imgElement = document.querySelector(`img[data-index="${i.index}"]`);
      imgElement.classList.remove('selected');
    });
    selectedImages = [];

    verifyBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener('click', () => {
  // Clear selections
  selectedImages = [];
  document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';

  if (selectedImages.length === 2 && selectedImages[0].src === selectedImages[1].src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// On page load
s
