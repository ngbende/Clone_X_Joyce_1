// Lecture image de profil

document.addEventListener("DOMContentLoaded", () => {
  let imageProfilBase64 = null;
  let imageCouvertureBase64 = null;

  const preview_couverture = document.getElementById("preview_couverture");
  const preview_profil = document.getElementById("preview_profil");
  const space_couverture = document.getElementById("space_couverture");
  const popup = document.getElementById("popup-modifier");

  const inputProfil = document.getElementById("input-profil");

  inputProfil.addEventListener("change", (e) => {
    e.preventDefault();
    const file = inputProfil.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageProfilBase64 = reader.result; // stockée pour l'envoi au serveur
        preview_profil.src = imageProfilBase64;
        preview_profil.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

  // Lecture image de couverture
  inputCouverture.addEventListener("change", () => {
    const file = inputCouverture.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        imageCouvertureBase64 = reader.result;
        preview_couverture.src = imageCouvertureBase64;
        preview_couverture.classList.remove("hidden");
      };

      reader.readAsDataURL(file);
    }
  });
  const btnValider = document.getElementById("btn-valider");

  btnValider.addEventListener("click", async () => {
    const userId = localStorage.getItem("id");

    // 1. On récupère l'utilisateur actuel pour connaître ses images enregistrées
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();

    // 2. On prépare l'objet avec les bonnes images :
    const objetPhoto = {
      profilePicture:
        imageProfilBase64 ||
        user.profilePicture ||
        "https://img.icons8.com/ios-filled/50/apple-camera.png",
      coverPicture:
        imageCouvertureBase64 ||
        user.coverPicture ||
        "https://img.icons8.com/ios-filled/50/apple-camera.png",
    };

    // 3. On envoie les données modifiées au serveur
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetPhoto),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      alert("Photo de profil mise à jour avec succès !");
      popup.classList.add("hidden");
      loadUserProfile(userId);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour, réessaie plus tard");
    }
  });
});
