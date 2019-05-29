import request from '@/utils/request';
import { DOMAIN } from '@/utils/constants';

export async function getAllContainers(params) {
  return request(`${DOMAIN}/api/container/all_by_id`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function AddServer(params) {
  return request(`${DOMAIN}/api/server/create`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function DeleteServer(params) {
  return request(`${DOMAIN}/api/server/delete`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function StopContainer(params) {
  return request(`${DOMAIN}/api/container/stop`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function RemoveContainer(params) {
  return request(`${DOMAIN}/api/container/remove`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function RunContainer(params) {
  return request(`${DOMAIN}/api/container/run`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}