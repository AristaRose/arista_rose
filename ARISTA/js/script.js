// Toggle class active
const navbarNav = document.querySelector('#menunav ul');

// ketika hamburger menu di klik
document.querySelector('#hamburger-menu'). onclick = () => {
    navbarNav.classList.toggle('active');
};

// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');


document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
})