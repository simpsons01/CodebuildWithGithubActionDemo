import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is home page")
const subTitle = createDomText("h2", "this is home page subTitle")
const description = createDomText("p", "this is home page description")
const footer = createDomText("p", "this is home page footer text")

const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(description)
app.appendChild(subTitle)