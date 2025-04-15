import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";

// Create/connect to database with explicit timeout settings to handle locks
const db: DatabaseType = new Database("database.sqlite", {
    verbose: console.log,
    timeout: 5000, // 5 second timeout for busy state
});

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS servers (
    serverId TEXT PRIMARY KEY,
    zackChannel TEXT,
    love TEXT
  )
`);

async function addChannel(zackChannel: string, serverId: string) {
    try {
        // Simpler approach using a single UPSERT statement
        const stmt = db.prepare(`
            INSERT INTO servers (serverId, zackChannel)
            VALUES (?, ?)
            ON CONFLICT(serverId) 
            DO UPDATE SET zackChannel = ?
        `);
        
        return stmt.run(serverId, zackChannel, zackChannel);
    } catch (error) {
        console.error(`Error updating channel for server ${serverId}:`, error);
        throw error;
    }
}

function addServer(serverId: string, love: string) {
    try {
        const stmt = db.prepare(
            "INSERT OR IGNORE INTO servers (serverId, love) VALUES (?, ?)"
        );
        const result = stmt.run(serverId, love);
        return result;
    } catch (error) {
        console.error(`Error adding server ${serverId}:`, error);
        throw error;
    }
}

function getServerId(serverId: string) {
    try {
        const stmt = db.prepare("SELECT * FROM servers WHERE serverId = ?");
        const returnId = stmt.get(serverId);
        return returnId;
    } catch (error) {
        console.error(`Error getting server ${serverId}:`, error);
        return null;
    }
}

function getChannels(serverId: string) {
    try {
        const stmt = db.prepare(
            "SELECT zackChannel FROM servers WHERE serverId = ?"
        );
        const result = stmt.get(serverId) as { zackChannel: string | null } | undefined;
        return result ? result.zackChannel : null;
    } catch (error) {
        console.error(`Error getting channels for server ${serverId}:`, error);
        return null;
    }
}

// Add a function to properly close the database when needed
function closeDatabase() {
    db.close();
}

export { db, addChannel, getServerId, getChannels, addServer, closeDatabase };
