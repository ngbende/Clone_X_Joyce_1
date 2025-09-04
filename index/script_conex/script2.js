// btnInscription.addEventListener("click", async (e) => {
//   // ⚡ ajouter async ici
//   e.preventDefault();

//   // Récupérer les valeurs
//   const nom = document.getElementById("noms").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   // Créer l'objet utilisateur
//   const user = { name: nom, email: email, myPassword: password };

//   try {
//     const response = await fetch("http://localhost:3000/users", {
//       // pas /:id pour POST
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });

//     console.log("Status POST :", response.status);

//     const newUser = await response.json();
//     if (newUser && newUser.id != null) {
//       //  Stocker l'utilisateur courant
//       localStorage.setItem("id", newUser.id);
//       localStorage.setItem("name", newUser.name);
//       localStorage.setItem("email", newUser.email);
//     }

//     // Redirection après que tout est fait
//     window.location.href = "key.html";
//   } catch (err) {
//     console.error("Erreur lors du POST :", err);
//   }
// });
