const i18n = {
    currentLang: 'gr',
    translations: {},

    async init() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && (savedLang === 'gr' || savedLang === 'en')) {
            this.currentLang = savedLang;
        }

        await this.loadTranslations(this.currentLang);
        this.translatePage();
        this.updateActiveButtons();
    },

    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            this.translations = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);
            return false;
        }
    },

    async setLanguage(lang) {
        if (lang === this.currentLang) return;

        document.body.style.opacity = '0.5';

        const success = await this.loadTranslations(lang);
        if (success) {
            this.currentLang = lang;
            localStorage.setItem('preferred-language', lang);
            this.translatePage();
            this.updateActiveButtons();
        }

        document.body.style.opacity = '1';
    },

    translatePage() {
        const t = this.translations;

        // 🔥 AUTO TRANSLATION (no more manual mapping)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });

        // Lists (arrays)
        document.querySelectorAll('[data-i18n-list]').forEach(container => {
            const key = container.getAttribute('data-i18n-list');
            if (t[key] && Array.isArray(t[key])) {
                const items = container.querySelectorAll('li');
                t[key].forEach((item, index) => {
                    if (items[index]) items[index].textContent = item;
                });
            }
        });
    },

    updateActiveButtons() {
        const grBtn = document.getElementById('lang-gr');
        const enBtn = document.getElementById('lang-en');

        if (!grBtn || !enBtn) return;

        if (this.currentLang === 'gr') {
            grBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            grBtn.classList.remove('active');
        }
    }
};

window.setLanguage = (lang) => i18n.setLanguage(lang);

document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});