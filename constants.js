window.SITE_CONFIG = {
  basePath: "/Nice-View-Cottage/",

  brand: {
    logoSrc: "assets/simpani-hideaway-logo.jpeg?v=1",
    logoType: "image/jpeg"
  },

  hotel: {
    name: "Simpani Hideaway",
    shortName: "Simpani Hideaway",
    initial: "S",
    location: "Pokhara, Nepal",
    footerText: "A quiet hideaway retreat in Pokhara, Nepal.",
    phoneDisplay: "+1 206 327 4207",
    phoneHref: "tel:+12063274207",
    whatsappHref: "https://wa.me/12063274207",
    email: "kgautam3850@gmail.com",
    emailHref: "mailto:kgautam3850@gmail.com",
    address: "Simpani Hideaway, Pokhara, Nepal",
    heroTitle: "Simpani Hideaway",
    heroCopy: "A quiet hideaway retreat in Pokhara with mountain air, warm hospitality, and easy access to Fewa Lake, viewpoints, and local adventures."
  },

  bookingLinks: [
    {
      label: "WhatsApp",
      href: "https://wa.me/12063274207",
      note: "Fast reply",
      icon: "whatsapp",
      external: true
    },
    {
      label: "Call Hotel",
      href: "tel:+12063274207",
      note: "Direct",
      icon: "phone"
    },
    {
      label: "Inquiry Form",
      href: "contact.html#inquiry",
      note: "Best for details",
      icon: "form"
    }
  ],

  map: {
    label: "Nice View Cottage location map",
    embedUrl: "https://www.google.com/maps?q=Nice%20View%20Cottage%2C%20Pokhara%2C%20Nepal&output=embed",
    openUrl: "https://www.google.com/maps/search/?api=1&query=Nice%20View%20Cottage%2C%20Pokhara%2C%20Nepal"
  },

  images: {
    hero: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=85",
    experienceBand: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=78",
    finalCta: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=78",
    deluxeRoom: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=75",
    lakeViewRoom: "https://images.unsplash.com/photo-1667828291018-89512ce6b71a?auto=format&fit=crop&w=900&q=75",
    familySuite: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=75",
    premiumSuite: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=75",
    paragliding: "https://images.unsplash.com/photo-1675092404212-382453b2ad2b?auto=format&fit=crop&w=900&q=75",
    trekking: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=75",
    bungee: "https://images.unsplash.com/photo-1759156499320-2fe6cc36d45c?auto=format&fit=crop&w=900&q=75",
    lakeBoating: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fewa%20Lake%20In%20Pokhara%20Nepal.jpg",
    airportPickup: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=75",
    packages: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=75",
    mountainLight: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=75",
    guestRooms: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=75",
    localViews: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fewa%20Lake%20In%20Pokhara%20Nepal.jpg",
    about: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sarangkot%20Pokhara-%20Sunrise%20View.jpg"
  }
};

window.resolveSiteAssetPath = function resolveSiteAssetPath(path) {
  const basePath = window.location.hostname.endsWith("github.io") ? (window.SITE_CONFIG.basePath || "/") : "/";
  if (!path || /^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (path.startsWith("/")) return path;
  return `${basePath.replace(/\/$/, "")}/${path}`;
};

(function applyConfiguredSiteIcon() {
  const brand = window.SITE_CONFIG.brand || {};
  const logoSrc = window.resolveSiteAssetPath(brand.logoSrc || "");
  if (!logoSrc) return;

  document.documentElement.style.setProperty("--brand-logo", `url("${logoSrc}")`);
  document.documentElement.classList.add("brand-logo-ready");

  let icon = document.querySelector("[data-site-icon]") || document.querySelector('link[rel="icon"]');
  if (!icon) {
    icon = document.createElement("link");
    icon.rel = "icon";
    icon.dataset.siteIcon = "";
    document.head.append(icon);
  }

  icon.href = logoSrc;
  icon.type = brand.logoType || icon.type || "image/jpeg";
})();
