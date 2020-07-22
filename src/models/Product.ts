import { uuid } from 'uuidv4';

class Product {
  id: string;

  name: string;

  description: string;

  unitPrice: number;

  category: string;

  constructor({ name, description, unitPrice, category }: Omit<Product, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.unitPrice = unitPrice;
    this.category = category;
  }
}

export default Product;
