export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
export type Brand = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
export type Info = {
  id: number;
  number: number;
  title: string;
  productId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  info: Info[];
  brandId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};
export type User = {
  id: number;
  email: string;
  password: string;
  newPassword: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
export type ResponseProductsData = {
  rows: Product[];
  count: number;
};
