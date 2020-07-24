/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, unitPrice, category } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const order = await createProduct.execute({
      name,
      description,
      unitPrice,
      category,
    });

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id: Number(id) });

    return response.json({ message: 'Delete has been successful.' });
  }
}

export default ProductsController;
