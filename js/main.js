// const case_tweets = document.getElementById("case_tweets");
// const case_tweets = document.querySelector(".case_tweets");
// const leTweets = localStorage.getItem("content");

// affichage.js

const postTweetsSection = document.querySelectorAll(".post_tweets");
const deleteTweet = document.querySelectorAll(".deleteTweet");

// deleteTweet.forEach((btn) => {
// 🛠️ on dit à TS que c'est un bouton HTML
// deleteTweet.addEventListener("click", async (e) => {
//   const id = button.dataset.id; // ✅ plus d'erreur ici
//   await deleteTweets(Number(id)); // on convertit en nombre et on supprime
// });
// // });
// script_tweets/affichage.js ou autre fichier JS

// 🔁 Fonction pour récupérer l'image depuis le localStorage

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

async function afficherUnTweet(tweet) {
  // const user = localStorage.getItem("name");
  const image_tweet = localStorage.getItem("media");
  const userId = localStorage.getItem("id"); //   Récupération de l'id utilisateur ici
  const tweetDiv = document.createElement("div");
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();

  // Trouver le bon utilisateur : soit avec Number(), soit avec String()
  const user = users.find((u) => String(u.id) === String(tweet.userId)) || {};
  // 🔑 comparaison soup

  // 2. On prépare l'objet avec les bonnes images :

  const objetPhoto = {
    profilePicture:
      user.profilePicture ||
      "https://img.icons8.com/ios-filled/50/apple-camera.png",
  };
  tweetDiv.classList.add("p-4", "border-b", "border-gray-700", "w-full");
  let imageHTML = "";
  if (
    tweet.media &&
    tweet.media.length > 0 &&
    tweet.media[0].type === "image"
  ) {
    imageHTML = `<img src="${tweet.media[0].url}" alt="tweet image" class="mt-2 rounded-lg max-w-xs" />`;
  }

  tweetDiv.innerHTML = `
    <div class="flex flex-col gap-4">
     <img
  src="${
    user.profilePicture ||
    "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
  }"
  alt="avatar"
  class="profile-picture w-10 h-10 rounded-full"
/>
<span class="font-bold">${.name}</span>

        
        <p class="mt-1">${tweet.content}</p>
        <p class="mt-1">${tweet.id}</p>
          ${imageHTML}
        
      </div>
       <div class="flex justify-between text-gray-400 mt-3 max-w-[250px] text-xl">
        <button title="Commentaire" class="hover:text-blue-400">💬</button>
        <button title="Retweet" class="hover:text-green-400">🔁</button>
        <button title="Like" class="hover:text-pink-400">❤️</button>
        <button title="Partager" class="hover:text-blue-300">📤</button>
      <button 
   title="Supprimer" 
   class="hover:text-red-400 delete-tweet" 
    
    data-id="${tweet.id}"
   >
  supprimer
</button>
  </div>
    </div>
 

  `;

  postTweetsSection.forEach((section) => {
    section.prepend(tweetDiv.cloneNode(true));
  });
  // postTweetsSection.textConte(tweetDiv);
}

function affichage() {
  const anciensTweets = JSON.parse(localStorage.getItem("tweets") || "[]");

  if (anciensTweets.length > 0) {
    anciensTweets.forEach((tweet) => {
      afficherUnTweet(tweet);
    });
  } else {
    console.log("Aucun tweet enregistré.");
  }
}

postTweetsSection.forEach((element) => {
  element.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-tweet")) {
      const tweetId = e.target.dataset.id;
      alert("tu veux supprimer?");

      console.log("Tu veux supprimer le tweet avec ID :", tweetId);
      // ici on supprimera plus tard le tweet avec fetch()
    }

    if (e.target.classList.contains("delete-tweet")) {
      const tweetId = e.target.dataset.id;
      if (!tweetId) return;

      // 1. Suppression côté localStorage
      let anciensTweets = JSON.parse(localStorage.getItem("tweets") || "[]");
      anciensTweets = anciensTweets.filter(
        (tweet) => tweet.id !== Number(tweetId)
      );
      localStorage.setItem("tweets", JSON.stringify(anciensTweets));

      // 2. Suppression côté JSON Server
      try {
        await fetch(`http://localhost:3000/tweets/${tweetId}`, {
          method: "DELETE",
        });

        location.reload();
        alert("Tweet supprimé !");
        // Recharge pour mettre à jour l'affichage
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("Échec de la suppression.");
      }
    }
  });
});

window.addEventListener("DOMContentLoaded", affichage);

// leTweet.classList.add("tweet");
// tweetDiv.innerHTML = `
//       <div style="display:flex; gap:10px; align-items: flex-start; padding: 10px; border-bottom: 1px solid #333;">
//         <img src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="avatar" style="width:40px; height:40px; border-radius:50%;">
//         <div>
//           <strong style="color:white;">Utilisateur</strong>
//           <p style="margin: 4px 0; color:white;">${leTweets}</p>
//         </div>
//       </div>
//     `;
// const username1 = document.querySelectorAll(".username1");
// const username2 = document.querySelectorAll(".username2");

// const user = localStorage.getItem("name");

// case_tweets.forEach((el) => {
//   el.textContent = leTweets;
// });

// username2.forEach((el) => {
//   el.textContent = "@" + user;
// });

// leTweets.textContent(case_tweets);


// const authetification = document.getElementById("authetification");
// const nom = document.getElementById("noms");
// const btnInscription = document.getElementById("btnInscription");
// const email = document.getElementById("email");
// const myPassword = document.getElementById("password");
// const motDePasse = document.getElementById("motDePasse");
// const submit1 = document.getElementById("submit1");

// document.addEventListener("DOMContentLoaded", () => {
//   // const nom = document.getElementById("noms");
//   // const email = document.getElementById("email");

//   nom.addEventListener("blur", validateNom);
//   email.addEventListener("blur", validateEmail);

//   // @ts-ignore

//   function validateNom() {
//     const nomDirect = nom.value.trim();

//     if (nomDirect.length < 3) {
//       alert("Le nom doit contenir au moins 3 caractères.");
//       return;
//     }

//     checkNomExists(nomDirect);
//   }
//   function checkNomExists(nom) {
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then((users) => {
//         const existe = users.find((u) => u.name === nom);
//         if (existe) {
//           alert("Nom déjà utilisé !");
//         } else {
//           console.log("Nom disponible.");
//         }
//       })
//       .catch((err) => {
//         console.error("Erreur lors de la vérification du nom :", err);
//         alert("Une erreur est survenue.");
//       });
//   }

//   function validateEmail() {
//     const emailInput = document.getElementById("email");
//     const email = emailInput.value.trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (email === "") {
//       // Pas de validation si vide, on attend que l'utilisateur tape quelque chose
//       return;
//     }

//     if (!emailRegex.test(email)) {
//       alert("Format d’email invalide.");
//       return;
//     }

//     // Si le format est bon, on vérifie s’il existe dans la base
//     checkEmailExists(email);
//   }

//   function checkEmailExists(email) {
//     const url = "http://localhost:3000/users";

//     fetch(url)
//       .then((response) => response.json())
//       .then((users) => {
//         const emailTrouvé = users.find((user) => user.email === email);
//         if (emailTrouvé) {
//           alert("Email déjà enregistré");
//         } else {
//           console.log("Email disponible, on peut continuer l’inscription");
//         }
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la vérification de l’email :", error);
//         alert("Une erreur est survenue pendant la vérification.");
//       });
//   }

//   myPassword.addEventListener("blur", () => {
//     validatePassword();
//   });

//   function validatePassword() {
//     const pwd = myPassword.value.trim();

//     if (pwd === "") return;

//     if (pwd.length < 6) {
//       alert("Le mot de passe doit contenir au moins 6 caractères.");
//       return;
//     }

//     checkPasswordExists(pwd);
//   }

//   function checkPasswordExists(password) {
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then((users) => {
//         const existe = users.find((u) => u.password === password);
//         if (existe) {
//           alert("Ce mot de passe est déjà utilisé, choisis-en un autre !");
//           myPassword.style.border = "2px solid red";
//         } else {
//           console.log("Mot de passe disponible.");
//           myPassword.style.border = "2px solid green";
//         }
//       })
//       .catch((err) => {
//         console.error("Erreur lors de la vérification du mot de passe :", err);
//         alert("Une erreur est survenue.");
//       });
//   }

//   btnInscription.addEventListener("click", async (e) => {
//     e.preventDefault();

//     // Récupérer les valeurs
//     const nomValue = nom.value.trim();
//     const emailValue = email.value.trim();
//     const passwordValue = myPassword.value.trim();

//     // Vérifications basiques
//     if (nomValue.length < 3 || emailValue === "" || passwordValue.length < 6) {
//       alert("Tous les champs doivent être remplis correctement.");
//       return;
//     }

//     // Créer l'objet utilisateur
//     const user = {
//       name: nomValue,
//       email: emailValue,
//       password: passwordValue, // ⚡ reste cohérent avec la clé
//     };

//     try {
//       // POST vers json-server
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       console.log("Status POST :", response.status);

//       const newUser = await response.json();
//       if (newUser && newUser.id != null) {
//         // ✅ Stocker l'utilisateur courant dans localStorage
//         localStorage.setItem("id", newUser.id);
//         localStorage.setItem("name", newUser.name);
//         localStorage.setItem("email", newUser.email);
//         localStorage.setItem("password", newUser.password);
//       }
//       console.log(newUser);
//       // Redirection après l'inscription
//       window.location.href = "key.html";
//     } catch (err) {
//       console.error("Erreur lors du POST :", err);
//       alert("Une erreur est survenue lors de l'inscription.");
//     }
//   });
// });



// function checkPasswordExists(password) {
//   fetch("http://localhost:3000/users")
//     .then((res) => res.json())
//     .then((users) => {
//       const existe = users.find((u) => u.password === password);
//       if (existe) {
//         alert("Ce mot de passe est déjà utilisé, choisis-en un autre !");
//         myPassword1.style.border = "2px solid red";
//       } else {
//         console.log("Mot de passe disponible.");
//         myPassword1.style.border = "2px solid green";
//       }
//     })
//     .catch((err) => {
//       console.error("Erreur lors de la vérification du mot de passe :", err);
//       alert("Une erreur est survenue.");
//     });
// }