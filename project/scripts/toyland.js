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
        const response = await fetch('http://192.168.10.9:51000/api/server-status');
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
        const selects = tile.querySelectorAll('select');

        // Track whether the tile has become clickable
        let isTileClickable = false;

        // Add a click event listener to the tile
        tile.addEventListener('click', () => {
            if (isTileClickable) {
                const tileTitle = tile.querySelector('h2').textContent;
                alert(`Action applied for ${tileTitle}`);
                isTileClickable = false;
                tile.classList.remove('clickable');
            }
        });

        // Listen for changes in the select elements
        selects.forEach(select => {
            select.addEventListener('change', () => {
                if (Array.from(selects).some(sel => sel.value !== '')) {
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
