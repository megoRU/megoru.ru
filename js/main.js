'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const topbar = document.querySelector('.topbar');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themes = ['auto', 'light', 'dark'];
    const themeNames = {
        auto: 'авто',
        light: 'светлая',
        dark: 'тёмная'
    };

    function getStoredTheme() {
        try {
            const savedTheme = localStorage.getItem('theme');
            return themes.includes(savedTheme) ? savedTheme : 'auto';
        } catch (error) {
            return 'auto';
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            // В приватном режиме localStorage может быть недоступен — тема всё равно применится.
        }
    }

    let currentTheme = getStoredTheme();

    function updateThemeControl() {
        if (!themeToggle) return;

        const label = `Тема: ${themeNames[currentTheme]}. Нажмите, чтобы переключить`;
        themeToggle.setAttribute('aria-label', label);
        themeToggle.title = label;
    }

    function applyTheme(theme, persist = true) {
        currentTheme = themes.includes(theme) ? theme : 'auto';
        root.setAttribute('data-theme', currentTheme);

        if (persist) {
            storeTheme(currentTheme);
        }

        updateThemeControl();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextThemeIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
            applyTheme(themes[nextThemeIndex]);
        });
    }

    applyTheme(currentTheme, false);

    const handleSystemThemeChange = () => {
        if (currentTheme === 'auto') {
            applyTheme('auto', false);
        }
    };

    if (typeof systemTheme.addEventListener === 'function') {
        systemTheme.addEventListener('change', handleSystemThemeChange);
    } else if (typeof systemTheme.addListener === 'function') {
        systemTheme.addListener(handleSystemThemeChange);
    }

    requestAnimationFrame(() => root.setAttribute('data-theme-ready', ''));

    if (topbar) {
        const updateTopbar = () => {
            topbar.classList.toggle('scrolled', window.scrollY > 8);
        };

        updateTopbar();
        window.addEventListener('scroll', updateTopbar, { passive: true });
    }

    const trackedSections = Array.from(document.querySelectorAll('#projects, #support, #contacts'));
    const sectionLinks = Array.from(document.querySelectorAll('[data-section-link]'));
    let activeSection = '';

    const updateActiveSection = () => {
        if (!trackedSections.length || !sectionLinks.length) return;

        const marker = window.scrollY + 150;
        let nextSection = '';

        trackedSections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (sectionTop <= marker) {
                nextSection = section.id;
            }
        });

        if (window.scrollY < 80) {
            nextSection = '';
        }

        if (nextSection === activeSection) return;
        activeSection = nextSection;

        sectionLinks.forEach((link) => {
            if (link.dataset.sectionLink === activeSection) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    const year = document.getElementById('current-year');
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    async function fetchGitHubStars() {
        const starsBadges = Array.from(document.querySelectorAll('[data-github-stars]'));
        if (!starsBadges.length) return;

        const fallbackStars = 15;
        const renderStars = (starsCount) => {
            starsBadges.forEach((badge) => {
                badge.querySelector('.stars-count').textContent = String(starsCount);
                badge.setAttribute('aria-label', `${starsCount} звёзд на GitHub`);
            });
        };

        try {
            const response = await fetch('https://api.github.com/repos/megoRU/YetAnotherSSHClient', {
                headers: { Accept: 'application/vnd.github+json' }
            });

            if (!response.ok) {
                throw new Error(`GitHub API returned ${response.status}`);
            }

            const repository = await response.json();
            if (!repository || typeof repository.stargazers_count !== 'number') {
                throw new Error('Unexpected GitHub API response');
            }

            renderStars(repository.stargazers_count);
        } catch (error) {
            renderStars(fallbackStars);
        }
    }

    fetchGitHubStars();
});
