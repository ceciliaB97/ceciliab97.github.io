function showPersInfo() {
    //buttons
    profBtn.enabled = true;
    profBtn.style.backgroundColor = "#FFFFFF";
    persBtn.enabled = false;
    persBtn.style.backgroundColor = "#808080";
    //divs
    profDiv.style.display = "none";
    persDiv.style.display = "block";
    persListsWrapperDiv.style.display = "block";
}

function showProfInfo() {
    //buttons
    profBtn.enabled = false;
    profBtn.style.backgroundColor = "#808080";
    persBtn.enabled = true;
    persBtn.style.backgroundColor = "#FFFFFF";
    //divs
    profDiv.style.display = "block";
    persDiv.style.display = "none";
    persListsWrapperDiv.style.display = "none";
}

showProfInfo();

//sports
const BATCH_SIZE = 2; // Loads 6 at a time
let currentSportstIndex = 0;
let sports = [];

async function initSportsScrollList() {
  try {
    const response = await fetch("../json/sports.json");
    sports = await response.json();

    loadNextSportsBatch();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentSportstIndex < sports.length) {
          loadNextSportsBatch();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById("sportsScrollAnchor"));
  } catch (error) {
    console.error("Error loading sports:", error);
  }
}

function loadNextSportsBatch() {
  const container = document.getElementById("sportsListContainer");
  const nextSports = sports.slice(currentSportstIndex, currentSportstIndex + BATCH_SIZE);

  nextSports.forEach((activity) => {
    const card = document.createElement("div");
    card.className = "activities-card";
    card.innerHTML = `
            <div class="activity-header">
                <h4>${activity.name}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-aside">
                <span class="repo-img">
                    <img src="${activity.image}" alt="${activity.name}">
                </span>                
            </div>
        `;
    container.appendChild(card);
  });

  currentSportstIndex += BATCH_SIZE;
}

initSportsScrollList();


//hobbies
let currentHobbiesIndex = 0;
let hobbies = [];

async function initHobbiesScrollList() {
  try {
    const response = await fetch("../json/hobbies.json");
    hobbies = await response.json();

    loadNextHobbiesBatch();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentHobbiesIndex < hobbies.length) {
          loadNextHobbiesBatch();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById("hobbiesSrollAnchor"));
  } catch (error) {
    console.error("Error loading hobbies:", error);
  }
}

function loadNextHobbiesBatch() {
  const container = document.getElementById("hobbiesListContainer");
  const nextHobbies = hobbies.slice(currentHobbiesIndex, currentHobbiesIndex + BATCH_SIZE);

  nextHobbies.forEach((activity) => {
    const card = document.createElement("div");
    card.className = "activities-card";
    card.innerHTML = `
            <div class="activity-header">
                <h4>${activity.name}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-aside">
                <span class="repo-img">
                    <img src="${activity.image}" alt="${activity.name}">
                </span>                
            </div>
        `;
    container.appendChild(card);
  });

  currentHobbiesIndex += BATCH_SIZE;
}

initHobbiesScrollList();
