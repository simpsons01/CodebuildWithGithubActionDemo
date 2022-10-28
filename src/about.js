import { createDomText } from "./utils/dom"
const title = createDomText("h1", "this is about page")
const subTitle = createDomText("h2", "this is about page subTitle")
const description1 = createDomText("p", "this is about page description1")
const description2 = createDomText("p", "this is about page description2")

const app = document.querySelector("#app")
app.appendChild(title)
app.appendChild(subTitle)
app.appendChild(description1)
app.appendChild(description2)

console.log('123')
