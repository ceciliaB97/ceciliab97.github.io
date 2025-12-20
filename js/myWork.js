let allRepos = [];
let currentIndex = 0;
const BATCH_SIZE = 6; // Loads 6 at a time

async function initScrollList() {
  try {
    const response = await fetch("../json/repos.json");
    allRepos = await response.json();

    loadNextBatch();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentIndex < allRepos.length) {
          loadNextBatch();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById("scrollAnchor"));
  } catch (error) {
    console.error("Error loading repositories:", error);
  }
}

function loadNextBatch() {
  const container = document.getElementById("reposListContainer");
  const nextRepos = allRepos.slice(currentIndex, currentIndex + BATCH_SIZE);

  // SVG de repositorio tipo GitHub
  const repoSVG = `<svg viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7a.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8v-7.5zM5 12.25a.25.25 0 01.25-.25H12a.25.25 0 01.25.25v2.5a.25.25 0 01-.25.25H5.25a.25.25 0 01-.25-.25v-2.5z"></path></svg>`;

  nextRepos.forEach((repo) => {
    const card = document.createElement("a"); // Convertimos la tarjeta entera en un link
    card.className = "repo-card";
    card.href = repo.html_url;
    card.target = "_blank";
    
    card.innerHTML = `
        <div class="repo-icon-container">
            ${repoSVG}
        </div>
        <div class="repo-info">
            <h3>${repo.name}</h3>
            <p class="repo-description">${repo.description || "No description available."}</p>
            <span class="repo-language-tag">${repo.language || "Code"}</span>
        </div>
    `;
    
    container.appendChild(card);
  });
  currentIndex += BATCH_SIZE;
}

initScrollList();
