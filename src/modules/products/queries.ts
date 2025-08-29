import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProducts, type ProductsQuery } from '../../lib/api';
import type { ProductsResponse } from '../../lib/api';

export function useProducts(params: ProductsQuery) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'list', params] as const,
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
