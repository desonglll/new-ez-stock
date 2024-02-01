export function get_headers() {
  const access = localStorage.getItem("access");
  return {
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };
}

export function get_local_access_code() {
  return localStorage.getItem("access");
}
