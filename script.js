const translations = {
  en: {
    eyebrow: "With love & prayers",
    title: "You Are Cordially Invited",
    intro: "Please open this invitation",
    miniInvitation: "INVITATION",
    open: "Open Invitation",
    hint: "Tap the envelope",
    kicker: "WEDDING INVITATION",
    welcome: "You are warmly invited to celebrate with us",
    dateLabel: "DATE",
    month: "OCTOBER 2026",
    weekday: "MONDAY",
    venueLabel: "CHURCH",
    venue: "St. Christopher Church",
    receptionVenue: "St. Christopher Church Hall",
    place: "Chavadimukku, Sreekaryam",
    timeLabel: "TIME",
    service: "Wedding Service",
    receptionTitle: "RECEPTION",
    receptionDate: "25 October 2026",
    receptionTime: "4:00 PM onwards",
    at: "at",
    countdownTitle: "Counting down to the wedding",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    mapTitle: "CHURCH LOCATION",
    placeFull: "Chavadimukku, Sreekaryam, Thiruvananthapuram, Kerala",
    viewMap: "View on Google Maps",
    closing: "With love and prayers",
    close: "Close Invitation"
  },
  ml: {
    eyebrow: "സ്നേഹത്തോടും പ്രാർത്ഥനകളോടും കൂടി",
    title: "സാദരം ക്ഷണിക്കുന്നു",
    intro: "ക്ഷണക്കത്ത് തുറക്കുക",
    miniInvitation: "ക്ഷണക്കത്ത്",
    open: "ക്ഷണക്കത്ത് തുറക്കുക",
    hint: "കവറിൽ സ്പർശിക്കുക",
    kicker: "വിവാഹ ക്ഷണക്കത്ത്",
    welcome: "ഞങ്ങളോടൊപ്പം ഈ സന്തോഷം ആഘോഷിക്കാൻ സാദരം ക്ഷണിക്കുന്നു",
    dateLabel: "തീയതി",
    month: "ഒക്ടോബർ 2026",
    weekday: "തിങ്കളാഴ്ച",
    venueLabel: "പള്ളി",
    venue: "സെന്റ് ക്രിസ്റ്റഫർ ചർച്ച്",
    receptionVenue: "സെന്റ് ക്രിസ്റ്റഫർ ചർച്ച് ഹാൾ",
    place: "ചാവടിമുക്ക്, ശ്രീകാര്യം",
    timeLabel: "സമയം",
    service: "വിവാഹ ശുശ്രൂഷ",
    receptionTitle: "റിസപ്ഷൻ",
    receptionDate: "25 ഒക്ടോബർ 2026",
    receptionTime: "വൈകുന്നേരം 4 മണി മുതൽ",
    at: "സ്ഥലം:",
    countdownTitle: "വിവാഹ ദിനത്തിലേക്ക്",
    days: "ദിവസങ്ങൾ",
    hours: "മണിക്കൂറുകൾ",
    minutes: "മിനിറ്റുകൾ",
    seconds: "സെക്കൻഡുകൾ",
    mapTitle: "പള്ളി ലൊക്കേഷൻ",
    placeFull: "ചാവടിമുക്ക്, ശ്രീകാര്യം, തിരുവനന്തപുരം, കേരളം",
    viewMap: "Google Maps-ൽ കാണുക",
    closing: "സ്നേഹത്തോടും പ്രാർത്ഥനകളോടും കൂടി",
    close: "ക്ഷണക്കത്ത് അടയ്ക്കുക"
  }
};

const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("openButton");
const openLabel = document.getElementById("openLabel");
const closeButton = document.getElementById("closeButton");

function openInvitation() {
  envelope.classList.add("opened");
  setTimeout(() => {
    intro.style.display = "none";
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 650);
}

function closeInvitation() {
  invitation.classList.remove("visible");
  invitation.setAttribute("aria-hidden", "true");
  intro.style.display = "flex";
  envelope.classList.remove("opened");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

envelope.addEventListener("click", openInvitation);
openLabel.addEventListener("click", openInvitation);
closeButton.addEventListener("click", closeInvitation);

function setLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === "ml" ? "ml" : "en";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  try {
    localStorage.setItem("weddingLang", lang);
  } catch (_) {}
}

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

let savedLang = "en";
try {
  savedLang = localStorage.getItem("weddingLang") || "en";
} catch (_) {}
setLanguage(savedLang);

// Wedding: 26 October 2026, 10:30 AM IST
const weddingDate = new Date("2026-10-26T10:30:00+05:30");

function updateCountdown() {
  const diff = weddingDate.getTime() - Date.now();

  if (diff <= 0) {
    document.getElementById("cd-days").textContent = "00";
    document.getElementById("cd-hours").textContent = "00";
    document.getElementById("cd-mins").textContent = "00";
    document.getElementById("cd-secs").textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cd-mins").textContent = String(mins).padStart(2, "0");
  document.getElementById("cd-secs").textContent = String(secs).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
