import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is about page")
const subTitle = createDomText("h2", "this is about page subTitle")

const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(subTitle)
