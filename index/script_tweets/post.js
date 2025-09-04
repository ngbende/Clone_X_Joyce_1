// const { use } = require("react");

const input_tweets = document.getElementById("tweets");
const btn_post = document.querySelector(".btn_post");
let imageDataUrl;

btn_post.addEventListener("click", async (e) => {
  e.preventDefault();
  const nom = localStorage.getItem("name");
  // 🔑 pas newUser.userId
  const userId = localStorage.getItem("id");
  const tweetContent = input_tweets.value.trim();

  const user = {
    id: Date.now(),
    userId: userId,
    name: nom,
    content: tweetContent,
    media: imageDataUrl
      ? [
          {
            type: "image",
            url: imageDataUrl,
          },
        ]
      : [], //  utilise directement l'objet récupéré
  };

  if (!tweetContent && !imageDataUrl) {
    alert("Tweet vide !");
    return;
  }

  //Stocker en localStorage
  const anciensTweets = JSON.parse(localStorage.getItem("tweets") || "[]");
  anciensTweets.push(user);
  localStorage.setItem("tweets", JSON.stringify(anciensTweets));

  // 2. Envoi vers JSON Server
  await fetch("http://localhost:3000/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  afficherUnTweet(user); // affiche immédiatement le tweet sans recharger

  // if (typeof afficherUnTweet === "function") {
  //   afficherUnTweet(user);
  // }
});
window.addEventListener("DOMContentLoaded", affichage);

//  Stocker nom et email
// localStorage.setItem("nom", nom.value);
// localStorage.setItem("email", email.value);

// Rediriger vers la page du mot de passe
