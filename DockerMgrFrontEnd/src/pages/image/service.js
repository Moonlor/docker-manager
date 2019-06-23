import request from '@/utils/request';
import { DOMAIN } from '@/utils/constants';

export async function getImageByIp(params) {
  return request(`${DOMAIN}/api/image/all_by_ip`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function getAllImages(params) {
  return request(`${DOMAIN}/api/image/all_by_id`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function search(params) {
  return request(`${DOMAIN}/api/image/search`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function getImageDetail(params) {
  return request(`${DOMAIN}/api/image/inspect`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}
