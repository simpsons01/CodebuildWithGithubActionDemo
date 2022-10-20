import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is home page")
const app = document.querySelector("#app")
app.appendChild(title)