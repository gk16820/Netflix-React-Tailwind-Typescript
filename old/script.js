// Netflix Clone - Professional API Implementation

// Constants
const API_KEY = "19f84e11932abbc79e6d83f82d6d1045";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

// Enhanced Request List for Specific Pages
const requests = {
    // General
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,

    // Movies
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSciFi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchThriller: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`,
    fetchFamily: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`,
    fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    fetchNowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,

    // TV
    fetchTVTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchTVAction: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchTVComedy: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchTVCrime: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=80`,
    fetchTVDrama: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18`,
    fetchTVMystery: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    fetchTVAnimation: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`,
    fetchTVAiringToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`,
    fetchSearch: (query) => `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`,
};

// Global Cache
const movieCache = new Map();

// --- Initialization ---
function init() {
    injectModal();
    setupNavbar();

    const path = window.location.pathname;

    // Robust Routing based on Filename
    if (path.includes('tv.html')) {
        renderTVShowsPage();
    } else if (path.includes('movies.html')) {
        renderMoviesPage();
    } else if (path.includes('latest.html')) {
        renderLatestPage();
    } else if (path.includes('mylist.html')) {
        renderMyListPage();
    } else {
        // Default to home page
        renderHomePage();
    }
}

// --- Shared Modal Component ---
const MODAL_HTML = `
    <div id="movie-modal" class="fixed inset-0 z-[60] hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onclick="closeModal()"></div>
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="relative inline-block align-bottom bg-[#181818] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
                <button onclick="closeModal()" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#181818] text-white flex items-center justify-center hover:bg-white hover:text-black transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="relative h-[40vh] md:h-[50vh]">
                    <div id="modal-banner" class="absolute inset-0 bg-cover bg-center">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
                    </div>
                    <div class="absolute bottom-10 left-10 space-y-4 max-w-xl z-20">
                        <h2 id="modal-title" class="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Title</h2>
                        <div class="flex items-center gap-4">
                            <button id="modal-play-btn" class="bg-white text-black px-8 py-2 rounded font-bold hover:bg-opacity-90 transition flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                                </svg>
                                Play
                            </button>
                            <button id="modal-add-btn" class="border border-gray-400 text-white px-4 py-2 rounded-full hover:border-white transition flex items-center justify-center font-bold text-xl w-10 h-10">+</button>
                            <button id="modal-fav-btn" class="border border-gray-400 text-white px-77 py-55 rounded-full hover:border-white transition flex items-center justify-center w-10 h-10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-8 md:p-12 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
                    <div class="md:col-span-2 space-y-4">
                        <div class="flex items-center gap-3 text-sm">
                            <span class="text-green-500 font-bold">98% Match</span>
                            <span id="modal-date" class="text-gray-400">2023</span>
                            <span class="border border-gray-500 px-1 text-xs text-gray-400">HD</span>
                        </div>
                        <p id="modal-overview" class="text-white text-base md:text-lg leading-relaxed"></p>
                    </div>
                    <div class="text-sm space-y-2">
                        <div><span class="text-gray-500">Cast:</span> <span class="text-white">Generic Cast, Actor Name</span></div>
                        <div><span class="text-gray-500">Genres:</span> <span class="text-white">Action, Exciting</span></div>
                        <div><span class="text-gray-500">This movie is:</span> <span class="text-white">Mind-bending</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

function injectModal() {
    if (!document.getElementById('movie-modal')) {
        document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
    }
}


// --- Navbar Functions ---
function setupNavbar() {
    const nav = document.getElementById('navbar');

    // Inject Profile Dropdown
    const profileImg = document.querySelector('nav img[alt="Profile"]');
    if (profileImg) {
        const container = profileImg.parentElement;
        if (container) {

            // - Uses opacity/invisible for transitions
            // - Adds delay for slow closing 



            // Organized the dropdown 
            const dropdown = `
                <div class="absolute right-0 top-6 mt-2 w-32 bg-black/90 border border-gray-700 rounded shadow-lg overflow-hidden 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-200 group-hover:delay-0">
                    <a href="profile.html" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white">Profile</a>
                    <a href="login.html" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white">Login</a>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', dropdown);
        }
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('bg-black');
            nav.classList.remove('bg-gradient-to-b');
        } else {
            nav.classList.remove('bg-black');
            nav.classList.add('bg-gradient-to-b');
        }
    });

    // Active Link Highlighting
    const links = document.querySelectorAll('nav ul li a');
    const path = window.location.pathname;

    links.forEach(link => {
        link.classList.remove('font-bold', 'text-white');
        link.classList.add('font-normal', 'text-gray-200');

        const href = link.getAttribute('href');
        if (!href) return;

        let isActive = false;
        if (path.includes(href)) isActive = true;
        // Special case for root
        if ((path === '/' || path.endsWith('/')) && href === 'index.html') isActive = true;

        if (isActive) {
            link.classList.remove('font-normal', 'text-gray-200');
            link.classList.add('font-bold', 'text-white');
        }
    });

    // Search Interaction
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.getElementById('search-container');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchInput.focus();
        });

        let typingTimer;
        const doneTypingInterval = 500; // ms

        searchInput.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                const query = searchInput.value.trim();
                if (query.length > 2) {
                    performSearch(query);
                } else if (query.length === 0) {
                    // Reset to home or previous page
                    init();
                }
            }, doneTypingInterval);
        });

        // Close search on blur if empty
        searchInput.addEventListener('blur', () => {
            if (searchInput.value.trim() === '') {
                // Optional: add logic if you want to explicitly collapse
            }
        });
    }
}

function clearContainer() {
    const container = document.getElementById('rows-container');
    if (container) container.innerHTML = '';
}

// --- Page Renderers ---

async function renderHomePage() {
    clearContainer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hero: Trending Week
    const trending = await fetchData(requests.fetchTrending);
    if (trending.length > 0) setupHero(trending);

    // Rows: Mix of Everything
    await createRow("NETFLIX ORIGINALS", requests.fetchNetflixOriginals, true);
    await createRow("Trending Now", requests.fetchTrending);
    await createRow("Top Rated", requests.fetchTopRated);
    await createRow("Action Thrillers", requests.fetchActionMovies);
    await createRow("Comedies", requests.fetchComedyMovies);
    await createRow("Horror Movies", requests.fetchHorrorMovies);
    await createRow("Romance Movies", requests.fetchRomanceMovies);
    await createRow("Documentaries", requests.fetchDocumentaries);
}

async function renderTVShowsPage() {
    clearContainer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hero: Netflix Originals (TV)
    const originals = await fetchData(requests.fetchNetflixOriginals);
    if (originals.length > 0) setupHero(originals);

    // Rows: TV Specific Genres
    await createRow("Trending TV Shows", requests.fetchTVTrending, true);
    await createRow("Crime TV Shows", requests.fetchTVCrime);
    await createRow("Reality & Variety", `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10764`);
    await createRow("Action & Adventure", requests.fetchTVAction);
    await createRow("TV Dramas", requests.fetchTVDrama);
    await createRow("Sitcoms", requests.fetchTVComedy);
    await createRow("Mystery Programmes", requests.fetchTVMystery);
    await createRow("Animation", requests.fetchTVAnimation);
}

async function renderMoviesPage() {
    clearContainer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hero: Action Movies
    const bannerData = await fetchData(requests.fetchActionMovies);
    if (bannerData.length > 0) setupHero(bannerData);

    // Rows: Movie Specific Genres
    await createRow("Blockbuster Movies", requests.fetchActionMovies, true);
    await createRow("New Releases", requests.fetchNowPlaying);
    await createRow("Sci-Fi & Fantasy", requests.fetchSciFi);
    await createRow("Suspenseful Thrillers", requests.fetchThriller);
    await createRow("Family Movies", requests.fetchFamily);
    await createRow("Romantic Favorites", requests.fetchRomanceMovies);
    await createRow("Critically Acclaimed", requests.fetchTopRated);
}

async function renderLatestPage() {
    clearContainer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hero: Upcoming Movie
    const upcoming = await fetchData(requests.fetchUpcoming);
    if (upcoming.length > 0) setupHero(upcoming);

    // Rows: New & Popular Specific
    await createRow("Coming Soon", requests.fetchUpcoming, true);
    await createRow("New on Netflix", requests.fetchNowPlaying);
    await createRow("Airing Today (TV)", requests.fetchTVAiringToday);
    await createRow("Trending Movies", requests.fetchTrending);
    await createRow("Top Rated", requests.fetchTopRated);
}

function renderMyListPage() {
    clearContainer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('rows-container').innerHTML = `
        <div class="h-[60vh] flex flex-col items-center justify-center text-center text-gray-400">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            <h2 class="text-3xl text-white font-bold mb-2">Your List is Empty</h2>
            <p class="max-w-md">Films and TV shows that you add to your list will appear here.</p>
        </div>
    `;

    // Allow hero to be hidden or standard
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = 'none'; // distinct look for My List

    const main = document.querySelector('main');
    if (main) {
        main.classList.remove('-mt-24', 'md:-mt-32');
        main.classList.add('pt-24');
    }
}

// --- Search Logic ---

async function performSearch(query) {
    const results = await fetchData(requests.fetchSearch(query));
    renderSearchResults(results, query);
}

function renderSearchResults(results, query) {
    clearContainer();

    // Hide Hero
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = 'none';

    const main = document.querySelector('main');
    if (main) {
        main.classList.remove('-mt-24', 'md:-mt-32');
        main.classList.add('pt-24');
    }

    const container = document.getElementById('rows-container');

    if (results.length === 0) {
        container.innerHTML = `
            <div class="h-[60vh] flex flex-col items-center justify-center text-center text-gray-400">
                <p class="text-xl">Your search for "${query}" did not have any matches.</p>
                <p class="text-sm mt-2 text-gray-500">Suggestions: Try different keywords or movie titles.</p>
            </div>
        `;
        return;
    }

    const gridHtml = `
        <div class="px-4 md:px-12 pb-20 fade-in">
            <h2 class="text-xl md:text-2xl font-bold text-white mb-6">Results for: <span class="text-gray-400">${query}</span></h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-8 gap-x-4">
                ${results.filter(m => m.poster_path || m.backdrop_path).map(movie => {
        const imgUrl = movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : `${IMG_BASE_URL}${movie.backdrop_path}`;
        return `
                        <div class="relative group cursor-pointer transition-transform duration-300 hover:scale-105" onclick="openModal('${movie.id}')">
                            <img 
                                src="${imgUrl}" 
                                alt="${movie.name || movie.title}" 
                                class="w-full aspect-[2/3] object-cover rounded shadow-lg"
                                loading="lazy"
                            >
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                <p class="text-white text-xs font-bold px-2 text-center line-clamp-2">${movie.name || movie.title}</p>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;

    container.innerHTML = gridHtml;
}

// --- Fetch & Helpers ---

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results || [];
        results.forEach(item => movieCache.set(item.id.toString(), item));
        return results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

function setupHero(movies) {
    const hero = document.getElementById('hero');
    if (hero) hero.style.display = 'block';

    const main = document.querySelector('main');
    if (main) {
        main.classList.add('-mt-24', 'md:-mt-32');
        main.classList.remove('pt-24');
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    if (randomMovie && randomMovie.id) movieCache.set(randomMovie.id.toString(), randomMovie);

    const heroBg = document.getElementById('hero-bg');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-overview');

    if (heroBg && randomMovie) {
        const bgUrl = IMG_BASE_URL + (randomMovie.backdrop_path || randomMovie.poster_path);
        heroBg.style.backgroundImage = `url('${bgUrl}')`;
    }
    if (heroTitle && randomMovie) heroTitle.innerText = randomMovie.title || randomMovie.name || randomMovie.original_name;
    if (heroDesc && randomMovie) heroDesc.innerText = randomMovie.overview;

    const buttons = document.querySelectorAll('#hero button');
    buttons.forEach(btn => {
        if (randomMovie) btn.onclick = () => openModal(randomMovie.id.toString());
    });
}

// --- Row Creation ---

async function createRow(title, fetchUrl, isLargeRow = false) {
    const movies = await fetchData(fetchUrl);
    if (!movies || movies.length === 0) return;

    const container = document.getElementById('rows-container');
    const rowId = 'row-' + Math.random().toString(36).substr(2, 9);

    const posters = movies.map(movie => {
        let imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
        if (!imagePath) imagePath = movie.poster_path;
        if (!imagePath) return '';

        const imgUrl = `${IMG_BASE_URL}${imagePath}`;
        const heightClass = isLargeRow ? "h-64 md:h-[400px]" : "h-28 md:h-36";
        const width = isLargeRow ? "min-w-[150px] md:min-w-[250px]" : "min-w-[180px] md:min-w-[240px]";

        return `
            <img 
                src="${imgUrl}" 
                alt="${movie.name || movie.title}" 
                class="movie-card transition-transform duration-450 ease-out ${heightClass} ${width} object-cover rounded cursor-pointer mr-2 hover:scale-110 lazy-img"
                loading="lazy"
                data-id="${movie.id}"
            >
        `;
    }).join('');

    const rowHtml = `
        <div class="row pl-0 mb-8 relative group">
            <h2 class="text-xl md:text-2xl font-bold text-white mb-2 pl-4 md:pl-12">${title}</h2>
            <div class="relative group">
                <div class="slider-btn absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 bg-black/50 cursor-pointer flex items-center justify-center hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                     onclick="document.getElementById('${rowId}').scrollLeft -= window.innerWidth / 2">
                     <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
                <div id="${rowId}" class="flex overflow-x-scroll no-scrollbar py-4 px-4 md:px-12 scroll-smooth">
                    ${posters}
                </div>
                <div class="slider-btn absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 bg-black/50 cursor-pointer flex items-center justify-center hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                     onclick="document.getElementById('${rowId}').scrollLeft += window.innerWidth / 2">
                     <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', rowHtml);

    // Attach click listeners to new elements
    const rowEl = document.getElementById(rowId);
    if (rowEl) {
        rowEl.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', () => {
                const id = img.getAttribute('data-id');
                openModal(id);
            });
        });
    }
}

// --- Modal Logic ---

function openModal(movieId) {
    const movie = movieCache.get(movieId.toString());
    if (!movie) return;

    const modal = document.getElementById('movie-modal');
    if (!modal) return;

    const banner = document.getElementById('modal-banner');
    const title = document.getElementById('modal-title');
    const overview = document.getElementById('modal-overview');
    const date = document.getElementById('modal-date');

    const bgUrl = IMG_BASE_URL + (movie.backdrop_path || movie.poster_path);
    if (banner) banner.style.backgroundImage = `url('${bgUrl}')`;
    if (title) title.innerText = movie.title || movie.name || "Unknown";
    if (overview) overview.innerText = movie.overview || "No specific overview.";

    if (date) {
        date.innerText = (movie.release_date || movie.first_air_date || "").substring(0, 4);
    }

    // Attach Listeners to new buttons
    const playBtn = document.getElementById('modal-play-btn');
    const addBtn = document.getElementById('modal-add-btn');
    const favBtn = document.getElementById('modal-fav-btn');

    const handleInteraction = (e) => {
        e.stopPropagation();
        if (!checkLogin()) {
            window.location.href = 'login.html';
        }
    };

    if (playBtn) playBtn.onclick = handleInteraction;
    if (addBtn) addBtn.onclick = handleInteraction;
    if (favBtn) favBtn.onclick = handleInteraction;

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeModal() {
    const modal = document.getElementById('movie-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

// --- Auth Simulation ---

function checkLogin() {
    return false; // Always simulate logged out
}

function showLoginToast() {
    window.location.href = 'login.html';
}

init();