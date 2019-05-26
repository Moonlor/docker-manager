export function getAuthority(token) {
  return localStorage.getItem('docker-mgr-token');
}

export function setAuthority(token) {
  console.log(token);
  return localStorage.setItem('docker-mgr-token', token);
}
