const regSpace = /\s+/

export default class Search {
  constructor(view, api) {
    this.view = view
    this.api = api

    this.view.searchInput.addEventListener(
      "keyup",
      this.view.debounce(this.searchRepos.bind(this))
    )
  }
  searchRepos() {
    const inputValue = this.view.searchInput.value
    if (inputValue) {
    !regSpace.test(inputValue) &&  this.api.loadRepos(inputValue).then((res) => {
        if (res.ok)
          res
            .json()
            .then((data) => {
              data.items.forEach((el) => this.view.createRepos(el))
            })
            .catch((error) => {
              console.error(error.message)
            })
      })
    } else {
      this.view.userListSuggest.innerHTML = ""
    }
  }
}
