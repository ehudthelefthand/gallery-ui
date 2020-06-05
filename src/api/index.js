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

const host = "http://localhost:8080";
// const host = "/api";
// console.log(process.env.NODE_ENV);
// console.log(process.env.REACT_APP_API_URL);
// const host = process.env.REACT_APP_API_URL;
// if (host === "" || host === undefined) {
//   throw new Error("API endpoint is not assign");
// }

function listPublishGallery() {
  const url = `${host}/galleries`;
  return axios.get(url);
}

function listGallery() {
  const url = `${host}/admin/galleries`;
  return axios.get(url);
}

function createGallery({ name }) {
  const url = `${host}/admin/galleries`;
  return axios.post(url, { name });
}

function deleteGallery(id) {
  const url = `${host}/admin/galleries/${id}`;
  return axios.delete(url);
}

function updateGalleryName({ id, name }) {
  const url = `${host}/admin/galleries/${id}/names`;
  return axios.patch(url, { name });
}

function updateGalleryStatus({ id, is_publish }) {
  const url = `${host}/admin/galleries/${id}/publishes`;
  return axios.patch(url, { is_publish });
}

function getGallery(id) {
  const url = `${host}/admin/galleries/${id}`;
  return axios.get(url);
}

function listGalleryImage(id) {
  const url = `${host}/admin/galleries/${id}/images`;
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

function logout() {
  const url = `${host}/logout`;
  return axios.post(url);
}

function upload(id, formData) {
  const url = `${host}/admin/galleries/${id}/images`;
  return axios.post(url, formData);
}

function deleteImage(id) {
  const url = `${host}/admin/images/${id}`;
  return axios.delete(url);
}

export default {
  host,
  listPublishGallery,
  listGallery,
  createGallery,
  deleteGallery,
  updateGalleryName,
  updateGalleryStatus,
  getGallery,
  listGalleryImage,
  login,
  signup,
  logout,
  upload,
  deleteImage,
};
