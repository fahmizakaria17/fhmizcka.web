/* ==================================================
   ANIMASI KURSOR (LANGSUNG AKTIF)
================================================== */
(function initCursor() {
  // Buat element secara instan tanpa tunggu DOM
  const dot = document.createElement("div");
  const outline = document.createElement("div");
  
  dot.className = "cursor-dot";
  outline.className = "cursor-outline";
  
  document.documentElement.appendChild(dot);
  document.documentElement.appendChild(outline);

  let mouseX = -100, mouseY = -100;
  let outlineX = -100, outlineY = -100;

  // Tangkap pergerakan mouse
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Titik kecil langsung nempel posisi mouse
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Animasi lingkaran mengejar titik kursor
  function render() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(render);
  }
  render();

  // Efek membesar saat kursor di atas link / item
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .timeline-item, .achievement-item")) {
      outline.classList.add("hover");
    } else {
      outline.classList.remove("hover");
    }
  });
})();

/* ==================================================
   DATA DIRI
================================================== */

const data = {

    name: "Fahmi Zakaria",

    age: 16,

    school: "SMKN 1 JAKARTA",

    major: "TKJ",

    bio: "Saya adalah pribadi yang memiliki rasa ingin tahu tinggi, senang mempelajari hal baru, dan terus berusaha memberikan hasil terbaik dalam setiap proses yang dijalani.",


    /* ================= PENDIDIKAN ================= */

    education: [

        {
            year: "2014 — 2017",
            level: "PAUD",
            name: "TPAUD Luru Ilmu",
            desc: "Awal perjalanan pendidikan"
        },

        {
            year: "2017 — 2023",
            level: "SD",
            name: "SDN Kebon Kosong 05 PG",
            desc: "Membangun fondasi dan pengalaman pertama"
        },

        {
            year: "2023 — 2026",
            level: "SMP",
            name: "SMPN 79 JAKARTA",
            desc: "Mulai menemnukan minat dan mengembangkan kemampuan"
        },

        {
            year: "2026 — NOW",
            level: "SMK",
            name: "SMKN 1 JAKARTA",
            desc: "Mengembangkan kompetensi dan mempersiapkan masa depan"
        }

    ],


    /* ================= PRESTASI ================= */

    achievements: [

        {
            title: "Juara 1 Lomba Kaligrafi",
            detail: "Tingkat Sekolah",
            year: "2023"
        },

        {
            title: "Juara 2 Marching Band",
            detail: "Tingkat Kota",
            year: "2024"
        },

        {
            title: "Sertifikat Pencapaian",
            detail: "Bidang Akademik",
            year: "2026"
        },

        {
            title: "Penghargaan Sekolah",
            detail: "Bidang Non-Akademik",
            year: "2023"
        }

    ]

};


/* ==================================================
   MEMASUKKAN DATA DIRI
================================================== */

const setElemText = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

setElemText("heroName", data.name);
setElemText("fullName", data.name);
setElemText("age", String(data.age).padStart(2, "0"));
setElemText("ageDetail", `${data.age} Tahun`);
setElemText("schoolDetail", data.school);
setElemText("majorDetail", data.major);
setElemText("bio", data.bio);
setElemText("currentSchool", data.school);
setElemText("currentMajor", data.major);
setElemText("contactName", data.name);
setElemText("footerName", data.name);
setElemText("achievementCount", String(data.achievements.length).padStart(2, "0"));


/* ==================================================
   TIMELINE PENDIDIKAN
================================================== */

const timelineEl = document.getElementById("timeline");
if (timelineEl) {
  timelineEl.innerHTML = data.education.map(item => `
    <div class="timeline-item">
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-level">${item.level}</div>
        <div>
            <div class="timeline-name">${item.name}</div>
            <span class="timeline-desc">${item.desc}</span>
        </div>
        <div class="timeline-arrow">↗</div>
    </div>
  `).join("");
}


/* ==================================================
   DAFTAR PRESTASI
================================================== */

const achievementListEl = document.getElementById("achievementList");
if (achievementListEl) {
  achievementListEl.innerHTML = data.achievements.map((item, i) => `
    <div class="achievement-item">
        <div class="achievement-index">${String(i + 1).padStart(2, "0")}</div>
        <div>
            <div class="achievement-title">${item.title}</div>
            <div class="achievement-detail">${item.detail}</div>
        </div>
        <div class="achievement-year">${item.year}</div>
        <div class="achievement-arrow">↗</div>
    </div>
  `).join("");
}


/* ==================================================
   ANIMASI SCROLL
================================================== */

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


/* ==================================================
   EFEK CAHAYA MENGIKUTI MOUSE
================================================== */

document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const orbOne = document.querySelector(".orb-one");
    const orbTwo = document.querySelector(".orb-two");

    if (orbOne) orbOne.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
    if (orbTwo) orbTwo.style.transform = `translate(${x * -12}px, ${y * -12}px)`;
});


/* ==================================================
   FOTO ERROR HANDLER
================================================== */

const photo = document.getElementById("profilePhoto");
if (photo) {
    photo.addEventListener("error", () => {
        photo.style.display = "none";
    });
}