// Fetch server status and update tile
async function checkServerStatus() {
    const statusTile = document.getElementById('server-status');
    const statusText = document.getElementById('status-text');

    // Simulated server check
    const isOnline = Math.random() > 0.5; // Randomized for demo

    statusTile.style.backgroundColor = isOnline ? 'green' : 'red';
    statusText.textContent = isOnline ? 'Online' : 'Offline';
}

// Start server functionality
async function startServer() {
    alert('Starting the server...');
    // Add RCON or remote command execution logic here
}

// Reboot server functionality
async function rebootServer() {
    alert('Rebooting the server...');
    // Add RCON or remote command execution logic here
}

// Run on page load
checkServerStatus();
