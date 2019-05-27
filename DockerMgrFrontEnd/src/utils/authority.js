export function getAuthority() {
  return localStorage.getItem('docker-mgr-token');
}

export function setAuthority(token) {
  return localStorage.setItem('docker-mgr-token', token);
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem('docker-mgr-user'));
}

export function setUserInfo(data) {
  return localStorage.setItem('docker-mgr-user', JSON.stringify(data));
}
