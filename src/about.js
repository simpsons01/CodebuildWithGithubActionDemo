import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is about page")
const subTitle = createDomText("h2", "this is about page subTitle")
const description = createDomText("p", "this is about page description, and some text")
const footer = createDomText("p", "this is about page footer text")

const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(subTitle)
app.appendChild(description)
app.appendChild(footer)
