import { get } from './client';
import type { UsersResponse } from './types';

export async function fetchUsersCount() {
  const json = await get<UsersResponse>('/api/users');
  return json.total;
}
