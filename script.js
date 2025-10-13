const imageContainer = document.getElementById("imageContainer");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const heading = document.getElementById("h");
const result = document.getElementById("para");

const imageSources = [
  "https://via.placeholder.com/100?text=1",
  "https://via.placeholder.com/100?text=2",
  "https://via.placeholder.com/100?text=3",
  "https://via.placeholder.com/100?text=4",
  "https://via.placeholder.com/100?text=5"
];

let selectedImages = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createImages() {
  selectedImages = [];
  imageContainer.innerHTML = "";
  result.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Pick duplicate index
  const duplicateIndex = Math.floor(Math.random() * 5);
  const duplicateClass = `img${duplicateIndex + 1}`;
  const duplicateSrc = imageSources[duplicateIndex];

  const images = [];

  // Add one image per class (img1 to img5)
  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");
    img.src = imageSources[i];
    img.classList.add(`img${i + 1}`);
    img.dataset.src = imageSources[i];
    img.addEventListener("click", () => handleClick(img));
    images.push(img);
  }

  // Add duplicate image (with same class as duplicate)
  const duplicate = document.createElement("img");
  duplicate.src = duplicateSrc;
  duplicate.classList.add(duplicateClass);
  duplicate.dataset.src = duplicateSrc;
  duplicate.addEventListener("click", () => handleClick(duplicate));
  images.push(duplicate);

  // Shuffle and append
  shuffle(images);
  images.forEach(img => imageContainer.appendChild(img));
}

function handleClick(img) {
  if (selectedImages.length === 2) return;

  // Prevent duplicate selection
  if (img.classList.contains("selected")) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length >= 1) {
    resetBtn.style.display = "inline-block";
  }
  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages = [];
  result.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  document.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
});

verifyBtn.addEventListener("click", () => {
  if (selectedImages.length !== 2) return;

  const src1 = selectedImages[0].dataset.src;
  const src2 = selectedImages[1].dataset.src;

  verifyBtn.style.display = "none";

  if (src1 === src2) {
    heading.textContent = "You are a human. Congratulations!";
  } else {
    heading.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = createImages;
