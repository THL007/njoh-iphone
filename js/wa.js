/**
 * WhatsApp sales links.
 * Replace WA_NUMBER with your number in international form, digits only (no +).
 * Example Cameroon: 2376XXXXXXXX
 */
(function () {
  var WA_NUMBER = "237600000000"; // placeholder: swap before go-live

  function strings() {
    if (window.NjohI18n && window.NjohI18n.strings) {
      return window.NjohI18n.strings();
    }
    return {
      waDefault: "Hi Njoh iPhone, I want to ask about a phone",
      waProduct: "Hi Njoh iPhone, I want {product}",
      waDelivery: "Hi Njoh iPhone, where do you deliver?"
    };
  }

  function href(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function refresh(s) {
    s = s || strings();
    document.querySelectorAll("[data-wa-intent]").forEach(function (el) {
      var product = el.getAttribute("data-product");
      var intent = el.getAttribute("data-wa-intent");
      var text = s.waDefault;
      if (product) text = s.waProduct.replace("{product}", product);
      else if (intent === "delivery") text = s.waDelivery;
      el.setAttribute("href", href(text));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  window.NjohWA = { refresh: refresh, number: WA_NUMBER };

  document.addEventListener("DOMContentLoaded", function () {
    refresh();
  });
})();
