const authetification = document.getElementById("authetification");
const nom = document.getElementById("noms");
const btnInscription = document.getElementById("btnInscription");
const email = document.getElementById("email");
const myPassword1 = document.getElementById("password");
const motDePasse = document.getElementById("motDePasse");
const submit1 = document.getElementById("submit1");
const confirmPassword = document.getElementById("confirm-password");
// @ts-ignore

function validateNom() {
  const nomDirect = nom.value.trim();

  if (nomDirect.length < 3) {
    alert("Le nom doit contenir au moins 3 caractères.");
    return;
  }

  checkNomExists(nomDirect);
}
function checkNomExists(nom) {
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((users) => {
      const existe = users.find((u) => u.name === nom);
      if (existe) {
        alert("Nom déjà utilisé !");
      } else {
        console.log("Nom disponible.");
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la vérification du nom :", err);
      alert("Une erreur est survenue");
    });
}

function validateEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    // Pas de validation si vide, on attend que l'utilisateur tape quelque chose
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Format d’email invalide.");
    return;
  }

  // Si le format est bon, on vérifie s’il existe dans la base
  checkEmailExists(email);
}

nom.addEventListener("blur", validateNom);
email.addEventListener("blur", validateEmail);

// document.addEventListener("DOMContentLoaded", () => {
//   const nom = document.getElementById("noms");
//   const email = document.getElementById("email");

//
// });

function checkEmailExists(email) {
  const url = "http://localhost:3000/users";

  fetch(url)
    .then((response) => response.json())
    .then((users) => {
      const emailTrouvé = users.find((user) => user.email === email);
      if (emailTrouvé) {
        alert("Email déjà enregistré");
      } else {
        console.log("Email disponible, on peut continuer l’inscription");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la vérification de l’email :", error);
      alert("Une erreur est survenue pendant la vérification.");
    });
}

confirmPassword.addEventListener("blur", () => {
  validatePassword();
});

function validatePassword() {
  const pwd = myPassword1.value.trim();

  if (pwd === "") return;

  if (pwd.length < 6) {
    alert("Le mot de passe doit contenir au moins 6 caractères.");
    return;
  }

  checkPasswordExists(pwd);
}

function checkPasswordExists() {
  try {
    const existe = confirmPassword.value.trim() !== myPassword1.value.trim();

    if (existe) {
      alert("Votre mot de passe ne correspond pas");
      myPassword1.style.border = "2px solid red";
      confirmPassword.style.border = "2px solid red";
    } else {
      console.log("Mot de passe confirmé.");
      myPassword1.style.border = "2px solid green";
      confirmPassword.style.border = "2px solid green";
    }
  } catch (err) {
    console.error("Erreur lors de la vérification du mot de passe :", err);
    alert("Une erreur est survenue.");
  }
}

btnInscription.addEventListener("click", (e) => {
  e.preventDefault();

  let user = {
    name: nom.value.trim(),
    email: email.value.trim(),
    myPassword: myPassword1.value.trim(),
  };

  if (user.name.length < 3 || user.email === "" || user.myPassword.length < 6) {
    alert("Tous les champs doivent être remplis correctement.");
    return;
  }

  const endPoiints = "http://localhost:3000/users";
  fetch(endPoiints, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Utilisateur ajouté :", data);

      // ici  l'ID généré par json-server
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.myPassword);
      localStorage.setItem("isLogged", "true");

      // alert("Inscription réussie !");
      window.location.href = "acceuil.html"; // redirection après enregistrement
    })
    .catch((err) => {
      console.error("Erreur ajout utilisateur :", err);
      alert("Erreur lors de l'inscription");
    });
});
