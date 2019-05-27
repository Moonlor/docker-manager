import request from '@/utils/request';
import { DOMAIN } from '@/utils/constants';

export async function getAllContainers(params) {
  return request(`${DOMAIN}/api/container/all`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}