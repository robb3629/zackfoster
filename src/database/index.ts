import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";

// Create/connect to database with busyTimeout to handle locks
const db: DatabaseType = new Database("database.sqlite", {
    verbose: console.log,
});

db.exec(`
  CREATE TABLE IF NOT EXISTS servers (
    serverId TEXT PRIMARY KEY,
    zackChannel TEXT,
    love TEXT
  )
`);

function setChannel(zackChannel: string, love: string) {
    const stmt = db.prepare(
        "INSERT INTO users (zackChannel, love) VALUES (?, ?)"
    );
    return stmt.run(zackChannel, love);
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

function getChannels() {
    try {
        const stmt = db.prepare(
            "SELECT DISTINCT zackChannel FROM servers WHERE zackChannel IS NOT NULL"
        );
        return stmt.all().map((row) => row.zackChannel);
    } catch (error) {
        console.error("Error getting channels:", error);
        return [];
    }
}

// Close database when done
// db.close();

export { db, addUser, getServerId, getChannels, addServer };
