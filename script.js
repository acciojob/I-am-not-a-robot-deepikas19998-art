// Images - you can replace these URLs with your own images or use placeholders
const imageSources = [
  "https://via.placeholder.com/100?text=1",
  "https://via.placeholder.com/100?text=2",
  "https://via.placeholder.com/100?text=3",
  "https://via.placeholder.com/100?text=4",
  "https://via.placeholder.com/100?text=5"
];

const imageContainer = document.getElementById("imageContainer");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const messageH = document.getElementById("h");
const para = document.getElementById("para");

let images = [];
let selectedIndices = [];

// Shuffle helper function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize/reset the app
function initialize() {
  selectedIndices = [];
  para.textContent = '';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  messageH.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Pick random index to duplicate
  const duplicateIndex = Math.floor(Math.random() * imageSources.length);

  // Build image array: 5 unique + 1 duplicate
  images = [...imageSources];
  images.push(imageSources[duplicateIndex]);

  // Shuffle images
  shuffle(images);

  // Clear container
  imageContainer.innerHTML = '';

  // Create image elements with appropriate classes
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.index = idx;
    img.dataset.src = src;

    // Assign classes img1, img2, ..., img5 according to original image
    const originalIndex = imageSources.indexOf(src);
    if (originalIndex !== -1) {
      img.classList.add(`img${originalIndex + 1}`);
    }

    // Click event
    img.addEventListener('click', () => onImageClick(img));

    imageContainer.appendChild(img);
  });
}

// Image click handler
function onImageClick(img) {
  if (selectedIndices.length === 2) return; // ignore more than 2 clicks

  // Prevent selecting the same image twice
  if (selectedIndices.includes(img.dataset.index)) return;

  selectedIndices.push(img.dataset.index);
  img.classList.add('selected');

  // Show reset button once at least one clicked
  if (selectedIndices.length === 1) {
    resetBtn.style.display = 'inline-block';
  }

  // Show verify button only if exactly two images clicked
  if (selectedIndices.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

// Reset button handler
resetBtn.addEventListener('click', () => {
  selectedIndices = [];
  para.textContent = '';
  verifyBtn.style.display = 'none';
  resetBtn.style.display = 'none';
  messageH.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Remove selected class from all images
  document.querySelectorAll('#imageContainer img').forEach(img => img.classList.remove('selected'));
});

// Verify button handler
verifyBtn.addEventListener('click', () => {
  if (selectedIndices.length !== 2) return;

  const imgs = Array.from(document.querySelectorAll('#imageContainer img'));
  const firstImg = imgs.find(img => img.dataset.index === selectedIndices[0]);
  const secondImg = imgs.find(img => img.dataset.index === selectedIndices[1]);

  if (!firstImg || !secondImg) return;

  // Hide verify button after click
  verifyBtn.style.display = 'none';

  // Check if the two selected images have the same src (are identical)
  if (firstImg.dataset.src === secondImg.dataset.src) {
    messageH.textContent = "You are a human. Congratulations!";
  } else {
    messageH.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize on page load
window.onload = initialize;
