const imageTweet = document.getElementById("image_tweet");
const imageInput = document.getElementById("imageInput");

const imagePreview = document.getElementById("imagePreview");
const img_section = document.querySelector(".img_section");


// 1. Quand on clique sur l’icône galerie
imageTweet.addEventListener("click", () => {
  imageInput.click(); // simule un clic sur le champ file
});

// 2. Quand l’utilisateur sélectionne une image
imageInput.addEventListener("change", () => {
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imageDataUrl = e.target.result;

      // affiche la section et l’image
      img_section.style.display = "flex";
      imagePreview.style.display = "block";
      imagePreview.src = imageDataUrl;
    };

    reader.readAsDataURL(file);
  }
});

