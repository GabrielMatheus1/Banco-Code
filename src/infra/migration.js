import db from './conect.js';

db.serialize(() =>{

    // deletar tabela //
    //  db.run(`DROP TABLE users`);
    //  db.run(`DROP TABLE products`);
     
    //  db.run(`DROP TABLE sqlite_stat1`);

    //  db.run(`DROP TABLE sqlite_stat4`);



    //  tabela de users
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                senha TEXT NOT NULL,
                nome TEXT NOT NULL,
                celular TEXT,
                cpf TEXT NOT NULL UNIQUE,
                cep TEXT,
                endereco TEXT,
                numero TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                tip TEXT NOT NULL DEFAULT 'USER',
                update_at DATETIME CURRENT_TIMESTAMP NOT NULL
            );`
    );

    // tabela de produtos //
        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                produto TEXT NOT NULL,
                valor TEXT NOT NULL,
                img_url TEXT,
                categoria TEXT NOT NULL,
                descricao TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME CURRENT_TIMESTAMP NOT NULL
            );`
    );

    // tabela de ordens //
    // db.run(`
    //         CREATE TABLE IF NOT EXISTS orders (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             user_id INTEGER,
    //             produtos_id INTEGER,
    //             valor_total INTEGER,
    //             status TEXT NOT NULL,
    //             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    //             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    //             FOREIGN KEY (user_id) REFERENCES user(id),
    //             FOREIGN KEY (produtos_id) REFERENCES produtos(id)
    //         );
    //     `
    // );
    
});


db.close((err) => {
    if (err) throw err

    console.log("Banco alterado com sucesso!");
    console.log('database desconectado!');
})
