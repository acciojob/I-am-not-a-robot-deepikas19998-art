document.addEventListener("DOMContentLoaded", () => {
  const messageH = document.getElementById('h');
  const para = document.getElementById('para');
  const imageContainer = document.getElementById('image-container');
  const resetBtn = document.getElementById('reset');
  const verifyBtn = document.getElementById('verify');

  // Images - You can replace these URLs with your actual image paths
  const imageSources = [
    'https://via.placeholder.com/100?text=img1',
    'https://via.placeholder.com/100?text=img2',
    'https://via.placeholder.com/100?text=img3',
    'https://via.placeholder.com/100?text=img4',
    'https://via.placeholder.com/100?text=img5'
  ];

  let images = []; // will hold 6 images including one duplicate
  let selectedIndices = [];

  // Shuffle helper function (Fisher-Yates)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function initialize() {
    // Clear previous selections & UI
    selectedIndices = [];
    para.textContent = '';
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    messageH.textContent = "Please click on the identical tiles to verify that you are not a robot.";

    // Pick a random index to duplicate
    const duplicateIndex = Math.floor(Math.random() * imageSources.length);

    // Construct images array: 5 unique + 1 duplicate of the chosen one
    images = [...imageSources];
    images.push(imageSources[duplicateIndex]);

    // Shuffle images array
    shuffle(images);

    // Render images
    imageContainer.innerHTML = '';
    images.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.dataset.index = idx;
      img.dataset.src = src;
      imageContainer.appendChild(img);
    });
  }

  // Handle image click
  function onImageClick(e) {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    
    const idx = parseInt(img.dataset.index);

    // Prevent selecting more than 2 images
    if (selectedIndices.length >= 2) return;

    // Prevent selecting the same image twice
    if (selectedIndices.includes(idx)) return;

    selectedIndices.push(idx);
    img.classList.add('selected');

    // Show Reset button as soon as one image is clicked
    resetBtn.style.display = 'inline-block';

    // Show Verify button only if exactly 2 images selected
    if (selectedIndices.length === 2) {
      verifyBtn.style.display = 'inline-block';
    } else {
      verifyBtn.style.display = 'none';
      para.textContent = ''; // clear previous message
    }
  }

  // Reset the UI and state to initial
  function reset() {
    selectedIndices = [];
    para.textContent = '';
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    messageH.textContent = "Please click on the identical tiles to verify that you are not a robot.";

    // Remove all selections
    [...imageContainer.querySelectorAll('img.selected')].forEach(img => img.classList.remove('selected'));
  }

  // Verify if two selected images are identical
  function verify() {
    if (selectedIndices.length !== 2) return;

    const [firstIdx, secondIdx] = selectedIndices;
    const firstSrc = images[firstIdx];
    const secondSrc = images[secondIdx];

    verifyBtn.style.display = 'none';

    if (firstSrc === secondSrc) {
      para.textContent = "You are a human. Congratulations!";
      para.style.color = 'green';
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      para.style.color = 'red';
    }
  }

  // Event listeners
  imageContainer.addEventListener('click', onImageClick);
  resetBtn.addEventListener('click', () => {
    reset();
  });
  verifyBtn.addEventListener('click', () => {
    verify();
  });

  // Initialize on page load
  initialize();
});

