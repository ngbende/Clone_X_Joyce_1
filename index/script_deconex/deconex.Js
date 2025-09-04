// Protéger les pages privées
if (
  window.location.pathname.includes("acceuil.html") ||
  window.location.pathname.includes("profile.html")
) {
  const isLogged = localStorage.getItem("isLogged");

  if (!isLogged || isLogged !== "true") {
    window.location.replace("../index.html"); // Remplace la page sans garder l’historique

    // ou vers ta page de connexion
  }
}

// Gérer la déconnexion
const btnDeconnexion = document.querySelectorAll(".btn_deconnexion");

btnDeconnexion.forEach((btn) => {
  btn.addEventListener("click", () => {
    // localStorage.clear(); // supprime tout
    localStorage.removeItem("isLogged"); // ne supprime que la connexion
    window.location.replace("../index.html"); // Remplace la page pour bloquer le retour
  });
});
