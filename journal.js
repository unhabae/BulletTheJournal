const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// U K E D A G E R 
// Henter containeren
const weekElm = document.getElementById("weekDiv")

// Ukedagene: 
for (i = 0; i<7;i++) {
    const div = document.createElement("div")
    div.innerHTML = weekdays[ (i+1)%7 ]     //går det over 7, henter 0
    weekElm.appendChild(div)
    div.setAttribute('id',(i+1)%7);
}

// Finner dagen idag
const date = new Date()
console.log( weekdays[date.getDay()])
const today = document.getElementById(date.getDay())
today.style.backgroundColor = "#7f8da1"
today.style.color = "white"

