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

  nextRepos.forEach((repo) => {
    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
        <a href="${
          repo.html_url
        }" target="_blank" style="text-decoration:none; color:blue; font-weight:bold;">
            <div class="repo-header">
                <h3>${repo.name}</h3>
                <p style="font-size: 0.9em; color: #666;">${
                  repo.description || "Visit repo for details."
                }</p>
            </div>
            <div class="repo-footer">
                <span class="repo-tag">${
                  repo.language || "Code"
                }</span>                
            </div>
            </a>
        `;
    container.appendChild(card);
  });

  currentIndex += BATCH_SIZE;
}

initScrollList();
