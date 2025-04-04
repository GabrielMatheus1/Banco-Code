import db  from "../infra/conect.js"; 

export const createNewProduct = (produto) => {

    return new Promise((resolve, reject) => {
        
        let params = [produto.produto, produto.valor, produto.img_url, produto.descricao, produto.categoria];

        let sql = `INSERT INTO products (produto, valor, img_url, categoria, descricao, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?);`;

        
        let createdAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        let updatedAt = createdAt;

        params.push(createdAt, updatedAt);

                    db.run(sql, params , (err) => {
                        if (err) {
                            // console.log(err.message);
                            reject(err);
                        }

                        db.get('SELECT last_insert_rowid() as id', (err, row) => {
                            if (err) {
                                // console.log(err.message);
                                reject(err);
                            }

                            // console.log(`produto criado !!, com a ID: ${row.id}` );
                            resolve({"id": row.id, ...produto});
                        });
                });
         })
} 


export const searchAllProduct = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM products';

        db.all(sql, [], (err, row) =>{
            if (err) {
                // console.log(err.message);
                reject(err);
            }
            // console.log(row);
            resolve(row);
        })
    })
}


export const oneProductByID = (idProduct) => {
    return new Promise((resolve, reject) =>{
        
        let sql = `SELECT * FROM produtos WHERE id=${idProduct}`;
        
        db.get(sql, [], (err, row) =>{

            if (err) {
                console.log(err.message);
                reject(err);   
               }
       
               console.log(row);
               resolve(row);
        })
    }) 
}

export const updateProduct = (produto) => {
    return new Promise((resolve, reject) => {

        let sql = `UPDATE produtos SET produto=?, valor=?, img_url=?, descricao=?, categoria=? WHERE id=${produto.id}`;

        let params = [produto.produto, produto.valor, produto.img_url, produto.descricao, produto.categoria];

        db.run(sql, params, function(err) {

            if (err) {
                console.log(err.message);
                reject(err);
            }            

            if (this.changes === 0) {
                console.log('Produto não encontrado !!!');
                reject({message: 'produto não encontrado'});
            }

            console.log(`Produto com o id ${produto.id} foi alterado com sucesso!!!`);
            resolve(true);

        })


    })
}

export const deleteProduto = (produto) => {
    return new Promise((resolve, reject) => {

        let sql = `DELETE FROM produtos WHERE id=${produto.id}`;

        db.run(sql, function(err) {
            if (err) {
                console.log(err.message);
                reject(err);
            }

            if (this.changes === 0) {
                console.log('Produto não encontrado !!!');
                reject({message: 'produto não encontrado'});
            }

            console.log(`Produto com o id ${produto.id} foi deletado com sucesso!!!`);
            resolve(true);
        });

    });
}