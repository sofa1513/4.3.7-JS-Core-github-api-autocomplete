const regSpace = /\s+/

export default class Search {
  constructor(view, api) {
    this.view = view
    this.api = api

    this.view.searchInput.addEventListener(
      "input",
      this.view.debounce(this.searchRepos.bind(this))
    )
  }
  searchRepos(event) {
    const inputValue = event.target.value.trim(); // Получаем значение из объекта события

    if (this.view.searchInput.checkValidity() && !regSpace.test(inputValue)) {
      this.api.loadRepos(inputValue)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          this.view.userListSuggest.textContent = ''; 
          data.items.forEach((el) => this.view.createRepos(el));
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      this.view.userListSuggest.textContent = ''; 
    }
  }
}

