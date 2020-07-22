import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (request, response) => {
  // Listar quantidade de produtos
});

productsRouter.post('/', (request, response) => {
  // Adicionar produto
});

productsRouter.put('/', (request, response) => {
  // Editar produto
});

productsRouter.delete('/', (request, response) => {
  // Remover um produto
});

export default productsRouter;
