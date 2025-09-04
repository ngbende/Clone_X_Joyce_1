const submit_password = document.getElementById("submit_password");
const password2 = document.getElementById("password2");

submit_password.addEventListener("click", async (e) => {
  e.preventDefault();

  const nom = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const myPassword = localStorage.getItem("password");
  let utilisateurs = await recupUtilisateur();

  let trouve = false;

  for (const element of utilisateurs) {
    // console.log(element.name);
    if (element.email === email || myPassword === password2.value.trim()) {
      alert("Connexion réussie !");
      window.location.href = "acceuil.html";
      localStorage.setItem("isLogged", "true");
      trouve = true;

      break;
    }
  }

  if (!trouve) {
    alert("mot de passe ou email incorrect");
  }
});

async function recupUtilisateur() {
  const endPoiints2 = "http://localhost:3000/users";
  let response = await fetch(endPoiints2, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  let utilisateurs = await response.json();
  return utilisateurs;
}
