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
  const nextSports = sports.slice(
    currentSportstIndex,
    currentSportstIndex + BATCH_SIZE
  );

  nextSports.forEach((activity) => {
    const card = document.createElement("div");
    card.className = "activities-card";
    card.innerHTML = `
            <div class="activity-aside">
                <span class="repo-img">
                    <img src="${activity.image}" alt="${activity.name}">
                </span>                
            </div>
            <div class="activity-header">
                <h4>${activity.name}</h4>
                <p>${activity.description}</p>
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
  const nextHobbies = hobbies.slice(
    currentHobbiesIndex,
    currentHobbiesIndex + BATCH_SIZE
  );

  nextHobbies.forEach((activity) => {
    const card = document.createElement("div");
    card.className = "activities-card";
    card.innerHTML = `
            <div class="activity-aside">
                <span class="repo-img">
                    <img src="${activity.image}" alt="${activity.name}">
                </span>                
            </div>        
            <div class="activity-header">
                <h4>${activity.name}</h4>
                <p>${activity.description}</p>
            </div>
            
        `;
    container.appendChild(card);
  });

  currentHobbiesIndex += BATCH_SIZE;
}

initHobbiesScrollList();

//load professional profile
async function loadProfessionalData() {
  try {
    // Fetch all data
    const [certs, jobs, edu] = await Promise.all([
      fetch("../json/certifications.json").then((r) => r.json()),
      fetch("../json/jobs.json").then((r) => r.json()),
      fetch("../json/education.json").then((r) => r.json()),
    ]);

    // 2. Render Certifications as Tags
    const certContainer = document.getElementById("certifications-tags");
    certs.forEach((cert) => {
      const span = document.createElement("span");
      span.className = "cert-tag";
      span.textContent = cert;
      certContainer.appendChild(span);
    });

    // 3. Render Jobs
    const jobsList = document.getElementById("experience-list");
    jobs.forEach((job) => {
      const li = document.createElement("div");
      li.innerHTML = `
                <div class="prof-card">
                  <h4>${job.company}</h4>
                  <h5>${job.role}</h5>
                  <p>${job.description}</p>
                </div>
            `;
      jobsList.appendChild(li);
    });

    // 4. Render Education
    const eduList = document.getElementById("education-list");
    edu.forEach((item) => {
      const li = document.createElement("div");
      li.innerHTML = `
            <div class="prof-card">
              <h4>${item.institute}</h4>
              <p>${item.degreeAndDate}</p>
            </div>
          `;
      eduList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading professional data:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProfessionalData);
