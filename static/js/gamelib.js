(async function(lunr) {
    const $gameLib = document.querySelector('.gamelib');
    const $gameSearchInput = document.querySelector('.gamesearch-input');
    const $gameSearchForm = document.querySelector('.gamesearch-form');

    const res = await fetch('https://api.github.com/gists/1402e96b5f5cb46e7f6a6604f847857b');
    const json = await res.json();
    let library;

    try {
        library = JSON.parse(json.files['library.json'].content);
    } catch {
        console.error('Could not parse JSON.');
        return;
    }

    const slugMap = {};

    const idx = lunr(function() {
        this.ref('slug');
        this.field('name');
        this.field('store');

        // let's not waste this loop;
        // use it for both the lunr index build and initial HTML build
        let gamesHtml = '';
        for (let i = 0, len = library.games.length; i < len; i++) {
            const slug = slugify(library.games[i].name + library.games[i].store);
            this.add({
                slug: slug,
                name: library.games[i].name,
                store: library.games[i].store
            });

            slugMap[slug] = library.games[i];

            gamesHtml +=
                `<article class="game">` +
                    `<header>${library.games[i].name}</header>` +
                    `<aside>${library.games[i].store}</aside>` +
                `</article>`;
        }

        $gameLib.innerHTML = gamesHtml;
    });

    $gameSearchForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const value = $gameSearchInput.value.trim();
        if (value) {
            const results = idx.search(value + '~1');
            const games = [];
            for (let i = 0, len = results.length; i < len; i++) {
                games.push(slugMap[results[i].ref]);
            }

            const html = buildGamesHtml(games);
            $gameLib.innerHTML = html.trim() ? html : '<em class="my2">No games found</em>';
        } else {
            $gameLib.innerHTML = buildGamesHtml(library.games);
        }
    });

    function buildGamesHtml(games) {
        let gamesHtml = '';
        for (let i = 0, len = games.length; i < len; i++) {

            gamesHtml +=
                `<article class="game">` +
                    `<header>${games[i].name}</header>` +
                    `<aside>${games[i].store}</aside>` +
                `</article>`;
        }

        return gamesHtml;
    }

    function slugify(text) {
        let lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const slug = lines[i].toString().toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                .replace(/\-\-+/g, '-') // Replace multiple - with single -
                .replace(/^-+/, '') // Trim - from start of text
                .replace(/-+$/, '') // Trim - from end of text
            ;

            if (slug.length > 0)
                return slug;
        }

        return '';
    }
})(window.lunr);