import db from '../infra/conect.js';

// busca todos os usuarios no banco de dados  ok //
export const searchAllUsers = () => {

    return new Promise((resolve, reject) => {

        let sql = 'SELECT * FROM users';

        if (!db) {
            reject(new Error('Database connection is not initialized.'));
            return;
        }

        db.all(sql, [], (err, rows) => {

            if (err) {
                reject(new Error(`Database error: ${err.message}`));
            } else if (!rows || rows.length === 0) {
                resolve([]); // Return an empty array if no users are found
            } else {
                resolve(rows);
            }
        });
    }); 
}

// insere um novo usuario no banco de dados  ok //
export const insertNewUser = (user) => {

    return new Promise((resolve, reject) => {
       
        let params = [user.email, user.senha, user.nome, user.celular, user.cpf, user.cep, user.endereco, user.numero];

        let sql = `INSERT INTO users (email, senha, nome, celular, cpf, cep, endereco, numero, tip, created_at, update_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'USER', ?, ?);`;

        let createdAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        let updatedAt = createdAt;

        params.push(createdAt, updatedAt);

        db.run(sql, params, function (err) {
            if (err) {
                // console.error('Erro ao cadastrar o usuário:', err.message);
                reject(new Error('Não foi possível cadastrar o usuário.'));
                return;
            }
            // console.log(`Usuário criado com sucesso! ID: ${this.lastID}`);
            resolve({ id: this.lastID });
        });
    });
}

// busca um usuario pelo cpf  ok //
export const searchUserByCPF = (cpf) => {

    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM users WHERE cpf = ?`;

        db.get(sql, [cpf], (err, row) => {

            if (err) {
                // console.log('Erro ao buscar usuario!');
                reject(err);
            } else if (!row) {
                resolve('Usuario não encontrado');
            } else {
                const filteredRow = {row };
                // console.log('Usuario encontrado: ', filteredRow);
                resolve(filteredRow);
            }
        });
    });
}

// delete futuramento se nescessario  ok //
export const deleteUserByCPF = (cpf) => {

    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM users WHERE cpf = ?`;

        db.run(sql, [cpf], function(err) {

            
            if (err) {
                console.log(err.message);
                reject(err);
            }

            if (this.changes === 0) {
                // console.log('Usuario não encontrado !!!');
                reject({message: 'User não encontrado'});
            }

            // console.log(`Usuario com o CPF ${cpf} foi deletado com sucesso!!!`);
            resolve(true);
        });

    });
}

// atualiza um usuario pelo cpf  ok //
export const updateUserByCPF = (user)=> {

    return new Promise((resolve, reject) =>{

        let sql = `UPDATE users SET email=?, senha=?, nome=?, cpf=?, celular=?, cep=?, endereco=?, numero=?, update_at=? WHERE cpf=?`;

        let data = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

        user.update_at = data;

        let params = [user.email, user.senha, user.nome, user.cpf, user.celular, user.cep, user.endereco, user.numero, user.update_at, user.cpf];

        db.run(sql, params, function(err) {
            if (err) {
            // console.error('Erro ao atualizar o usuário:', err.message);
            reject(new Error('Não foi possível atualizar o usuário.'));
            return;
            }
            // console.log('Usuário atualizado com sucesso.');
            resolve(true);
        });
    });
}