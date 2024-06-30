import Search from "./search.js"
import View from "./app.js"
import Api from "./api.js"


const api = new Api()

new Search(new View(api), api)

