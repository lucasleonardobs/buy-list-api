/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowOneProductService from '@modules/products/services/ShowOneProductService';

class ProductsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const listProductService = container.resolve(ListProductService);

    const { products, count } = await listProductService.execute({
      page: Number(page),
    });

    response.header('X-Total-Count', `${count}`);

    return response.json(products);
  }

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

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOneProduct = container.resolve(ShowOneProductService);

    const product = await showOneProduct.execute({ id: Number(id) });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, unitPrice, category } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const update = await updateProduct.execute({
      id: Number(id),
      name,
      description,
      unitPrice,
      category,
    });

    return response.json(update);
  }
}

export default ProductsController;
