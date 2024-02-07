import { $authHost } from 'src/http/index';
import { Category, Brand, ResponseProductsData, Product } from 'src/serverTypes';

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await $authHost.get('api/category');
  return data;
};

export const fetchBrands = async (): Promise<Brand[]> => {
  const { data } = await $authHost.get('api/brand');
  return data;
};

export const fetchProducts = async (
  categoryId: number,
  brandId: number,
  page: number,
  limit = 3
): Promise<ResponseProductsData> => {
  const { data } = await $authHost.get('api/product', {
    params: {
      categoryId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneProduct = async (id: number): Promise<Product> => {
  const { data } = await $authHost.get('api/product/' + id);
  return data;
};

export const createBrand = async (brand: Pick<Brand, 'name'>): Promise<Brand> => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};

export const createCategory = async (category: Pick<Category, 'name'>): Promise<Category> => {
  const { data } = await $authHost.post('api/category', category);
  return data;
};

export const createProduct = async (product: FormData): Promise<Product> => {
  const { data } = await $authHost.post('api/product', product);
  return data;
};
