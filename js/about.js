//sports
const BATCH_SIZE = 10; // Loads 10 at a time
let currentSportstIndex = 0;
let currentHobbiestIndex = 0;
let sports = [];
let hobbies = [];

const ICONS = {
  work: `...`, // el que ya tienes
  education: `...`, // el que ya tienes
  activity: `<svg viewBox="0 0 16 16"><path d="M9.5 0a.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5h3ZM8 3.5a.5.5 0 0 0-1 0V5H2.5A1.5 1.5 0 0 0 1 6.5v7A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 5H9V3.5ZM9 5h4.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V14a.5.5 0 0 0 1 0V5Z"></path></svg>`,
  heart: `<svg viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z"></path></svg>`
};

function showPersInfo() {
  //buttons
  profBtn.enabled = true;
  profBtn.style.backgroundColor = "#FFFFFF";
  persBtn.enabled = false;
  persBtn.style.backgroundColor = "#808080";
  //divs
  profDiv.style.display = "none";
  persDiv.style.display = "block";
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
}

function createCardHTML(iconType, title, subtitle, info, additionalText = "") {
  return `
        <div class="list-item-card">
            <div class="icon-container">${ICONS[iconType]}</div>
            <div class="card-text-content">
                <h4>${title}</h4>
                <span class="subtitle">${subtitle}</span>
                <p class="period">${info}</p>
                <p class="additional-text">${additionalText}</p>
            </div>
        </div>
    `;
}

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

    const sportsAnchor = document.getElementById("sportsScrollAnchor");
    if (sportsAnchor) {
      observer.observe(document.getElementById("sportsScrollAnchor"));
    }
  } catch (error) {
    console.error("Error loading sports:", error);
  }
}

function loadNextSportsBatch() {
  const container = document.getElementById("sportsListContainer");
  const next = sports.slice(currentSportstIndex, currentSportstIndex + BATCH_SIZE);

  next.forEach((item) => {
    const cardWrapper = document.createElement("div");
    // Usamos 'work' temporalmente para el ícono si no has definido uno nuevo
    cardWrapper.innerHTML = createCardHTML("work", item.name, item.level, "", item.description);
    container.appendChild(cardWrapper);
  });
  currentSportstIndex += BATCH_SIZE;
}

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
    const hobbiesAnchor = document.getElementById("hobbiesSrollAnchor");
    if (hobbiesAnchor) {
      observer.observe(document.getElementById("hobbiesScrollAnchor"));
    }
  } catch (error) {
    console.error("Error loading hobbies:", error);
  }
}

function loadNextHobbiesBatch() {
  const container = document.getElementById("hobbiesListContainer");
  const next = hobbies.slice(currentHobbiestIndex, currentHobbiestIndex + BATCH_SIZE);

  next.forEach((item) => {
    const cardWrapper = document.createElement("div");
    // Mismo formato que la profesional para que herede el CSS
    cardWrapper.innerHTML = createCardHTML("work", item.name, "Hobby", "", item.description);
    container.appendChild(cardWrapper);
  });
  currentHobbiestIndex += BATCH_SIZE;
}

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
      // CAMBIO AQUÍ: Usamos la nueva función
      li.innerHTML = createCardHTML(
        "work",
        job.role,
        job.company,
        `${job.period} · ${job.location}`,
        job.description
      );
      jobsList.appendChild(li);
    });

    // 4. Render Education
    const eduList = document.getElementById("education-list");
    edu.forEach((item) => {
      const li = document.createElement("div");
      li.innerHTML = createCardHTML(
        "education",
        item.institute,
        item.degreeAndDate,
        ""
      );
      eduList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading professional data:", error);
  }
}

showProfInfo();
initSportsScrollList();
initHobbiesScrollList();
document.addEventListener("DOMContentLoaded", loadProfessionalData);
