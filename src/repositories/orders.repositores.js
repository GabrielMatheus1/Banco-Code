import db from "../infra/conect.js";


  // add   ok
export const createNewOrder = (orderList) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO orders (user_id, produtos_id, valor_total, status)
                    VALUES (?, ?, ?, ?)`;

        let params = [orderList.user_id, orderList.produtos_id, orderList.valor_total, orderList.status];

        db.run(sql, params, (err) =>{
            if (err) {
                console.log(err.message);
                reject(err);
            }

        db.get('SELECT last_insert_rowid() as id', (err, row) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }

            console.log(`ordem criada  com sucesso !!, com a ID: ${row.id}` );
            resolve({"id": row.id, ...orderList});
        });

        })
    })
}


  // buscar todas ordens   ok
export const buscarTodasOrdens = () => {

    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM orders';

        db.all(sql, [], (err, row) =>{
            if (err) {
                console.log(err.message);
                reject(err);
            }
            console.log(row);
            resolve(row);
        });
    });

}


// buscar por id do pedido ok
export const buscarOrdensPorId = (order) => {
    
    return new Promise((resolve, reject) =>{
        
        let sql = `SELECT * FROM orders WHERE id = ${order.id}`;
        
        db.get(sql, [], (err, row) =>{

            if (err) {
                console.log(err.message);
                reject(err);   
               }
       
               console.log(row);
               resolve(row);
        });
    });

}


// update adm   ok 
export const admUpdateStatusCompra = (user) => {
    
    return new Promise((resolve, reject) =>{

        let sql = `UPDATE orders SET status=? WHERE id=${user.user_id}`;

        let params = [user.status];

        db.run(sql, params, function(err){
            if(err) {
                console.log(err.message);
                reject(err);
            }

            if (this.changes === 0) {
                console.log('ordem não encontrada');
                reject({message: 'ordem n achada'});
            }

            console.log('status atualizado');
            resolve(true);
        });
    });
}


  // filtro por user
export const buscartodasOrdensPorUser = (user) => {
    
    return new Promise((resolve, reject) =>{

        let sql = `SELECT * FROM orders WHERE user_id = ${user.user_id}`;
        
        db.all(sql, [], (err, rows) => {

            if (err) {
                console.log(err.message);
                reject(err);
            }

            console.log(rows);
            resolve(rows);
        });
    });
}







