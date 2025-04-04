import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.resolve(process.cwd(), 'src/infra/database-code.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) throw err

    console.log('database conectado!')
});


export default db;