import * as axios from "axios";
import ActionsIssue from "../redux/actions/issue";
import ActionsIssues from "../redux/actions/issues";

const instance = axios.create({
  baseURL: 'https://api.github.com/',
});

export const issueAPI = {
  getIssue(dispatch, organization, repository, id) {
    instance
      .get(`https://api.github.com/repos/${organization}/${repository}/issues/${id}`)
      .then(({data}) => {
        dispatch(ActionsIssue.setItem(data))
      })
      .catch(err => {
        dispatch(ActionsIssue.isError("Failed to get data..."))
      });
  }
};

export const issuesAPI = {
  getCountIssues(dispatch, organization, repository, page) {
    instance
      .get(`/search/issues?q=repo:${organization}/${repository}+type:issue&per_page=1`)
      .then(({data}) => {
          dispatch(ActionsIssues.setDataIssues({organization, repository, data}))
          if (data.total_count > 0) {
            dispatch(ActionsIssues.fetchItems(organization, repository, page))
          } else {
            dispatch(ActionsIssues.setItems({issues: [], page: null}))
          }
        })
      .catch(err => {
        dispatch(ActionsIssues.isError("Failed to get data..."))
      });
  },
  getIssues(dispatch, organization, repository, page) {
    instance
      .get(`/repos/${organization}/${repository}/issues?state=all&page=${page}&per_page=30`)
      .then(({data}) => {
        dispatch(ActionsIssues.setItems({data, page}))
      })
      .catch(err => {
        console.error(err)
      });
  }
};
