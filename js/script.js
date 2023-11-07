async function addFooter() {
    const resp = await fetch("footer.html");
    const html = await resp.text();
    document.body.insertAdjacentHTML("beforeend", html);
}   
addFooter()

async function addNav() {
    let userRole = localStorage.getItem("WT_ROLE");
    if (userRole == "admin") {
        const resp = await fetch("nav-admin.html");
        const html = await resp.text();
        document.body.insertAdjacentHTML("afterbegin", html);

        const currentPage = location.pathname.split("/").slice(-1)[0].replace(".html", "");

        const pageToLinkMap = {
        "admin-home": "home-link",
        "boeken-overzicht": "book-link",
        "boek-pagina": "book-link",
        "admin-statistieken": "stats-link",
        "admin-book-management": "manage-link",
        "admin-book-copy-management": "manage-link",
        "admin-append-book": "manage-link",
        "admin-account": "account-link",
        "favorites": "fav-link",
        "admin-users": "users-link",
        };

        const linkId = pageToLinkMap[currentPage];
        if (linkId) {
            const link = document.getElementById(linkId);
            if (link) {
                link.classList.add("active");
            }
        }
    } else if (userRole == "user") {
        const resp = await fetch("nav-user.html");
        const html = await resp.text();
        document.body.insertAdjacentHTML("afterbegin", html);

        const currentPage = location.pathname.split("/").slice(-1)[0].replace(".html", "");

        const pageToLinkMap = {
        "user-home": "home-link",
        "boeken-overzicht": "book-link",
        "boek-pagina": "book-link",
        "user-account": "account-link",
        "favorites": "fav-link",
        };

        const linkId = pageToLinkMap[currentPage];
        if (linkId) {
            const link = document.getElementById(linkId);
            if (link) {
                link.classList.add("active");
            }
        }

    } else if (userRole == "front-desk") {
        const resp = await fetch("nav-frdesk.html");
        const html = await resp.text();
        document.body.insertAdjacentHTML("afterbegin", html);

        const currentPage = location.pathname.split("/").slice(-1)[0].replace(".html", "");

        const pageToLinkMap = {
        "frdesk-home": "home-link",
        "boeken-overzicht": "book-link",
        "boek-pagina": "book-link",
        "frdesk-account": "account-link",
        "favorites": "fav-link",
        };

        const linkId = pageToLinkMap[currentPage];
        if (linkId) {
            const link = document.getElementById(linkId);
            if (link) {
                link.classList.add("active");
            }
        }
    }
        
}
addNav()

function hasRole(role) {
    let loggedInRole = localStorage.getItem('WT_ROLE');
    
    return !!loggedInRole && loggedInRole == role;
}

function isAdmin() {
    return hasRole('admin');
}

function isFrontdesk() {
    return hasRole('front-desk');
}
