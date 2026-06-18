(() => {
  "use strict";

  const STORAGE_KEY = "pfA11ySettingsV3";
  const HIDE_UNTIL_KEY = "pfA11yHideUntilV3";
  const HIDE_SESSION_KEY = "pfA11yHideSessionV3";

  const DEFAULT_STATE = {
    position: "left",
    activeProfile: "",
    xlWidget: false,

    textLevel: 0,
    readMode: "off",
    contrastMode: "normal",
    textSpacingLevel: 0,
    fontMode: "normal",
    cursorMode: "normal",
    lineHeightLevel: 0,
    alignMode: "normal",
    saturation: "normal",

    features: {
      smartContrast: false,
      highlightLinks: false,
      stopAnimations: false,
      hideImages: false,
      tooltips: false
    }
  };

  const BOOLEAN_CLASS_MAP = {
    smartContrast: "pf-a11y-smart-contrast",
    highlightLinks: "pf-a11y-highlight-links",
    stopAnimations: "pf-a11y-stop-animations",
    hideImages: "pf-a11y-hide-images",
    tooltips: "pf-a11y-tooltips"
  };

  const PROFILE_MAP = {
    motor: {
      features: { stopAnimations: true, tooltips: true }
    },
    blind: {
      readMode: "normal",
      speak: true
    },
    colorBlind: {
      features: { smartContrast: true, highlightLinks: true },
      saturation: "high"
    },
    dyslexia: {
      fontMode: "dyslexia",
      features: { stopAnimations: true }
    },
    visual: {
      textLevel: 1,
      fontMode: "readable",
      cursorMode: "big",
      saturation: "high",
      features: { stopAnimations: true, tooltips: true }
    },
    cognitive: {
      textLevel: 1,
      cursorMode: "guide",
      features: {
        smartContrast: true,
        stopAnimations: true,
        tooltips: true
      }
    },
    seizure: {
      saturation: "low",
      features: { stopAnimations: true }
    },
    adhd: {
      cursorMode: "mask",
      saturation: "low",
      features: { stopAnimations: true }
    }
  };

  const UI = {
    gr: {
      openLabel: "Άνοιγμα μενού προσβασιμότητας",
      closeLabel: "Κλείσιμο μενού",
      menuTitle: "Μενού Προσβασιμότητας",
      shortcut: "CTRL+U",
      languageCode: "EL",
      languageName: "Ελληνικά (Greek)",

      profilesTitle: "Προφίλ προσβασιμότητας",
      xlWidget: "Υπερμεγέθη widget",
      reset: "↻ Επαναφορά όλων των ρυθμίσεων προσβασιμότητας",
      manage: "Μετακίνηση/Απόκρυψη γραφικού στοιχείου",
      hideFor: "Απόκρυψη για",

      left: "Αριστερά",
      right: "Δεξιά",
      hideSession: "Τρέχουσα συνεδρία",
      hideDay: "Μια μέρα",
      hideWeek: "Μια εβδομάδα",
      hideMonth: "Ένας μήνας",
      hideForever: "Επ' αόριστον",

      active: "Ενεργό",
      enabled: "Ανοιχτό",
      level: "Επίπεδο",

      structureTitle: "Δομή σελίδας",
      noHeadings: "Δεν βρέθηκαν επικεφαλίδες στη σελίδα.",
      readUnsupported: "Η ανάγνωση δεν υποστηρίζεται από τον συγκεκριμένο browser.",
      noText: "Δεν βρέθηκε κείμενο για ανάγνωση.",

      profiles: {
        motor: "Κινητικά Προβλήματα",
        blind: "Τυφλός",
        colorBlind: "Αχρωματοψία",
        dyslexia: "Δυσλεξία",
        visual: "Χαμηλή όραση",
        cognitive: "Γνωστική & Μαθησιακή",
        seizure: "Επιληπτικές κρίσεις",
        adhd: "ΔΕΠΥ"
      },

      controls: {
        read: "Ανάγνωση",
        contrast: "Αντίθεση +",
        smartContrast: "Έξυπνη Αντίθεση",
        highlightLinks: "Σύνδεσμοι",
        textLevel: "Μεγάλο Κείμενο",
        textSpacing: "Αύξηση απόστασης κειμένου",
        stopAnimations: "Διακοπή κινουμένων σχεδίων",
        hideImages: "Απόκρυψη εικόνων",
        dyslexiaFont: "Φιλικό προς δυσλεξία",
        bigCursor: "Δρομέας",
        tooltips: "Εργαλεία",
        structure: "Δομή σελίδας",
        lineHeight: "Ύψος γραμμής",
        alignText: "Στοίχιση κειμένου",
        saturation: "Κορεσμός"
      },

      readModes: {
        normal: "Διαβάστε Κανονικά",
        slow: "Διαβάστε Αργά",
        fast: "Διαβάστε Γρήγορα"
      },

      contrastModes: {
        invert: "Αντιστροφή χρωμάτων",
        dark: "Σκούρα Αντίθεση",
        light: "Ανοιχτή Αντίθεση"
      },

      spacingModes: {
        1: "Μικρό διάστημα",
        2: "Μέτριο διάστημα",
        3: "Μεγάλο διάστημα"
      },

      fontModes: {
        dyslexia: "Φιλικό προς δυσλεξία",
        readable: "Ευανάγνωστη γραφή"
      },

      cursorModes: {
        big: "Μεγάλος δρομέας",
        mask: "Μάσκα ανάγνωσης",
        guide: "Οδηγός ανάγνωσης"
      },

      lineHeightModes: {
        1: "1.5x",
        2: "1.75x",
        3: "2x"
      },

      alignModes: {
        left: "Στοίχιση αριστερά",
        right: "Ευθυγράμμιση δεξιά",
        center: "Στοίχιση στο κέντρο",
        justify: "Ευθυγράμμιση πλήρους πλάτους"
      },

      saturationModes: {
        low: "Χαμηλός Κορεσμός",
        high: "Υψηλός Κορεσμός",
        desaturated: "Αποκορεσμένα"
      }
    },

    en: {
      openLabel: "Open accessibility menu",
      closeLabel: "Close accessibility menu",
      menuTitle: "Accessibility Menu",
      shortcut: "CTRL+U",
      languageCode: "EN",
      languageName: "English",

      profilesTitle: "Accessibility profiles",
      xlWidget: "Oversized widget",
      reset: "↻ Reset all accessibility settings",
      manage: "Move/Hide accessibility widget",
      hideFor: "Hide for",

      left: "Left",
      right: "Right",
      hideSession: "Current session",
      hideDay: "One day",
      hideWeek: "One week",
      hideMonth: "One month",
      hideForever: "Indefinitely",

      active: "Active",
      enabled: "On",
      level: "Level",

      structureTitle: "Page structure",
      noHeadings: "No headings found on this page.",
      readUnsupported: "Reading is not supported by this browser.",
      noText: "No readable text was found.",

      profiles: {
        motor: "Motor Impaired",
        blind: "Blind",
        colorBlind: "Color Blind",
        dyslexia: "Dyslexia",
        visual: "Visually Impaired",
        cognitive: "Cognitive & Learning",
        seizure: "Seizure & Epileptic",
        adhd: "ADHD"
      },

      controls: {
        read: "Read Page",
        contrast: "Contrast +",
        smartContrast: "Smart Contrast",
        highlightLinks: "Links",
        textLevel: "Bigger Text",
        textSpacing: "Text Spacing",
        stopAnimations: "Stop Animations",
        hideImages: "Hide Images",
        dyslexiaFont: "Dyslexia Friendly",
        bigCursor: "Cursor",
        tooltips: "Tooltips",
        structure: "Page Structure",
        lineHeight: "Line Height",
        alignText: "Text Alignment",
        saturation: "Saturation"
      },

      readModes: {
        normal: "Read Normally",
        slow: "Read Slowly",
        fast: "Read Fast"
      },

      contrastModes: {
        invert: "Invert Colors",
        dark: "Dark Contrast",
        light: "Light Contrast"
      },

      spacingModes: {
        1: "Small spacing",
        2: "Medium spacing",
        3: "Large spacing"
      },

      fontModes: {
        dyslexia: "Dyslexia Friendly",
        readable: "Legible Font"
      },

      cursorModes: {
        big: "Big Cursor",
        mask: "Reading Mask",
        guide: "Reading Guide"
      },

      lineHeightModes: {
        1: "1.5x",
        2: "1.75x",
        3: "2x"
      },

      alignModes: {
        left: "Align Left",
        right: "Align Right",
        center: "Align Center",
        justify: "Justify"
      },

      saturationModes: {
        low: "Low Saturation",
        high: "High Saturation",
        desaturated: "Desaturated"
      }
    }
  };

  const ICONS = {
    motor: "♿",
    blind: "◐",
    colorBlind: "◒",
    dyslexia: "Df",
    visual: "👁",
    cognitive: "🧩",
    seizure: "◎",
    adhd: "☯",

    read: "≋",
    contrast: "◐",
    smartContrast: "◑",
    highlightLinks: "🔗",
    textLevel: "Tᵀ",
    textSpacing: "↔",
    stopAnimations: "Ⅱ",
    hideImages: "▧",
    dyslexiaFont: "Df",
    bigCursor: "⌖",
    tooltips: "ⓘ",
    structure: "▤",
    lineHeight: "↕",
    alignText: "☰",
    saturation: "◈"
  };

  let state = loadState();

  let toggleButton = null;
  let panel = null;
  let tooltip = null;
  let guide = null;
  let mask = null;

  let pointerListenersBound = false;
  let pointerY = Math.round(window.innerHeight / 2);
  let readingToken = 0;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getLang() {
    const savedLang = localStorage.getItem("preferred-language");
    return savedLang === "en" ? "en" : "gr";
  }

  function text() {
    return UI[getLang()] || UI.gr;
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return clone(DEFAULT_STATE);

      return {
        ...clone(DEFAULT_STATE),
        ...saved,
        features: {
          ...DEFAULT_STATE.features,
          ...(saved.features || {})
        }
      };
    } catch {
      return clone(DEFAULT_STATE);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function widgetIsHidden() {
    if (sessionStorage.getItem(HIDE_SESSION_KEY) === "1") return true;

    const hiddenUntil = localStorage.getItem(HIDE_UNTIL_KEY);
    if (!hiddenUntil) return false;
    if (hiddenUntil === "forever") return true;

    const untilTime = Number(hiddenUntil);
    if (Number.isFinite(untilTime) && untilTime > Date.now()) return true;

    localStorage.removeItem(HIDE_UNTIL_KEY);
    return false;
  }

  function createWidget() {
    const t = text();

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <button class="pf-a11y-widget pf-a11y-float" type="button" aria-label="${t.openLabel}" aria-expanded="false">
        <span aria-hidden="true">♿</span>
      </button>

      <aside class="pf-a11y-widget pf-a11y-panel" role="dialog" aria-modal="false" aria-label="${t.menuTitle}">
        <div class="pf-a11y-header">
          <strong data-a11y-ui="menuTitle">${t.menuTitle} <span>(${t.shortcut})</span></strong>
          <button class="pf-a11y-close" type="button" aria-label="${t.closeLabel}">×</button>
        </div>

        <div class="pf-a11y-body">
          <div class="pf-a11y-language" aria-label="Language">
            <span data-a11y-ui="languageCode">${t.languageCode}</span>
            <strong data-a11y-ui="languageName">${t.languageName}</strong>
            <em>✓</em>
          </div>

          <details class="pf-a11y-section" open>
            <summary data-a11y-ui="profilesTitle">${t.profilesTitle}</summary>
            <div class="pf-a11y-profile-grid">
              ${profileButtonHtml("motor")}
              ${profileButtonHtml("blind")}
              ${profileButtonHtml("colorBlind")}
              ${profileButtonHtml("dyslexia")}
              ${profileButtonHtml("visual")}
              ${profileButtonHtml("cognitive")}
              ${profileButtonHtml("seizure")}
              ${profileButtonHtml("adhd")}
            </div>
          </details>

          <button class="pf-a11y-toolbar-title" type="button" data-control="xlWidget" aria-pressed="false">
            <span>XL</span>
            <strong data-a11y-ui="xlWidget">${t.xlWidget}</strong>
            <small></small>
          </button>

          <div class="pf-a11y-tools-grid">
            ${controlButtonHtml("read")}
            ${controlButtonHtml("contrast")}
            ${controlButtonHtml("smartContrast")}
            ${controlButtonHtml("highlightLinks")}
            ${controlButtonHtml("textLevel")}
            ${controlButtonHtml("textSpacing")}
            ${controlButtonHtml("stopAnimations")}
            ${controlButtonHtml("hideImages")}
            ${controlButtonHtml("dyslexiaFont")}
            ${controlButtonHtml("bigCursor")}
            ${controlButtonHtml("tooltips")}
            ${controlButtonHtml("structure")}
            ${controlButtonHtml("lineHeight")}
            ${controlButtonHtml("alignText")}
            ${controlButtonHtml("saturation")}
          </div>

          <button class="pf-a11y-reset" type="button" data-action="reset" data-a11y-ui="reset">${t.reset}</button>

          <details class="pf-a11y-section pf-a11y-manage">
            <summary data-a11y-ui="manage">${t.manage}</summary>
            <div class="pf-a11y-row">
              <button type="button" data-position="left" data-a11y-ui="left">${t.left}</button>
              <button type="button" data-position="right" data-a11y-ui="right">${t.right}</button>
            </div>
            <p data-a11y-ui="hideFor">${t.hideFor}</p>
            <div class="pf-a11y-row pf-a11y-hide-row">
              <button type="button" data-hide="session" data-a11y-ui="hideSession">${t.hideSession}</button>
              <button type="button" data-hide="day" data-a11y-ui="hideDay">${t.hideDay}</button>
              <button type="button" data-hide="week" data-a11y-ui="hideWeek">${t.hideWeek}</button>
              <button type="button" data-hide="month" data-a11y-ui="hideMonth">${t.hideMonth}</button>
              <button type="button" data-hide="forever" data-a11y-ui="hideForever">${t.hideForever}</button>
            </div>
          </details>
        </div>
      </aside>

      <div class="pf-a11y-widget pf-a11y-reading-guide" aria-hidden="true"></div>
      <div class="pf-a11y-widget pf-a11y-reading-mask" aria-hidden="true"></div>
      <div class="pf-a11y-widget pf-a11y-tooltip" role="tooltip"></div>
      `
    );

    toggleButton = document.querySelector(".pf-a11y-float");
    panel = document.querySelector(".pf-a11y-panel");
    tooltip = document.querySelector(".pf-a11y-tooltip");
    guide = document.querySelector(".pf-a11y-reading-guide");
    mask = document.querySelector(".pf-a11y-reading-mask");

    bindEvents();
    wrapLanguageSwitcher();
  }

  function profileButtonHtml(profile) {
    const t = text();
    return `<button type="button" data-profile="${profile}"><span>${ICONS[profile]}</span>${t.profiles[profile]}</button>`;
  }

  function controlButtonHtml(control) {
    const t = text();
    return `
      <button type="button" data-control="${control}">
        <span>${ICONS[control]}</span>
        <strong>${t.controls[control]}</strong>
        <small></small>
      </button>
    `;
  }

  function bindEvents() {
    toggleButton.addEventListener("click", togglePanel);

    panel.querySelector(".pf-a11y-close").addEventListener("click", closePanel);

    panel.addEventListener("click", (event) => {
      const profileButton = event.target.closest("[data-profile]");
      const controlButton = event.target.closest("[data-control]");
      const resetButton = event.target.closest("[data-action='reset']");
      const positionButton = event.target.closest("[data-position]");
      const hideButton = event.target.closest("[data-hide]");

      if (profileButton) applyProfile(profileButton.dataset.profile);
      if (controlButton) activateControl(controlButton.dataset.control);
      if (resetButton) resetAccessibility();
      if (positionButton) setPosition(positionButton.dataset.position);
      if (hideButton) hideWidget(hideButton.dataset.hide);
    });

    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();

      if (event.ctrlKey && key === "u") {
        event.preventDefault();
        togglePanel();
      }

      if (key === "escape") {
        closePanel();
        closeStructureModal();
      }
    });

    document.addEventListener("mouseover", showTooltip);
    document.addEventListener("focusin", showTooltip);
    document.addEventListener("mouseout", hideTooltip);
    document.addEventListener("focusout", hideTooltip);
  }

  function wrapLanguageSwitcher() {
    if (typeof window.setLanguage !== "function") return;
    if (window.setLanguage.pfA11yWrapped) return;

    const originalSetLanguage = window.setLanguage;

    window.setLanguage = async function wrappedSetLanguage(lang) {
      const result = await originalSetLanguage(lang);

      window.setTimeout(() => {
        refreshWidgetLanguage();
        updateButtons();
      }, 80);

      return result;
    };

    window.setLanguage.pfA11yWrapped = true;
  }

  function refreshWidgetLanguage() {
    if (!toggleButton || !panel) return;

    const t = text();

    toggleButton.setAttribute("aria-label", t.openLabel);
    panel.setAttribute("aria-label", t.menuTitle);

    const closeButton = panel.querySelector(".pf-a11y-close");
    if (closeButton) closeButton.setAttribute("aria-label", t.closeLabel);

    setHtml("[data-a11y-ui='menuTitle']", `${t.menuTitle} <span>(${t.shortcut})</span>`);
    setText("[data-a11y-ui='languageCode']", t.languageCode);
    setText("[data-a11y-ui='languageName']", t.languageName);
    setText("[data-a11y-ui='profilesTitle']", t.profilesTitle);
    setText("[data-a11y-ui='xlWidget']", t.xlWidget);
    setText("[data-a11y-ui='reset']", t.reset);
    setText("[data-a11y-ui='manage']", t.manage);
    setText("[data-a11y-ui='left']", t.left);
    setText("[data-a11y-ui='right']", t.right);
    setText("[data-a11y-ui='hideFor']", t.hideFor);
    setText("[data-a11y-ui='hideSession']", t.hideSession);
    setText("[data-a11y-ui='hideDay']", t.hideDay);
    setText("[data-a11y-ui='hideWeek']", t.hideWeek);
    setText("[data-a11y-ui='hideMonth']", t.hideMonth);
    setText("[data-a11y-ui='hideForever']", t.hideForever);

    panel.querySelectorAll("[data-profile]").forEach((button) => {
      const profile = button.dataset.profile;
      button.innerHTML = `<span>${ICONS[profile]}</span>${t.profiles[profile]}`;
    });

    panel.querySelectorAll("[data-control]").forEach((button) => {
      const control = button.dataset.control;

      if (control === "xlWidget") {
        button.innerHTML = `<span>XL</span><strong data-a11y-ui="xlWidget">${t.xlWidget}</strong><small></small>`;
      } else {
        button.innerHTML = `<span>${ICONS[control]}</span><strong>${t.controls[control]}</strong><small></small>`;
      }
    });

    updateButtons();
  }

  function setText(selector, value) {
    const element = panel.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setHtml(selector, value) {
    const element = panel.querySelector(selector);
    if (element) element.innerHTML = value;
  }

  function togglePanel() {
    const willOpen = !panel.classList.contains("is-open");
    panel.classList.toggle("is-open", willOpen);
    toggleButton.setAttribute("aria-expanded", String(willOpen));
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove("is-open");
    toggleButton?.setAttribute("aria-expanded", "false");
  }

  function activateControl(control) {
    state.activeProfile = "";

    switch (control) {
      case "xlWidget":
        state.xlWidget = !state.xlWidget;
        break;

      case "read":
        cycleReadMode();
        break;

      case "contrast":
        state.contrastMode = nextValue(state.contrastMode, ["normal", "invert", "dark", "light"]);
        if (state.contrastMode !== "normal") state.features.smartContrast = false;
        break;

      case "textLevel":
        state.textLevel = (state.textLevel + 1) % 4;
        break;

      case "textSpacing":
        state.textSpacingLevel = (state.textSpacingLevel + 1) % 4;
        break;

      case "dyslexiaFont":
        state.fontMode = nextValue(state.fontMode, ["normal", "dyslexia", "readable"]);
        break;

      case "bigCursor":
        state.cursorMode = nextValue(state.cursorMode, ["normal", "big", "mask", "guide"]);
        break;

      case "lineHeight":
        state.lineHeightLevel = (state.lineHeightLevel + 1) % 4;
        break;

      case "alignText":
        state.alignMode = nextValue(state.alignMode, ["normal", "left", "right", "center", "justify"]);
        break;

      case "saturation":
        state.saturation = nextValue(state.saturation, ["normal", "low", "high", "desaturated"]);
        break;

      case "structure":
        showStructureModal();
        return;

      case "smartContrast":
        state.features.smartContrast = !state.features.smartContrast;
        if (state.features.smartContrast) state.contrastMode = "normal";
        break;

      default:
        if (Object.prototype.hasOwnProperty.call(state.features, control)) {
          state.features[control] = !state.features[control];
        }
    }

    saveState();
    applyState();
    updateButtons();
  }

  function nextValue(currentValue, values) {
    const index = values.indexOf(currentValue);
    return values[(index + 1) % values.length];
  }

  function cycleReadMode() {
    const nextMode = nextValue(state.readMode, ["off", "normal", "slow", "fast"]);
    state.readMode = nextMode;

    readingToken += 1;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    if (nextMode !== "off") {
      window.setTimeout(() => speakPage(), 80);
    }
  }

  function applyProfile(profileName) {
    const profile = PROFILE_MAP[profileName];
    if (!profile) return;

    if (state.activeProfile === profileName) {
      resetAccessibility();
      return;
    }

    const keepPosition = state.position;
    const keepXlWidget = state.xlWidget;

    state = clone(DEFAULT_STATE);
    state.position = keepPosition;
    state.xlWidget = keepXlWidget;
    state.activeProfile = profileName;

    state.textLevel = profile.textLevel || 0;
    state.readMode = profile.readMode || "off";
    state.contrastMode = profile.contrastMode || "normal";
    state.textSpacingLevel = profile.textSpacingLevel || 0;
    state.fontMode = profile.fontMode || "normal";
    state.cursorMode = profile.cursorMode || "normal";
    state.lineHeightLevel = profile.lineHeightLevel || 0;
    state.alignMode = profile.alignMode || "normal";
    state.saturation = profile.saturation || "normal";

    state.features = {
      ...DEFAULT_STATE.features,
      ...(profile.features || {})
    };

    if (window.speechSynthesis) {
      readingToken += 1;
      window.speechSynthesis.cancel();
    }

    saveState();
    applyState();
    updateButtons();

    if (profile.speak || state.readMode !== "off") {
      window.setTimeout(() => speakPage(), 80);
    }
  }

  function resetAccessibility() {
    const keepPosition = state.position;
    const keepXlWidget = state.xlWidget;

    state = clone(DEFAULT_STATE);
    state.position = keepPosition;
    state.xlWidget = keepXlWidget;

    readingToken += 1;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    saveState();
    applyState();
    updateButtons();
  }

  function setPosition(position) {
    state.position = position === "right" ? "right" : "left";
    saveState();
    applyState();
    updateButtons();
  }

  function hideWidget(duration) {
    const now = Date.now();
    const durations = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };

    if (duration === "session") {
      sessionStorage.setItem(HIDE_SESSION_KEY, "1");
    } else if (duration === "forever") {
      localStorage.setItem(HIDE_UNTIL_KEY, "forever");
    } else if (durations[duration]) {
      localStorage.setItem(HIDE_UNTIL_KEY, String(now + durations[duration]));
    }

    closePanel();

    document.querySelectorAll(
      ".pf-a11y-float, .pf-a11y-panel, .pf-a11y-reading-guide, .pf-a11y-reading-mask, .pf-a11y-tooltip"
    ).forEach((element) => element.remove());
  }

  function applyState() {
    const root = document.documentElement;

    removeA11yClasses(root);

    Object.entries(BOOLEAN_CLASS_MAP).forEach(([feature, className]) => {
        root.classList.toggle(className, Boolean(state.features[feature]));
    });

    root.classList.toggle("pf-a11y-xl-widget", Boolean(state.xlWidget));

    if (state.textLevel > 0) {
        root.classList.add(`pf-a11y-text-${state.textLevel}`);
    }

    if (state.contrastMode === "invert") {
        root.classList.add("pf-a11y-invert-colors");
    }

    if (state.contrastMode === "dark") {
        root.classList.add("pf-a11y-dark-contrast");
    }

    if (state.contrastMode === "light") {
        root.classList.add("pf-a11y-light-contrast");
    }

    if (state.textSpacingLevel > 0) {
        root.classList.add(`pf-a11y-text-spacing-${state.textSpacingLevel}`);
    }

    if (state.fontMode === "dyslexia") {
        root.classList.add("pf-a11y-dyslexia-font");
    }

    if (state.fontMode === "readable") {
        root.classList.add("pf-a11y-readable-font");
    }

    if (state.cursorMode === "big") {
        root.classList.add("pf-a11y-big-cursor");
    }

    if (state.cursorMode === "mask") {
        root.classList.add("pf-a11y-reading-mask-on");
    }

    if (state.cursorMode === "guide") {
        root.classList.add("pf-a11y-reading-guide-on");
    }

    if (state.lineHeightLevel > 0) {
        root.classList.add(`pf-a11y-line-height-${state.lineHeightLevel}`);
    }

    if (state.alignMode !== "normal") {
        root.classList.add(`pf-a11y-align-${state.alignMode}`);
    }

    if (state.saturation === "low") {
        root.classList.add("pf-a11y-saturation-low");
    }

    if (state.saturation === "high") {
        root.classList.add("pf-a11y-saturation-high");
    }

    if (state.saturation === "desaturated") {
        root.classList.add("pf-a11y-saturation-desaturated");
    }

    if (toggleButton && panel) {
        toggleButton.classList.toggle("pf-a11y-right", state.position === "right");
        panel.classList.toggle("pf-a11y-right", state.position === "right");
        panel.classList.toggle("pf-a11y-xl", Boolean(state.xlWidget));
    }

    handleVideos();
    handlePointerHelpers();
    }

  function removeA11yClasses(root) {
    [
        ...Object.values(BOOLEAN_CLASS_MAP),

        "pf-a11y-xl-widget",

        "pf-a11y-text-1",
        "pf-a11y-text-2",
        "pf-a11y-text-3",

        "pf-a11y-contrast",
        "pf-a11y-invert-colors",
        "pf-a11y-dark-contrast",
        "pf-a11y-light-contrast",

        "pf-a11y-text-spacing",
        "pf-a11y-text-spacing-1",
        "pf-a11y-text-spacing-2",
        "pf-a11y-text-spacing-3",

        "pf-a11y-dyslexia-font",
        "pf-a11y-readable-font",

        "pf-a11y-big-cursor",
        "pf-a11y-reading-mask-on",
        "pf-a11y-reading-guide-on",

        "pf-a11y-line-height",
        "pf-a11y-line-height-1",
        "pf-a11y-line-height-2",
        "pf-a11y-line-height-3",

        "pf-a11y-align-left",
        "pf-a11y-align-right",
        "pf-a11y-align-center",
        "pf-a11y-align-justify",

        "pf-a11y-saturation-low",
        "pf-a11y-saturation-high",
        "pf-a11y-saturation-desaturated"
    ].forEach((className) => root.classList.remove(className));
 }

  function updateButtons() {
    if (!panel) return;

    const t = text();

    panel.querySelectorAll("[data-profile]").forEach((button) => {
      const active = button.dataset.profile === state.activeProfile;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    panel.querySelectorAll("[data-position]").forEach((button) => {
      const active = button.dataset.position === state.position;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    panel.querySelectorAll("[data-control]").forEach((button) => {
      const control = button.dataset.control;
      const small = button.querySelector("small");
      let active = false;
      let status = "";

      if (control === "xlWidget") {
        active = state.xlWidget;
        status = active ? t.enabled : "";
      } else if (control === "read") {
        active = state.readMode !== "off";
        status = active ? t.readModes[state.readMode] : "";
      } else if (control === "contrast") {
        active = state.contrastMode !== "normal";
        status = active ? t.contrastModes[state.contrastMode] : "";
      } else if (control === "textLevel") {
        active = state.textLevel > 0;
        status = active ? `${t.level} ${state.textLevel}` : "";
      } else if (control === "textSpacing") {
        active = state.textSpacingLevel > 0;
        status = active ? t.spacingModes[state.textSpacingLevel] : "";
      } else if (control === "dyslexiaFont") {
        active = state.fontMode !== "normal";
        status = active ? t.fontModes[state.fontMode] : "";
      } else if (control === "bigCursor") {
        active = state.cursorMode !== "normal";
        status = active ? t.cursorModes[state.cursorMode] : "";
      } else if (control === "lineHeight") {
        active = state.lineHeightLevel > 0;
        status = active ? t.lineHeightModes[state.lineHeightLevel] : "";
      } else if (control === "alignText") {
        active = state.alignMode !== "normal";
        status = active ? t.alignModes[state.alignMode] : "";
      } else if (control === "saturation") {
        active = state.saturation !== "normal";
        status = active ? t.saturationModes[state.saturation] : "";
      } else if (control === "structure") {
        active = false;
      } else {
        active = Boolean(state.features[control]);
        status = active ? t.active : "";
      }

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      if (small) small.textContent = status;
    });
  }

  function handleVideos() {
    const shouldStop = state.features.stopAnimations;

    document.querySelectorAll("video").forEach((video) => {
      if (shouldStop && !video.paused) {
        video.dataset.pfA11yWasPlaying = "1";
        video.pause();
      }

      if (!shouldStop && video.dataset.pfA11yWasPlaying === "1") {
        video.play().catch(() => {});
        delete video.dataset.pfA11yWasPlaying;
      }
    });
  }

  function handlePointerHelpers() {
    const active = state.cursorMode === "guide" || state.cursorMode === "mask";
    updatePointerHelpers(pointerY);

    if (active && !pointerListenersBound) {
      document.addEventListener("mousemove", onPointerMove);
      document.addEventListener("touchmove", onTouchMove, { passive: true });
      pointerListenersBound = true;
    }

    if (!active && pointerListenersBound) {
      document.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("touchmove", onTouchMove);
      pointerListenersBound = false;
    }
  }

  function onPointerMove(event) {
    pointerY = event.clientY;
    updatePointerHelpers(pointerY);
  }

  function onTouchMove(event) {
    if (!event.touches || !event.touches[0]) return;
    pointerY = event.touches[0].clientY;
    updatePointerHelpers(pointerY);
  }

  function updatePointerHelpers(y) {
    if (guide) guide.style.top = `${y}px`;
    if (mask) mask.style.setProperty("--pf-mask-y", `${y}px`);
  }

  function speakPage() {
    const t = text();

    if (!("speechSynthesis" in window)) {
      alert(t.readUnsupported);
      state.readMode = "off";
      saveState();
      updateButtons();
      return;
    }

    const selectedText = window.getSelection().toString().trim();
    const readableText = selectedText || collectReadableText();

    if (!readableText) {
      alert(t.noText);
      state.readMode = "off";
      saveState();
      updateButtons();
      return;
    }

    const currentToken = ++readingToken;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(readableText.slice(0, 9000));
    utterance.lang = getLang() === "en" ? "en-US" : "el-GR";
    utterance.pitch = 1;

    if (state.readMode === "slow") {
      utterance.rate = getLang() === "en" ? 0.78 : 0.72;
    } else if (state.readMode === "fast") {
      utterance.rate = getLang() === "en" ? 1.3 : 1.25;
    } else {
      utterance.rate = getLang() === "en" ? 0.95 : 0.92;
    }

    utterance.onend = () => {
      if (currentToken !== readingToken) return;

      state.readMode = "off";
      saveState();
      applyState();
      updateButtons();
    };

    window.speechSynthesis.speak(utterance);
  }

  function collectReadableText() {
    const selectors = "h1, h2, h3, h4, p, li, label, button, a";

    return Array.from(document.body.querySelectorAll(selectors))
      .filter((element) => !element.closest(".pf-a11y-widget"))
      .filter((element) => element.offsetParent !== null)
      .map((element) => element.innerText || element.textContent || "")
      .map((value) => value.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(". ");
  }

  function showTooltip(event) {
    if (!state.features.tooltips || !tooltip) return;

    const target = event.target.closest("a, button, input, textarea, select, img, [aria-label], [title]");
    if (!target || target.closest(".pf-a11y-widget")) return;

    const tooltipText = getTooltipText(target);
    if (!tooltipText) return;

    tooltip.textContent = tooltipText;
    tooltip.classList.add("is-visible");

    const rect = target.getBoundingClientRect();
    const top = Math.max(12, rect.top - tooltip.offsetHeight - 10);
    const left = Math.min(window.innerWidth - tooltip.offsetWidth - 12, Math.max(12, rect.left));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  function hideTooltip() {
    if (tooltip) tooltip.classList.remove("is-visible");
  }

  function getTooltipText(element) {
    if (element.getAttribute("aria-label")) return element.getAttribute("aria-label");
    if (element.getAttribute("title")) return element.getAttribute("title");
    if (element.getAttribute("alt")) return element.getAttribute("alt");
    if (element.getAttribute("placeholder")) return element.getAttribute("placeholder");
    return (element.innerText || element.textContent || "").trim().slice(0, 120);
  }

  function showStructureModal() {
    closeStructureModal();

    const t = text();

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
      .filter((heading) => !heading.closest(".pf-a11y-widget"))
      .map((heading, index) => {
        heading.dataset.pfA11yHeading = String(index);

        return {
          index,
          level: heading.tagName.toLowerCase(),
          value: (heading.innerText || heading.textContent || "").trim()
        };
      })
      .filter((heading) => heading.value);

    const listHtml = headings.length
      ? headings
          .map(
            (heading) =>
              `<button type="button" data-heading-index="${heading.index}"><span>${heading.level.toUpperCase()}</span>${heading.value}</button>`
          )
          .join("")
      : `<p>${t.noHeadings}</p>`;

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="pf-a11y-widget pf-a11y-structure-modal" role="dialog" aria-modal="true" aria-label="${t.structureTitle}">
        <div class="pf-a11y-structure-dialog">
          <div class="pf-a11y-structure-head">
            <strong>${t.structureTitle}</strong>
            <button type="button" data-structure-close aria-label="${t.closeLabel}">×</button>
          </div>
          <div class="pf-a11y-structure-list">${listHtml}</div>
        </div>
      </div>
      `
    );

    const modal = document.querySelector(".pf-a11y-structure-modal");

    modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-structure-close]") || event.target === modal) {
        closeStructureModal();
        return;
      }

      const button = event.target.closest("[data-heading-index]");
      if (!button) return;

      const heading = document.querySelector(`[data-pf-a11y-heading="${button.dataset.headingIndex}"]`);
      if (!heading) return;

      heading.scrollIntoView({
        behavior: state.features.stopAnimations ? "auto" : "smooth",
        block: "start"
      });

      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      closeStructureModal();
    });
  }

  function closeStructureModal() {
    document.querySelector(".pf-a11y-structure-modal")?.remove();
  }

  function init() {
    if (widgetIsHidden()) return;

    createWidget();
    applyState();
    refreshWidgetLanguage();
    updateButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();