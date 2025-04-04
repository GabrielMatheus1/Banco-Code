import Fastify from 'fastify'

const app = Fastify({
  logger: true
})

import { 
  listUsers,
  insertUser,
  searchUser,
  deleteUser,
  updateUser
} from './src/routes/user.controler.js'

import {
  listProducts,
  insertProduct
} from './src/routes/products.controler.js'

// Declareção de routes para users
app.register(listUsers, { prefix: '/v1' });
app.register(searchUser, { prefix: '/v1' });
app.register(insertUser, { prefix: '/v1' });
app.register(updateUser, { prefix: '/v1' });
app.register(deleteUser, { prefix: '/v1' });

// Declareção de routes para produtos
app.register(listProducts, { prefix: '/v1'});
app.register(insertProduct, { prefix: '/v1'});

// import cors from '@fastify/cors';

// await app.register(cors, {
//   origin: (origin, cb) => {
//     if (!origin || origin === 'http://127.0.0.1:5500') {
//       cb(null, true);
//     } else {
//       cb(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET'],
//   credentials: true,
//   optionsSuccessStatus: 204,
// });

const PORT = 3033;

// Run server!
try {
  await app.listen({ port: PORT })
  app.log.info(`Server listening on ${app.server.address().port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
