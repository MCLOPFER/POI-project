import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      console.log("Getting all users")
      const res = await axios.get(`${this.poiUrl}/api/users`);
      console.log("Succesfully got all users")
      return res.data;
    } catch (e) {
      console.log(`Failed to get all users, with error: ${e}`)
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async createPoint(point) {
    const res = await axios.post(`${this.poiUrl}/api/points`, point);
    return res.data;
  },

  async deleteAllPoints() {
    const response = await axios.delete(`${this.poiUrl}/api/points`);
    return response.data;
  },

  async deletePoint(id) {
    const response = await axios.delete(`${this.poiUrl}/api/points/${id}`);
    return response;
  },

  async getAllPoints() {
    const res = await axios.get(`${this.poiUrl}/api/points`);
    return res.data;
  },

  async getPoint(id) {
    const res = await axios.get(`${this.poiUrl}/api/points/${id}`);
    return res.data;
  },

  async getAllComments() {
    const res = await axios.get(`${this.poiUrl}/api/comments`);
    return res.data;
  },

  async createComment(id, comment) {
    const res = await axios.post(`${this.poiUrl}/api/points/${id}/comments`, comment);
    return res.data;
  },

  async deleteAllComments() {
    const res = await axios.delete(`${this.poiUrl}/api/comments`);
    return res.data;
  },

  async getComment(id) {
    const res = await axios.get(`${this.poiUrl}/api/comments/${id}`);
    return res.data;
  },

  async deleteComment(id) {
    const res = await axios.delete(`${this.poiUrl}/api/comments/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.poiUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
};