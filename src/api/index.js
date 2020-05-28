import axios from "axios";

// const host = "http://localhost:8080";
const host = "/api";

function listGallery() {
  const url = `${host}/galleries`;
  return axios.get(url);
}

function createGallery({ name }) {
  const url = `${host}/galleries`;
  return axios.post(url, { name });
}

function deleteGallery(id) {
  const url = `${host}/galleries/${id}`;
  return axios.delete(url);
}

function updateGalleryName({ id, name }) {
  const url = `${host}/galleries/${id}/names`;
  return axios.patch(url, { name });
}

function updateGalleryStatus({ id, status }) {
  const url = `${host}/galleries/${id}/status`;
  return axios.patch(url, { status });
}

function getGallery(id) {
  const url = `${host}/galleries/${id}`;
  return axios.get(url);
}

export default {
  listGallery,
  createGallery,
  deleteGallery,
  updateGalleryName,
  updateGalleryStatus,
  getGallery,
};
