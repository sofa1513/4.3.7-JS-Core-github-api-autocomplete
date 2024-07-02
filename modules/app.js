
export default class View {
  constructor(api) {
    this.app = document.getElementById("app");
    this.api = api;

    this.searchLine = this.createElem("div", "search");
    this.searchInput = this.createInput();
    this.searchLine.append(this.searchInput);

    this.main = this.createElem("div", "main");
    this.userListSuggest = this.createElem("ul", "main__userListSuggest");
    this.userListPicked = this.createElem("ul", "main__userListPicked");
    this.main.append(this.userListSuggest, this.userListPicked);

    this.app.append(this.searchLine, this.main);

    this.userListSuggest.addEventListener("click", (e) => {
      let list = document.querySelectorAll(".prev-repo");
      if (list.length >= 5) list.forEach((el) => el.remove());
    });

    this.userListPicked.addEventListener("click", (e) => {
      if (e.target.className === "btn-right") {
        e.target.parentNode.remove();
      }
    });
  }

  createElem(elem, elemClass) {
    const element = document.createElement(elem);
    if (elemClass) {
      element.classList.add(elemClass);
    }
    return element;
  }

  createInput() {
    const input = document.createElement("input");
    input.classList.add("search__input");
    input.setAttribute("required", true);
    input.setAttribute("pattern", "\\S+");
    return input;
  }

  createRepos(data) {
    let x = document.querySelectorAll(".prev-repo");

    if (x.length >= 5) {
      x[x.length - 1].remove();
    }

    const repoElement = this.createElem("li", "prev-repo");
    repoElement.textContent = data.name;
    repoElement.addEventListener("click", (e) => {
      this.makeRepo(data);
      this.searchInput.value = "";
    });
    this.userListSuggest.prepend(repoElement);
  }

  makeRepo(data) {
    const dataElement = this.createElem("li", "main__picked-element");
    dataElement.insertAdjacentHTML('beforeend', `<span> Name: ${data.name}</span>
                             <span> Owner: ${data.owner.login}</span>  
                             <span> Stars: ${data.stargazers_count}</span>`);
    this.userListPicked.append(dataElement);
    this.makeBtn(dataElement);
  }

  makeBtn(parent) {
    const imageCrossLeft = this.createElem("img", "btn-left");
    const imageCrossRight = this.createElem("img", "btn-right");
    imageCrossLeft.src = "./assets/Vector 8.png";
    imageCrossRight.src = "./assets/Vector 7.png";
    parent.append(imageCrossLeft, imageCrossRight);
  }

  debounce(fn) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), 200);
    };
  }
}