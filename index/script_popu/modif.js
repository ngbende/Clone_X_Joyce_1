const btnModifier = document.getElementById("btn-modifier");
const popup_profil = document.getElementById("popup-modifier");
const btnAnnuler = document.getElementById("btn-annuler");
const iconProfil = document.getElementById("icon-profil");
const iconCouverture = document.getElementById("icon-couverture");
const inputProfil = document.getElementById("input-profil");
const inputCouverture = document.getElementById("input-couverture");
// Ouvre la popup
btnModifier.addEventListener("click", () => {
  popup_profil.classList.remove("hidden");
});

// Ferme la popup
btnAnnuler.addEventListener("click", () => {
  popup_profil.classList.add("hidden");
});

//  Clique sur l'icône → clique sur input
iconProfil.addEventListener("click", () => {
  inputProfil.click();
});

iconCouverture.addEventListener("click", () => {
  inputCouverture.click();
});
