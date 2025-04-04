import {
    searchAllUsers,
    searchUserByCPF,
    insertNewUser,
    deleteUserByCPF,
    updateUserByCPF
} from "../repositories/users.repositores.js";


// busca todos os usuarios no banco de dados  ok //
const listUsers = async(fastify) => {
    fastify.route({
        method: 'GET',
        url: '/users',
        schema: { },
        handler: async function (req, reply) { // Changed 'request' to 'req' for consistency
            
                try {          
    
                    let listUsers = {users: []}
    
                    const userReceived = await searchAllUsers();
                    listUsers.users.push(...userReceived);
                    reply.send(listUsers);
    
                } catch(err) {
                    reply.send({error: 'Internal Server Error'});
                    // console.log('[ERROR] can not execute request as error', err);
                }
           }
      })
}

// busca um usuario pelo cpf  ok //
const searchUser = async(fastify) => {
    fastify.route({
        url: '/user/:cpf',
        method: 'GET',
        schema: {},
        handler: async function(req, reply) {
        
            try {

                const userReceived = await searchUserByCPF(req.params.cpf);
                if (userReceived) {
                    reply.send(userReceived);
                } else {
                    reply.send({ error: 'User not found' });
                }

            } catch(err) {
                reply.send({ error: 'Internal Server Error' });
                // console.log('[ERROR] can not execute request as error', err);
            }
         }
    });
}

// insere um novo usuario no banco de dados  ok  //
const insertUser = async(fastify) => {
    fastify.route({
        url: '/user',
        method: 'POST',
        schema: {},
        handler: async function(req, reply) {
            
            try {
                // Ensure req.body is parsed correctly
                if (!req.body || Object.keys(req.body).length === 0) {
                    reply.code(400).send({ error: 'Invalid request body' });
                    return;
                }

                const userInserted = await insertNewUser(req.body);
                if (userInserted) {
                    reply.send('cadastrado com sucesso ' + userInserted.id );
                } else {
                    reply.send({ error: 'Failed to insert user' });
                }

            } catch(err) {
                // console.log('[ERROR] can not execute request as error', err);
                reply.send({ error: 'Erro ao cadastrar!' });
            }
        }
    });
}

// deleta um usuario pelo cpf  //
const deleteUser = async(fastify) => {
    fastify.route({
        url: '/user/:cpf',
        method: 'DELETE',
        schema: {},
        handler: async function(req, reply) {
            
            try {

                // console.log('Received request /users/:cpf');
                const userDeleted = await deleteUserByCPF(req.params.cpf);
                
                if (userDeleted) {
                    reply.send({ message: `Usuario com o cpf: ${req.params.cpf} foi deletado com suscesso!!` });
                } else {
                    reply.send({ error: 'User não encontrado!' });
                }

            } catch(err) {
                // console.log('[ERROR] can not execute request as error', err);
                reply.send({ error: 'User não encontrado!' });
            }
        }
    });
}


// atualiza um usuario pelo cpf  //
const updateUser = async(fastify) => {
    fastify.route({
        url: '/user/:cpf',
        method: 'PUT',
        schema: {},
        handler: async function(req, reply) {

            try {

                const userReceived = await updateUserByCPF(req.body);
                reply.send('Dados alterado com sucesso!!');

            } catch(err) {
                // console.log('[ERROR] can not execute request as error', err)
                reply.send({ error: 'Usuario não encontrado' });
            }
        }
    });
}


export { listUsers, searchUser, insertUser, deleteUser, updateUser };
