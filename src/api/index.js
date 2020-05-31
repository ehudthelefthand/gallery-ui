import axios from "axios";
import Storage from "../storage";

axios.interceptors.request.use(
  function (config) {
    const token = Storage.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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

function listGalleryImage(id) {
  const url = `${host}/galleries/${id}/images`;
  return axios.get(url);
}

function login({ email, password }) {
  const url = `${host}/login`;
  return axios.post(url, { email, password });
}

function signup({ email, password }) {
  const url = `${host}/signup`;
  return axios.post(url, { email, password });
}

function getSession() {
  const url = `${host}/sessions`;
  return axios.get(url);
}

function logout() {
  const url = `${host}/logout`;
  return axios.post(url);
}

function upload(id, formData) {
  const url = `/galleries/${id}/images`;
  return axios.post(url, formData);
}

function deleteImage(id) {
  const url = `/images/${id}`;
  return axios.delete(url);
}

export default {
  listGallery,
  createGallery,
  deleteGallery,
  updateGalleryName,
  updateGalleryStatus,
  getGallery,
  listGalleryImage,
  login,
  signup,
  getSession,
  logout,
  upload,
  deleteImage,
};
