import { get } from './client';
import type { ProductsQuery, ProductsResponse } from './types';

export async function fetchProducts(params: ProductsQuery) {
  return await get<ProductsResponse>(
    '/api/products',
    params as Record<string, any>
  );
}

export async function fetchProductsCount(opts: { active?: boolean } = {}) {
  const json = await get<ProductsResponse>('/api/products', {
    active: opts.active,
  });
  return json.pagination.totalItems;
}

export async function fetchRecentActiveProducts(limit = 5) {
  const json = await get<ProductsResponse>('/api/products', {
    active: true,
    sort: 'registeredAt',
    order: 'desc',
    page: 1,
    limit,
  });
  return json.data;
}
