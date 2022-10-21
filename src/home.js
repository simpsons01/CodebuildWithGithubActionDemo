import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is home page")
const description1 = createDomText("p", "this is home page description 1")
const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(description1)