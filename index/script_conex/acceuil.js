document.addEventListener("DOMContentLoaded", () => {
  const username1 = document.querySelectorAll(".username1");
  const username2 = document.querySelectorAll(".username2");

  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("name");

  // Si pas d'utilisateur connecté → retour login
  if (!userId || !userName) {
    window.location.href = "login.html";
    return;
  }

  // Sinon → affichage des infos déjà en localStorage
  username1.forEach((el) => {
    el.textContent = userName;
  });

  username2.forEach((el) => {
    el.textContent = "@" + userName;
  });

  // Optionnel : on peut aussi récupérer les infos à jour côté serveur
  // fetch(`http://localhost:3000/users/${userId}`)
  //   .then((res) => res.json())
  //   .then((user) => {
  //     // Si jamais le nom a changé côté serveur
  //     username1.forEach((el) => {
  //       el.textContent = user.name;
  //     });
  //     username2.forEach((el) => {
  //       el.textContent = "@" + user.name;
  //     });
  //   })
  //   .catch((err) => {
  //     console.error("Erreur chargement user :", err);
  //   });

  // async function afficherTousLesTweets() {
  //   try {
  //     const res = await fetch("http://localhost:3000/tweets");
  //     const tweets = await res.json();

  //     if (tweets.length === 0) {
  //       console.log("Aucun tweet trouvé sur le serveur.");
  //       return;
  //     }

  //     // On vide la section avant de réinjecter
  //     postTweetsSection.forEach((section) => {
  //       section.innerHTML = "";
  //     });

  //     // On affiche chaque tweet (les plus récents en haut)
  //     tweets.reverse().forEach((tweet) => {
  //       afficherUnTweet(tweet);
  //     });
  //   } catch (err) {
  //     console.error("Erreur lors du chargement des tweets :", err);
  //   }
  // }
  // afficherTousLesTweets();
});
