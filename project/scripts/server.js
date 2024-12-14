const express = require('express');
const cors = require('cors');
const { Rcon } = require('rcon-client');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// RCON Configuration
const SERVER_HOST = '192.168.5.2';           // Your Minecraft server's IP/domain
const SERVER_PORT = 25576;                   // RCON port (defined in server.properties)
const RCON_PASSWORD = 'Egbdfgbdfa1!Egbdfgbdfa1!'; // Your simplified RCON password

// Function to connect to RCON and send a command
async function executeRconCommand(command) {
    const rcon = new Rcon({
        host: SERVER_HOST,
        port: SERVER_PORT,
        password: RCON_PASSWORD,
    });

    try {
        await rcon.connect();
        const response = await rcon.send(command);
        await rcon.end();
        return response;
    } catch (error) {
        throw error;
    }
}

// API Route: Check Server Status
app.get('/api/server-status', async (req, res) => {
    try {
        await executeRconCommand('list');
        res.json({ online: true });
    } catch (error) {
        res.json({ online: false });
    }
});

// API Route: Get Player List
app.get('/api/player-list', async (req, res) => {
    try {
        const response = await executeRconCommand('list');
        const match = response.match(/There are \d+\/\d+ players online:(.*)/);
        const players = match && match[1] ? match[1].split(',').map(p => p.trim()) : [];
        res.json({ players });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player list' });
    }
});

// API Route: Apply Enchantment
app.post('/api/apply-enchantment', async (req, res) => {
    const { player, enchantment } = req.body;
    if (!player || !enchantment) {
        return res.status(400).json({ error: 'Player and enchantment are required' });
    }

    try {
        const command = `enchant ${player} ${enchantment}`;
        const response = await executeRconCommand(command);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to apply enchantment' });
    }
});

// Start the server and listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
