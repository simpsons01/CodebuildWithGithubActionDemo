import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is about page")
const description1 = createDomText("p", "this is about page description 1")
const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(description1)
