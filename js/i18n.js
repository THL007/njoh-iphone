/**
 * EN / FR UI strings. WhatsApp draft text follows the active locale.
 */
(function () {
  var STRINGS = {
    en: {
      htmlLang: "en",
      title: "Njoh iPhone: phones on WhatsApp",
      description: "iPhones for Cameroon. Message Njoh iPhone to ask or order.",
      skip: "Skip to shelf",
      navShelf: "shelf",
      navOrder: "how to order",
      navDelivery: "delivery",
      navWa: "WhatsApp",
      heroTitle: "iphones, ordered on whatsapp",
      heroLead: "Ask about models and condition. Orders run on WhatsApp — Cameroon.",
      heroCta: "Order on WhatsApp",
      heroSecondary: "See the shelf",
      rangeTitle: "on the shelf",
      rangeNote: "example asks · tap to message us",
      railLabel: "Njoh iPhone shelf",
      openShelf: "Open full shelf",
      byPrefix: "By",
      askWa: "Ask on WhatsApp",
      orderTitle: "how to order",
      step1Title: "pick a phone",
      step1Body: "Choose from the shelf, or tell us the model you want in the chat.",
      step2Title: "message whatsapp",
      step2Body: "One tap opens a prefilled chat. Confirm model, storage, and where you are.",
      step3Title: "pay and collect",
      step3Body: "Payment and handoff are agreed in the chat, not on this page.",
      deliveryTitle: "delivery",
      deliveryLead: "Ask in WhatsApp for your city, fee, and timing.",
      deliveryMissing: "Area, fee, and timing go here once you set them. Until then, ask in WhatsApp.",
      deliveryAreaTitle: "where",
      deliveryAreaBody: "We confirm your city or neighborhood in the chat before dispatch.",
      deliveryFeeTitle: "fee",
      deliveryFeeBody: "Delivery fee depends on distance. We quote it in WhatsApp before you pay.",
      deliveryTimeTitle: "timing",
      deliveryTimeBody: "Handoff window is set together in the chat once the order is confirmed.",
      deliveryCta: "Ask about delivery",
      footerBlurb: "Njoh iPhone — phones for Cameroon. Orders run on WhatsApp.",
      footerOrder: "order",
      footerWa: "WhatsApp sales",
      footerShelf: "shelf",
      footerHelp: "info",
      footerHelpWa: "WhatsApp number in js/wa.js",
      stickyReady: "ready to order",
      stickyHint: "opens WhatsApp with a draft message",
      stickyCta: "Order on WhatsApp",
      stickyLabel: "Order on WhatsApp",
      credits: "Shelf prices are EXAMPLE street/FB ask bands (sample). Not a live stock feed. Swap catalog.json when you have real units.",
      waDefault: "Hi Njoh iPhone, I want to ask about a phone",
      waProduct: "Hi Njoh iPhone, I want {product}",
      waDelivery: "Hi Njoh iPhone, where do you deliver?",
      langLabel: "Language",
      langEn: "EN",
      langFr: "FR"
    },
    fr: {
      htmlLang: "fr",
      title: "Njoh iPhone: téléphones sur WhatsApp",
      description: "iPhones pour le Cameroun. Écrivez à Njoh iPhone pour demander ou commander.",
      skip: "Aller au rayon",
      navShelf: "rayon",
      navOrder: "commander",
      navDelivery: "livraison",
      navWa: "WhatsApp",
      heroTitle: "iphones, commandés sur whatsapp",
      heroLead: "Demandez le modèle et l'état. Commandes via WhatsApp — Cameroun.",
      heroCta: "Commander sur WhatsApp",
      heroSecondary: "Voir le rayon",
      rangeTitle: "au rayon",
      rangeNote: "prix d'exemple · touchez pour nous écrire",
      railLabel: "Rayon Njoh iPhone",
      openShelf: "Voir tout le rayon",
      byPrefix: "Par",
      askWa: "Demander sur WhatsApp",
      orderTitle: "comment commander",
      step1Title: "choisir un téléphone",
      step1Body: "Choisissez dans le rayon, ou dites-nous le modèle voulu dans le chat.",
      step2Title: "écrire sur whatsapp",
      step2Body: "Un tap ouvre un message prérempli. Confirmez modèle, stockage et votre lieu.",
      step3Title: "payer et récupérer",
      step3Body: "Le paiement et la remise se décident dans le chat, pas sur cette page.",
      deliveryTitle: "livraison",
      deliveryLead: "Demandez sur WhatsApp votre ville, les frais et le délai.",
      deliveryMissing: "Zone, frais et délais à remplir. En attendant, demandez sur WhatsApp.",
      deliveryAreaTitle: "où",
      deliveryAreaBody: "Nous confirmons votre ville ou quartier dans le chat avant l'envoi.",
      deliveryFeeTitle: "frais",
      deliveryFeeBody: "Les frais dépendent de la distance. Le devis arrive sur WhatsApp avant paiement.",
      deliveryTimeTitle: "délai",
      deliveryTimeBody: "Le créneau de remise se fixe ensemble dans le chat après confirmation.",
      deliveryCta: "Demander la livraison",
      footerBlurb: "Njoh iPhone — téléphones pour le Cameroun. Commandes via WhatsApp.",
      footerOrder: "commander",
      footerWa: "Ventes WhatsApp",
      footerShelf: "rayon",
      footerHelp: "infos",
      footerHelpWa: "Numéro WhatsApp dans js/wa.js",
      stickyReady: "prêt à commander",
      stickyHint: "ouvre WhatsApp avec un brouillon",
      stickyCta: "Commander sur WhatsApp",
      stickyLabel: "Commander sur WhatsApp",
      credits: "Les prix du rayon sont des EXEMPLES (bandes street/FB). Pas un stock live. Remplacez catalog.json avec vos unités réelles.",
      waDefault: "Bonjour Njoh iPhone, je veux me renseigner sur un téléphone",
      waProduct: "Bonjour Njoh iPhone, je veux {product}",
      waDelivery: "Bonjour Njoh iPhone, où livrez-vous ?",
      langLabel: "Langue",
      langEn: "EN",
      langFr: "FR"
    }
  };

  function detect() {
    var params = new URLSearchParams(window.location.search);
    var q = (params.get("lang") || "").toLowerCase();
    if (q === "fr" || q === "en") return q;
    try {
      var saved = localStorage.getItem("njoh-lang");
      if (saved === "fr" || saved === "en") return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("fr") === 0 ? "fr" : "en";
  }

  var lang = detect();

  function t(key) {
    return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
  }

  function apply() {
    document.documentElement.lang = t("htmlLang");
    document.title = t("title");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("description"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key));
    });

    document.querySelectorAll("[data-i18n-by]").forEach(function (el) {
      var brand = el.getAttribute("data-brand") || "";
      el.textContent = t("byPrefix") + " " + brand;
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("is-active", active);
    });

    if (window.NjohWA && typeof window.NjohWA.refresh === "function") {
      window.NjohWA.refresh(STRINGS[lang]);
    }
  }

  function setLang(next) {
    if (next !== "en" && next !== "fr") return;
    lang = next;
    try {
      localStorage.setItem("njoh-lang", lang);
    } catch (e) {}
    var url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    apply();
  }

  window.NjohI18n = {
    t: t,
    getLang: function () { return lang; },
    setLang: setLang,
    strings: function () { return STRINGS[lang]; },
    apply: apply
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
    apply();
  });
})();
