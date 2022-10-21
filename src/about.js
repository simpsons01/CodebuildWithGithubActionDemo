import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is about page")
const description1 = createDomText("p", "this is about page description 1")
const description2 = createDomText("p", "this is about page description 2")
const description3 = createDomText("p", "this is about page description 2")
const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(description1)
app.appendChild(description2)
