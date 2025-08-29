import { get } from './client';
import type { CompaniesResponse } from './types';

export async function fetchCompaniesCount() {
  const json = await get<CompaniesResponse>('/api/companies');
  return json.total;
}
