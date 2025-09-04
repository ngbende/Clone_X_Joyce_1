const num_mail = document.getElementById("num_mail");

const submit_connex = document.getElementById("submit_connex");

submit_connex.addEventListener("click", async (e) => {
  e.preventDefault();

  let utilisateurs = await recupUtilisateur();

  let trouve = false;

  const email = num_mail.value;
  localStorage.setItem("email", email);

  for (const element of utilisateurs) {
    if (element.email === email) {
      trouve = true;
      localStorage.setItem("name", element.name);
      localStorage.setItem("id", element.id); // Stocker l'ID de l'utilisateur connecté

      window.location.href = "key.html";
      break; // très important !
    }
  }
  if (!trouve) {
    alert("email incorrect");
  }
});
async function recupUtilisateur() {
  const endPoiints2 = "http://localhost:3000/users";
  let response = await fetch(
    endPoiints2,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
    // @ts-ignore
  );

  let utilisateurs = await response.json();
  return utilisateurs;
}
