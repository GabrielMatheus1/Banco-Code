import { 
    searchAllProduct,
    createNewProduct
 } from '../repositories/product.repositores.js'


// busca de produtos / produto
const listProducts = async(fastify) => {
    fastify.route({
        method: 'GET',
        url: '/products',
        schema: { },
        handler: async function (req, reply) { // Changed 'request' to 'req' for consistency
            
                try {          
    
                    let listProdutos = {produtos: []}
    
    
                    const prodReceived = await searchAllProduct();
                    listProdutos.produtos.push(...prodReceived);
                    reply.send(listProdutos);


                } catch(err) {
                    reply.send({error: 'Internal Server Error'});
                    // console.log('[ERROR] can not execute request as error', err);
                }
           }
      })
}


// insert new product
const insertProduct = async(fastify) => {
    fastify.route({
        url: '/product',
        method: 'POST',
        schema: {},
        handler: async function(req, reply) {
            
            try {
        
                if (!req.body || Object.keys(req.body).length === 0) {
                    reply.code(400).send({ error: 'Invalid request body' });
                    return;
                }

                const prodInserted = await createNewProduct(req.body);
                if (prodInserted) {
                    reply.send('cadastrado com sucesso ' + prodInserted.id );
                } else {
                    reply.send({ error: 'Failed to insert product' });
                }

            } catch(err) {
                // console.log('[ERROR] can not execute request as error', err);
                reply.send({ error: 'Erro ao cadastrar!' });
            }
        }
    });
}

export { listProducts, insertProduct }