/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['categories'] });
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  async createProduct(
    productData: Partial<Product>,
    categoryIds: string[],
  ): Promise<Product> {
    const categories = await this.categoryRepository.findByIds(categoryIds);

    const newProduct = this.productRepository.create(productData);

    newProduct.categories = categories;

    return this.productRepository.save(newProduct);
  }

  async updateProduct(
    id: string,
    updates: Partial<Product>,
    categoryIds?: string[],
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findOneOrFail({
      where: { id },
      relations: ['categories'],
    });

    if (categoryIds) {
      const updatedCategories =
        await this.categoryRepository.findByIds(categoryIds);
      existingProduct.categories = updatedCategories;
    }

    this.productRepository.merge(existingProduct, updates);

    return this.productRepository.save(existingProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
  }
}
