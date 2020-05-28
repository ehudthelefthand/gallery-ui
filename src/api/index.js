import axios from "axios";

// const host = "http://localhost:8080";
const host = "/api";

export function listGallery() {
  const url = `${host}/galleries`;
  return axios.get(url);
}

export function createGallery({ name }) {
  const url = `${host}/galleries`;
  return axios.post(url, { name });
}

export function deleteGallery(id) {
  const url = `${host}/galleries/${id}`;
  return axios.delete(url);
}
