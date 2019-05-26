import request from '@/utils/request';
import { DOMAIN } from '@/utils/constants';

export async function accountLogin(params) {
  return request(`${DOMAIN}/api/Authenticate/login`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}
