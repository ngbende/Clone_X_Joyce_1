async function loadUserProfile(userId) {
  const res = await fetch(`http://localhost:3000/users/${userId}`);
  const user = await res.json();

  //Mettre l’image de profil sur toutes les pages
  const profileImgElements = document.querySelectorAll(".profile-picture");
  profileImgElements.forEach((img) => {
    img.src =
      user.profilePicture ||
      "https://img.icons8.com/ios-filled/50/apple-camera.png";
  });

  //  Image de couverture (que pour la page profil)
  const spaceCouverture = document.getElementById("space_couverture");

  if (spaceCouverture) {
    if (user.coverPicture) {
      spaceCouverture.innerHTML = `<img src="${user.coverPicture}" alt="image couverture" class="absolute w-full h-55 object-cover rounded-lg" />`;
    } else {
      spaceCouverture.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/apple-camera.png" alt="image couverture" class="w-full h-40 object-cover rounded-lg" />`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("id");
  if (userId) {
    loadUserProfile(userId);
  }
});
