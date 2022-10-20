import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is about page")
const description = createDomText("p", "this is about page description")
const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(description)