const ukedager = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"]

const date = new Date()
console.log( ukedager[date.getDay()])

const weekElm = document.getElementById("week")

for (i = 0; i<7;i++) {
    const div = document.createElement("div")
    div.innerHTML = ukedager[ (i+1)%7 ]
    weekElm.appendChild(div)
}

