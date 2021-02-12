import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  withCredentials: true
});

export const issuesAPI = {
  getIssues() {
  }
};
