document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const root = document.documentElement;
    const navContainer = document.querySelector('.nav-container');

    const themes = ['light', 'dark', 'auto'];
    let currentThemeIndex = 0;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        currentThemeIndex = themes.indexOf(theme);
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(themes[currentThemeIndex]);
        });
    }

    applyTheme(localStorage.getItem('theme') || 'auto');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'auto') {
            applyTheme('auto');
        }
    });

    root.setAttribute('data-theme-ready', '');

    // Sticky nav shadow on scroll
    if (navContainer) {
        const updateNavState = () => {
            navContainer.classList.toggle('scrolled', window.scrollY > 12);
        };
        updateNavState();
        window.addEventListener('scroll', updateNavState, { passive: true });
    }

    // Scroll reveal via IntersectionObserver
    const revealElements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers: show everything
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // Fetch GitHub Stars for YetAnotherSSHClient
    async function fetchGitHubStars() {
        const starsBadge = document.getElementById('ssh-client-stars');
        if (!starsBadge) return;

        const starsCountElement = starsBadge.querySelector('.stars-count');

        try {
            const response = await fetch('https://api.github.com/repos/megoRU/YetAnotherSSHClient');
            if (response.ok) {
                const data = await response.json();
                if (data && typeof data.stargazers_count === 'number') {
                    starsCountElement.textContent = data.stargazers_count;
                    return;
                }
            }
            starsCountElement.textContent = '15'; // fallback if API fails or rate limited
        } catch (error) {
            console.error('Failed to fetch GitHub stars:', error);
            starsCountElement.textContent = '15'; // fallback value
        }
    }

    fetchGitHubStars();
});