document.addEventListener('DOMContentLoaded', () => {
    setYearAndLastModified();
    checkServerStatus();
    setupClickableTiles();
    setupLazyLoading();
});

// Set the year and last modified date in the footer
function setYearAndLastModified() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');

    if (yearElement) yearElement.textContent = new Date().getFullYear();
    if (lastModifiedElement) lastModifiedElement.textContent = document.lastModified;
}

// Check server status and set the background color
async function checkServerStatus() {
    const statusTile = document.getElementById('server-status-tile');
    if (!statusTile) return;

    try {
        const response = await fetch('http://192.168.10.9:3000/api/server-status');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        statusTile.style.backgroundColor = data.online ? 'green' : 'red';
        statusTile.textContent = `Server Status: ${data.online ? 'Online' : 'Offline'}`;
    } catch (error) {
        console.error('Error fetching server status:', error);
        statusTile.style.backgroundColor = 'red';
        statusTile.textContent = 'Server Status: Error';
    }
}

// Make tiles clickable when an option is selected in the picker
function setupClickableTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        const select = tile.querySelector('select');

        select?.addEventListener('change', () => {
            tile.classList.toggle('clickable', select.value !== '');
        });

        tile.addEventListener('click', () => {
            if (tile.classList.contains('clickable')) {
                const tileTitle = tile.querySelector('h2').textContent;
                alert(`Action applied for ${tileTitle}`);
            }
        });
    });
}

// Lazy load background images and <img> elements
document.addEventListener('DOMContentLoaded', () => {
    setupLazyLoading();
});

// Function to lazy load background images
function setupLazyLoading() {
    const lazyBackgrounds = document.querySelectorAll('.lazy-background');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const tile = entry.target;
                const bgImage = tile.getAttribute('img-bg');
                if (bgImage) {
                    tile.style.backgroundImage = `url(${bgImage})`;
                    observer.unobserve(tile);
                }
            }
        });
    });

    lazyBackgrounds.forEach((tile) => observer.observe(tile));
}
