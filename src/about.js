const h1 = document.createElement("h1")
h1.textContent = "this is about page"
const p = document.createElement("p")
p.textContent = "this is about page description"
const app = document.querySelector("#app")
app.appendChild(h1)
app.appendChild(p)