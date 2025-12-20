//sports
const BATCH_SIZE = 10; // Loads 10 at a time
let currentSportstIndex = 0;
let currentHobbiestIndex = 0;
let sports = [];
let hobbies = [];

const ICONS = {
  work: `<svg viewBox="0 0 16 16"><path d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0113 12h-1.077c.101.21.191.432.268.665l.39 1.169a.75.75 0 01-.71.986H4.129a.75.75 0 01-.71-.986l.39-1.169c.077-.233.167-.455.268-.665H3A1.5 1.5 0 011.5 10.5v-8zm1.5 0v8h10v-8H3zm3.129 9.5a3.804 3.804 0 00-.312 1h5.366c-.08-.347-.184-.68-.312-1H6.129z"></path></svg>`,
  education: `<svg viewBox="0 0 16 16"><path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.5 9.931a3.73 3.73 0 011.503-.681h3.748V2.5h-2.756c-.646 0-1.312.329-1.745.851a.75.75 0 01-1.153 0c-.433-.522-1.099-.851-1.745-.851H3.5v8.5h3.748a3.73 3.73 0 011.503.681l.749.749.749-.749z"></path></svg>`,
  activity: `<svg viewBox="0 0 16 16"><path d="M9.504 1.176a.75.75 0 01.157.81L7.531 6.5h3.719a.75.75 0 01.583 1.221l-6 7.5a.75.75 0 01-1.245-.831L6.712 9H3a.75.75 0 01-.583-1.221l6-7.5a.75.75 0 011.087-.103z"></path></svg>`,
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
    cardWrapper.innerHTML = createCardHTML("activity", item.name, item.level, "", item.description);
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
    cardWrapper.innerHTML = createCardHTML("heart", item.name, "", "", item.description);
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
