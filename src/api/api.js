import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.github.com/',
});

export const issueAPI = {
  getIssue(organization, repository, id) {
    return instance
      .get(`https://api.github.com/repos/${organization}/${repository}/issues/${id}`)
      .then(({data}) => {
        return data;
      })
      .catch(err => {
        console.error(err)
      });
  }
};

export const issuesAPI = {
  getCountIssues(organization, repository) {
    return instance
      .get(`/search/issues?q=repo:${organization}/${repository}+type:issue&per_page=1`)
      .then(({data}) => {
        return data;
      })
      .catch(err => {
        console.error(err)
      });
  },
  getIssues(organization, repository, page) {
    return instance
      .get(`/repos/${organization}/${repository}/issues?state=all&page=${page}&per_page=30`)
      .then(({data}) => {
        return data;
      })
      .catch(err => {
        console.error(err)
      });
  }
};
