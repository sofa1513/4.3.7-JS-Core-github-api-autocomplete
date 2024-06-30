const URL = "https://api.github.com/"
const REPOS_PER_PAGE = 5
export default class Api {
  async loadRepos(inputValue) {
    return await fetch(
      `${URL}search/repositories?q=${inputValue}&per_page=${REPOS_PER_PAGE}`
    )
  }
}
