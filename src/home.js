import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is home page")
const description = createDomText("p", "this is home page description")
const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(description)