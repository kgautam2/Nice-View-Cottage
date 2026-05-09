const config = window.SITE_CONFIG || {};
const basePath = window.location.hostname.endsWith("github.io") ? (config.basePath || "/") : "/";
const bookingMenus = document.querySelectorAll("[data-booking]");
const bookingToggles = document.querySelectorAll("[data-booking-toggle]");
const bookingTriggers = document.querySelectorAll("[data-booking-trigger]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

function applySiteConstants() {
  const hotel = config.hotel || {};
  const images = config.images || {};
  const map = config.map || {};

  if (hotel.name) {
    document.title = document.title.replace("Nice View Cottage", hotel.name);
  }

  document.querySelectorAll("[data-brand-name]").forEach((element) => {
    element.textContent = hotel.shortName || hotel.name || element.textContent;
  });

  document.querySelectorAll("[data-brand-initial]").forEach((element) => {
    element.textContent = hotel.initial || element.textContent;
  });

  document.querySelectorAll("[data-footer-brand]").forEach((element) => {
    element.textContent = hotel.name || element.textContent;
  });

  document.querySelectorAll("[data-footer-text]").forEach((element) => {
    element.textContent = hotel.footerText || element.textContent;
  });

  document.querySelectorAll("[data-hero-title]").forEach((element) => {
    element.textContent = hotel.heroTitle || hotel.name || element.textContent;
  });

  document.querySelectorAll("[data-hero-copy]").forEach((element) => {
    element.textContent = hotel.heroCopy || element.textContent;
  });

  document.querySelectorAll("[data-phone-link]").forEach((element) => {
    element.href = hotel.phoneHref || element.href;
    if (element.dataset.phoneLink === "display") {
      element.textContent = hotel.phoneDisplay || element.textContent;
    }
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((element) => {
    element.href = hotel.whatsappHref || element.href;
  });

  document.querySelectorAll("[data-address]").forEach((element) => {
    element.textContent = hotel.address || element.textContent;
  });

  document.querySelectorAll("[data-image]").forEach((image) => {
    const imageUrl = images[image.dataset.image];
    if (imageUrl) image.src = resolveAssetPath(imageUrl);
  });

  document.documentElement.style.setProperty("--hero-image", `url("${resolveAssetPath(images.hero || "")}")`);
  document.documentElement.style.setProperty("--experience-image", `url("${resolveAssetPath(images.experienceBand || "")}")`);
  document.documentElement.style.setProperty("--final-cta-image", `url("${resolveAssetPath(images.finalCta || "")}")`);

  document.querySelectorAll("[data-map-frame]").forEach((frame) => {
    frame.src = map.embedUrl || frame.src;
    frame.title = map.label || frame.title;
  });

  document.querySelectorAll("[data-map-open]").forEach((link) => {
    link.href = map.openUrl || link.href;
  });
}

function resolveAssetPath(path) {
  if (!path || /^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (path.startsWith("/")) return path;
  return `${basePath.replace(/\/$/, "")}/${path}`;
}

function renderBookingLinks() {
  const links = config.bookingLinks || [];
  if (!links.length) return;

  document.querySelectorAll("[data-booking-panel]").forEach((panel) => {
    panel.innerHTML = links.map((link) => {
      const target = link.external ? ' target="_blank" rel="noreferrer"' : "";
      return `<a href="${link.href}"${target}>${renderBookingIcon(link.icon)}<strong>${link.label}</strong> <span>${link.note || ""}</span></a>`;
    }).join("");
  });

  const contactBooking = document.querySelector("[data-contact-booking]");
  if (contactBooking) {
    const hotel = config.hotel || {};
    contactBooking.innerHTML = `
      <h2>Booking paths</h2>
      ${links.map((link) => {
        const target = link.external ? ' target="_blank" rel="noreferrer"' : "";
        return `<a href="${link.href}"${target}>${renderBookingIcon(link.icon)}${link.label} ${link.note ? link.note.toLowerCase() : ""}</a>`;
      }).join("")}
      <a href="${hotel.phoneHref || "#"}">${hotel.phoneDisplay || "Call us"}</a>
      <a href="${hotel.emailHref || "#"}">${hotel.email || "Email us"}</a>
      <span data-address>${hotel.address || "Pokhara, Nepal"}</span>
    `;
  }
}

function renderBookingIcon(icon) {
  const icons = {
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 4.2a7.71 7.71 0 0 0-6.56 11.78l-.77 3.13 3.2-.74a7.72 7.72 0 1 0 4.13-14.17Zm0 1.9a5.82 5.82 0 0 1 4.9 8.94 5.84 5.84 0 0 1-7.22 2.1l-.34-.16-1.77.41.42-1.71-.2-.35a5.82 5.82 0 0 1 4.21-9.23Zm-2.48 3.02c-.12 0-.31.04-.48.23-.16.18-.62.6-.62 1.47s.64 1.71.73 1.83c.09.12 1.25 1.98 3.08 2.7 1.52.6 1.83.48 2.16.45.33-.03 1.06-.43 1.21-.84.15-.42.15-.78.1-.85-.04-.08-.16-.12-.34-.21-.18-.09-1.06-.52-1.23-.58-.16-.06-.29-.09-.41.09-.12.18-.47.58-.58.7-.1.12-.21.13-.39.04-.18-.09-.76-.28-1.45-.9-.54-.48-.9-1.07-1-1.25-.11-.18-.02-.28.08-.37.08-.08.18-.21.27-.31.09-.11.12-.18.18-.3.06-.12.03-.22-.02-.31-.04-.09-.41-.99-.56-1.36-.15-.35-.3-.36-.41-.36h-.34Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 4.4c.45-.45 1.18-.45 1.63 0l2.02 2.02c.4.4.46 1.03.15 1.5l-.94 1.42a.85.85 0 0 0 .1 1.07l3.43 3.43c.29.29.75.33 1.08.1l1.41-.94c.47-.31 1.1-.25 1.5.15l2.02 2.02c.45.45.45 1.18 0 1.63l-.9.9c-.9.9-2.23 1.22-3.44.82a18.12 18.12 0 0 1-9.78-9.78c-.4-1.21-.08-2.54.82-3.44l.9-.9Z"/></svg>',
    form: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.75h8.1L19.25 8.4v11.85H6.5V3.75Zm8.75 1.9v3.4h3.4l-3.4-3.4ZM8.4 5.65v12.7h8.95v-7.4h-4v-5.3H8.4Zm1.8 6.1h5.4v1.7h-5.4v-1.7Zm0 3.15h4.35v1.7H10.2v-1.7Z"/></svg>'
  };

  return `<span class="booking-icon booking-icon-${icon || "default"}">${icons[icon] || icons.form}</span>`;
}

applySiteConstants();
renderBookingLinks();

function setBookingState(open) {
  bookingMenus.forEach((menu) => menu.classList.toggle("is-open", open));
  bookingToggles.forEach((toggle) => toggle.setAttribute("aria-expanded", String(open)));
}

bookingToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = !toggle.closest("[data-booking]").classList.contains("is-open");
    setBookingState(open);
  });
});

bookingTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    setBookingState(true);
    const firstToggle = document.querySelector("[data-booking-toggle]");
    if (firstToggle && window.matchMedia("(min-width: 681px)").matches) {
      firstToggle.focus();
    } else {
      window.location.href = "contact.html#inquiry";
    }
  });
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

document.addEventListener("click", (event) => {
  if (![...bookingMenus].some((menu) => menu.contains(event.target))) {
    setBookingState(false);
  }

  if (nav && menuToggle && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setBookingState(false);
    if (nav && menuToggle) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});
