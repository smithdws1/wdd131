document.addEventListener('DOMContentLoaded', () => {
    setYearAndLastModified();
    checkServerStatus();
    setupClickableTiles();
    setupLazyLoading();
});

function setYearAndLastModified() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');

    if (yearElement) yearElement.textContent = new Date().getFullYear();
    if (lastModifiedElement) lastModifiedElement.textContent = document.lastModified;
}

async function checkServerStatus() {
    const statusTile = document.getElementById('server-status-tile');
    if (!statusTile) return;

    try {
        const response = await fetch('http://192.168.10.9:51000/api/server-status');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        statusTile.style.backgroundColor = data.online ? 'green' : 'red';
        statusTile.textContent = `Server Status: ${data.online ? 'Online' : 'Offline'}`;
    } catch (error) {
        statusTile.style.backgroundColor = 'red';
        statusTile.textContent = 'Server Status: Error';
    }
}

function setupClickableTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        const selects = tile.querySelectorAll('select');

        let isTileClickable = false;

        tile.addEventListener('click', () => {
            if (isTileClickable) {
                const tileTitle = tile.querySelector('h2').textContent;
                alert(`Action applied for ${tileTitle}`);
                isTileClickable = false;
                tile.classList.remove('clickable');
            }
        });

        selects.forEach(select => {
            select.addEventListener('change', () => {
                if (select.value !== '') {
                    isTileClickable = true;
                    tile.classList.add('clickable');
                } else {
                    isTileClickable = false;
                    tile.classList.remove('clickable');
                }
            });
        });
    });
}


function setupLazyLoading() {
    const lazyBackgrounds = document.querySelectorAll('.lazy-background');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tile = entry.target;
                const bgImage = tile.getAttribute('data-bg');
                if (bgImage) {
                    tile.style.backgroundImage = `url(${bgImage})`;
                    observer.unobserve(tile);
                }
            }
        });
    });

    lazyBackgrounds.forEach(tile => observer.observe(tile));
}