// ============================================
// EFFET QUI SUIT LA SOURIS (commun à toutes les pages)
// ============================================
function initMouseFollower() {
    const mouseFollower = document.querySelector('.mouse-follower');
    if (!mouseFollower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        mouseFollower.style.left = followerX + 'px';
        mouseFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }

    animateFollower();
}

// ============================================
// CODE POUR jeu.html
// ============================================
function initGamePage() {
    // Search script
    const gameSearch = document.getElementById('gameSearch');
    if (gameSearch) {
        gameSearch.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            const games = document.querySelectorAll('#gamesGrid .jeu-thumb-link');
            let visibleCount = 0;
            games.forEach(game => {
                // Get text from both data-title and embedded span (compat)
                const title = (game.getAttribute('data-title') || game.textContent || '').toLowerCase();
                if(title.includes(query)) {
                    game.style.display = '';
                    visibleCount++;
                } else {
                    game.style.display = 'none';
                }
            });
            // Optionally, show/hide coming soon message
            const comingSoonMsg = document.getElementById('comingSoonMsg');
            if (comingSoonMsg) {
                comingSoonMsg.style.display = (visibleCount === 0) ? 'none' : '';
            }
        });
    }

    // Modal for Watch Dogs 2
    const wd2Link = document.getElementById('watchdogs2-link');
    const wd2ModalBg = document.getElementById('watchdogs2-modal-bg');
    if (wd2Link && wd2ModalBg) {
        const closeModalWD2 = () => {
            wd2ModalBg.style.display = 'none';
            document.body.style.overflow = '';
        };
        wd2Link.addEventListener('click', function(e) {
            e.preventDefault();
            wd2ModalBg.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModalWD2);
        }
        wd2ModalBg.addEventListener('click', function(e) {
            if (e.target === wd2ModalBg) closeModalWD2();
        });
        document.addEventListener('keydown', function(e){
            if (wd2ModalBg.style.display === 'flex' && (e.key === 'Escape' || e.keyCode === 27)) {
                closeModalWD2();
            }
        });
    }

    // Modal for Dying Light The Beast
    const dlbLink = document.getElementById('dyinglightthebeast-link');
    const dlbModalBg = document.getElementById('dyinglightthebeast-modal-bg');
    if (dlbLink && dlbModalBg) {
        const closeModalDLB = () => {
            dlbModalBg.style.display = 'none';
            document.body.style.overflow = '';
        };
        dlbLink.addEventListener('click', function(e) {
            e.preventDefault();
            dlbModalBg.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        const modalCloseBtnDLB = document.getElementById('modalCloseBtnDLB');
        if (modalCloseBtnDLB) {
            modalCloseBtnDLB.addEventListener('click', closeModalDLB);
        }
        dlbModalBg.addEventListener('click', function(e) {
            if (e.target === dlbModalBg) closeModalDLB();
        });
        document.addEventListener('keydown', function(e){
            if (dlbModalBg.style.display === 'flex' && (e.key === 'Escape' || e.keyCode === 27)) {
                closeModalDLB();
            }
        });
    }
}

// ============================================
// NOTIFICATION DISCORD SUPPORT (uniquement sur la page d'accueil)
// ============================================
function initDiscordNotification() {
    // Ne s'afficher que sur la page d'accueil
    if (!document.body.classList.contains('page-accueil')) {
        return;
    }
    
    const notification = document.getElementById('discordNotification');
    const closeBtn = document.getElementById('discordNotificationClose');
    
    if (!notification) return;
    
    // Vérifier si l'utilisateur a déjà fermé la notification dans cette session
    const notificationClosed = sessionStorage.getItem('discordNotificationClosed');
    
    if (!notificationClosed) {
        // Afficher la notification après un court délai
        setTimeout(() => {
            notification.classList.add('show');
        }, 500);
    }
    
    // Fermer la notification
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            sessionStorage.setItem('discordNotificationClosed', 'true');
        });
    }
}

// ============================================
// EFFET TYPEWRITER POUR LE TITRE (page d'accueil)
// ============================================
function initTypewriterEffect() {
    // Ne s'afficher que sur la page d'accueil
    if (!document.body.classList.contains('page-accueil')) {
        return;
    }
    
    const titleElement = document.getElementById('animatedTitle');
    if (!titleElement) return;
    
    const text = '807Shop';
    let currentIndex = 0;
    let isDeleting = false;
    let displayText = '';
    
    function typeWriter() {
        if (!isDeleting && currentIndex < text.length) {
            // Écriture
            displayText = text.substring(0, currentIndex + 1);
            titleElement.textContent = displayText;
            currentIndex++;
            setTimeout(typeWriter, 150);
        } else if (isDeleting && currentIndex > 0) {
            // Effacement
            displayText = text.substring(0, currentIndex - 1);
            titleElement.textContent = displayText;
            currentIndex--;
            setTimeout(typeWriter, 100);
        } else if (!isDeleting && currentIndex === text.length) {
            // Pause avant d'effacer
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && currentIndex === 0) {
            // Pause avant de réécrire
            isDeleting = false;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Démarrer l'animation
    typeWriter();
}

// ============================================
// INITIALISATION
// ============================================
// ============================================
// ADMIN PANEL + STORAGE DES JEUX (localStorage)
// ============================================
const ADMIN_CREDENTIALS = {
    username: "Novastream12yy!!!rrr",
    password: "Novastream12y!!!eee"
};

function getCustomGames(){
    try{ return JSON.parse(localStorage.getItem('customGames')||'[]'); }catch(e){ return []; }
}

function saveCustomGames(arr){
    localStorage.setItem('customGames', JSON.stringify(arr||[]));
}

function renderCustomGamesOnJeuPage(){
    if (!document.body.classList.contains('page-jeux')) return;
    const grid = document.getElementById('gamesGrid');
    if(!grid) return;
    const games = getCustomGames();
    games.forEach(g => {
        // create anchor
        const a = document.createElement('a');
        a.className = 'jeu-thumb-link';
        a.href = g.link || '#';
        a.target = '_blank';
        a.rel = 'noopener';
        a.setAttribute('data-title', g.title || '');

        const img = document.createElement('img');
        img.className = 'jeu-thumb-img';
        img.src = g.image || '';
        img.alt = g.title || '';
        img.width = 616; img.height = 353; img.loading = 'lazy';

        const span = document.createElement('span');
        span.className = 'jeu-title-hover';
        span.textContent = g.title || '';

        const badgeWrapper = document.createElement('div');
        badgeWrapper.className = 'badge-mode-wrapper';
        const badge = document.createElement('img');
        badge.className = 'badge-mode' + (g.mode === 'solo' ? ' solo' : '');
        badge.src = g.mode === 'solo' ? 'https://i.imgur.com/AVgyUuC.png' : 'https://i.imgur.com/Yrz60le.png';
        badge.alt = g.mode === 'solo' ? 'Solo' : 'Multiplayer';
        badge.loading = 'lazy';
        badgeWrapper.appendChild(badge);

        a.appendChild(img);
        a.appendChild(span);
        a.appendChild(badgeWrapper);

        grid.appendChild(a);
    });
}

function initAdminPage(){
    if (!document.body.classList.contains('page-admin')) return;

    const loginArea = document.getElementById('loginArea');
    const panelArea = document.getElementById('panelArea');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginMsg = document.getElementById('loginMsg');

    function showPanel(){
        loginArea.style.display = 'none';
        panelArea.style.display = '';
        renderAdminGamesList();
    }

    // state
    const logged = sessionStorage.getItem('adminLogged') === '1';
    if(logged) showPanel();

    if(loginBtn){
        loginBtn.addEventListener('click', function(){
            const user = document.getElementById('adminUser').value || '';
            const pass = document.getElementById('adminPass').value || '';
            if(user === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password){
                sessionStorage.setItem('adminLogged','1');
                showPanel();
            } else {
                loginMsg.textContent = 'Identifiants incorrects.';
            }
        });
    }

    if(logoutBtn){
        logoutBtn.addEventListener('click', function(){
            sessionStorage.removeItem('adminLogged');
            panelArea.style.display = 'none';
            loginArea.style.display = '';
        });
    }

    const addBtn = document.getElementById('addGameBtn');
    if(addBtn){
        addBtn.addEventListener('click', function(){
            const mode = document.querySelector('input[name="mode"]:checked')?.value || 'multi';
            const image = document.getElementById('gameImage').value.trim();
            const title = document.getElementById('gameTitle').value.trim();
            const link = document.getElementById('gameLink').value.trim();
            const addMsg = document.getElementById('addMsg');
            if(!title || !link){ addMsg.textContent = 'Le titre et le lien sont requis.'; return; }
            const games = getCustomGames();
            games.push({mode, image, title, link});
            saveCustomGames(games);
            addMsg.textContent = 'Jeu ajouté.';
            // clear fields
            document.getElementById('gameImage').value = '';
            document.getElementById('gameTitle').value = '';
            document.getElementById('gameLink').value = '';
            renderAdminGamesList();
            // also append to jeux page if open
            renderCustomGamesOnJeuPage();
        });
    }

    function renderAdminGamesList(){
        const wrap = document.getElementById('adminGamesList');
        if(!wrap) return;
        wrap.innerHTML = '';
        const games = getCustomGames();
        if(games.length === 0){ wrap.innerHTML = '<div class="small-muted">Aucun jeu ajouté.</div>'; return; }
        games.forEach((g, idx) => {
            const div = document.createElement('div');
            div.className = 'game-item';
            const img = document.createElement('img'); img.className = 'thumb'; img.src = g.image || ''; img.alt = g.title || '';
            const info = document.createElement('div'); info.style.flex = '1';
            info.innerHTML = '<strong>'+ (g.title||'') +'</strong><div class="small-muted">'+ (g.mode||'') +'</div>';
            const del = document.createElement('button'); del.className = 'admin-btn danger'; del.textContent = 'Supprimer';
            del.addEventListener('click', function(){
                const arr = getCustomGames(); arr.splice(idx,1); saveCustomGames(arr); renderAdminGamesList();
                // re-render jeux page
                const grid = document.getElementById('gamesGrid'); if(grid) { grid.querySelectorAll('.jeu-thumb-link').forEach(n=>{}); grid.innerHTML = grid.innerHTML; }
                // simplest: reload page to update other view if open
            });
            div.appendChild(img); div.appendChild(info); div.appendChild(del);
            wrap.appendChild(div);
        });
    }
}
// Initialiser l'effet de souris sur toutes les pages
initMouseFollower();

// Initialiser la notification Discord sur toutes les pages
initDiscordNotification();

// Initialiser l'effet typewriter sur la page d'accueil
initTypewriterEffect();

// Initialiser les fonctionnalités spécifiques à la page des jeux
if (document.body.classList.contains('page-jeux')) {
    initGamePage();
}

// Admin and custom games
initAdminPage();
renderCustomGamesOnJeuPage();

