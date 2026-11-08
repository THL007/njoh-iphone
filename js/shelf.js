/**
 * Renders the product shelf from data/catalog.json.
 */
(function () {
  var GROUP_LABELS = {
    en: { all: "All", iphone13: "13", iphone14: "14", iphone15: "15", iphone16: "16" },
    fr: { all: "Tout", iphone13: "13", iphone14: "14", iphone15: "15", iphone16: "16" }
  };

  function lang() {
    return (window.NjohI18n && window.NjohI18n.getLang && window.NjohI18n.getLang()) || "en";
  }

  function t(key) {
    if (window.NjohI18n && window.NjohI18n.t) return window.NjohI18n.t(key);
    return key;
  }

  function groupLabel(g) {
    var map = GROUP_LABELS[lang()] || GROUP_LABELS.en;
    return map[g] || g;
  }

  function starsHtml(n) {
    var filled = Math.max(0, Math.min(5, Number(n) || 5));
    var out = '<div class="product-stars" role="img" aria-label="5 / 5">';
    for (var i = 1; i <= 5; i++) {
      out += '<span class="star' + (i <= filled ? " is-on" : "") + '" aria-hidden="true">★</span>';
    }
    out += "</div>";
    return out;
  }

  function formatXaf(n) {
    if (n == null) return "";
    try {
      return new Intl.NumberFormat(lang() === "fr" ? "fr-FR" : "en-US").format(n) + " XAF";
    } catch (e) {
      return n + " XAF";
    }
  }

  function shortName(name, brand) {
    var s = name || "";
    if (brand && s.toLowerCase().indexOf(brand.toLowerCase()) === 0) {
      s = s.slice(brand.length).replace(/^[\s,:-]+/, "");
    }
    return s;
  }

  function card(p) {
    var title = shortName(p.name, p.brand);
    var waName = p.brand + " " + title;
    return (
      '<li data-group="' + p.group + '">' +
        '<article class="product">' +
          '<div class="product-media">' +
            '<img src="' + p.img + '" width="160" height="320" alt="" loading="lazy">' +
          "</div>" +
          '<div class="product-meta">' +
            starsHtml(p.stars || 5) +
            '<h3 class="product-name">' + title + "</h3>" +
            '<p class="product-by" data-i18n-by data-brand="' + p.brand + '">' +
              t("byPrefix") + " " + p.brand +
            "</p>" +
            (p.xaf != null
              ? '<p class="product-price"><span class="product-price-xaf">' + formatXaf(p.xaf) + "</span></p>"
              : "") +
          "</div>" +
          '<a class="btn btn--quiet product-action" href="https://wa.me/237600000000" data-wa-intent="product" data-product="' +
            waName.replace(/"/g, "") +
            '" data-i18n="askWa">' + t("askWa") + "</a>" +
        "</article>" +
      "</li>"
    );
  }

  function renderFilters(root, groups, active) {
    var html = '<div class="shelf-filters" role="toolbar" aria-label="Filter">';
    html += '<button type="button" class="filter-chip' + (active === "all" ? " is-active" : "") + '" data-filter="all">' + groupLabel("all") + "</button>";
    groups.forEach(function (g) {
      html +=
        '<button type="button" class="filter-chip' + (active === g ? " is-active" : "") + '" data-filter="' + g + '">' +
        groupLabel(g) +
        "</button>";
    });
    html += "</div>";
    root.innerHTML = html;
    root.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-filter"));
      });
    });
  }

  var state = { products: [], groups: [], filter: "all" };

  function applyFilter(filter) {
    state.filter = filter || "all";
    var filtersEl = document.getElementById("shelf-filters");
    if (filtersEl) renderFilters(filtersEl, state.groups, state.filter);
    var shelf = document.getElementById("shelf-list");
    if (!shelf) return;
    var list = state.products.filter(function (p) {
      return state.filter === "all" || p.group === state.filter;
    });
    var limit = parseInt(shelf.getAttribute("data-limit") || "", 10);
    var shown = list;
    if (limit && limit > 0) shown = list.slice(0, limit);
    shelf.innerHTML = shown.map(card).join("");
    document.querySelectorAll("#shelf-list [data-i18n-by]").forEach(function (el) {
      el.textContent = t("byPrefix") + " " + (el.getAttribute("data-brand") || "");
    });
    document.querySelectorAll("#shelf-list [data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    if (window.NjohWA && window.NjohWA.refresh) {
      window.NjohWA.refresh();
    }
    var note = document.getElementById("shelf-count");
    if (note) {
      var label = lang() === "fr" ? " modèles" : " models";
      note.textContent = limit && list.length > shown.length
        ? shown.length + " / " + list.length + label
        : list.length + label;
    }
  }

  function mount(data) {
    state.products = data.products || [];
    state.groups = data.groups || [];
    var filtersEl = document.getElementById("shelf-filters");
    if (filtersEl) renderFilters(filtersEl, state.groups, state.filter);
    applyFilter(state.filter);
  }

  function load() {
    return fetch("./data/catalog.json")
      .then(function (r) {
        if (!r.ok) throw new Error("catalog missing");
        return r.json();
      })
      .then(mount)
      .catch(function (err) {
        var shelf = document.getElementById("shelf-list");
        if (shelf) {
          shelf.innerHTML = '<li class="shelf-empty">' + (lang() === "fr" ? "Catalogue indisponible." : "Catalog unavailable.") + "</li>";
        }
        console.error(err);
      });
  }

  window.NjohShelf = {
    reload: load,
    applyFilter: applyFilter,
    remount: function () { applyFilter(state.filter); }
  };

  document.addEventListener("DOMContentLoaded", load);

  if (window.NjohI18n) {
    var original = window.NjohI18n.setLang;
    window.NjohI18n.setLang = function (next) {
      original(next);
      applyFilter(state.filter);
    };
  }
})();
