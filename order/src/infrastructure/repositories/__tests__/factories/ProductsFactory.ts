import { IProduct } from '@application/dto/IProduct';
import { dataSource } from '../../config';
import { ProductEntity } from '../../entities/ProductEntity';

export const ProductsFactory = {
  create: async (attributes: IProduct) => {
    const entity = dataSource.manager.create(ProductEntity, attributes);
    return await dataSource.manager.save(entity);
  },
};
