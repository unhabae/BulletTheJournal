const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
// Bruker for å lagre i localstorage:
const date = new Date()
const formattedDate = date.toISOString().slice(0, 10)

// U K E D A G E R 
// Henter containeren
const weekElm = document.getElementById("weekDiv")

// Ukedagene: 
for (let i = 0; i < 14; i++) {
    const day = new Date()
    day.setDate(day.getDate() - (6 + day.getDay() - i))

    const div = document.createElement("div")
    div.innerHTML = weekdays[day.getDay()] + " - " + day.getDate() + "/" + (day.getMonth() + 1)
    weekElm.appendChild(div)

    // Formater datoen som 'YYYY-MM-DD'
    const formattedDate = day.toISOString().slice(0, 10)
    div.setAttribute("id", "day" + formattedDate)
}

// Finner dagen idag, skal fargelegge den
function colorToday() {
    console.log(weekdays[date.getDay()])
    const todayDiv = document.getElementById("day" + formattedDate)
    todayDiv.style.backgroundColor = "#7f8da1"
    todayDiv.style.color = "white"
}


// W R I T E
let questions = ["What are you grateful for today?", "What did you learn today?", "Did you accomplish everything you wanted to today?", "What is something that distracted you or slowed your progress today?", "Did you take enough breaks today?", "What was the highlight of your day?", "Did you work on something that you're passionate about today?"]

const displayQuestion = document.getElementById("displayQuestion")

function generateQuestions() {
    displayQuestion.innerHTML = questions[Math.floor(Math.random() * 7)]
}


// M O O D
function activateMood(x) {
    // MÅ fjerne klassen fra alle andre ikoner
    const moodIcons = document.querySelectorAll("#mood i")
    moodIcons.forEach(function (icon) {
        if (icon !== x) {
            icon.classList.remove("fa-solid");
        }
    })
    x.classList.toggle("fa-solid")
}


// S U B M I T
const input = document.getElementById("dayInput")

function gatherInput() {
    const inputValue = input.value
    const moodActivated = document.querySelector(".fa-solid")
    const moodID = moodActivated.getAttribute("id")
    const data = { "text": inputValue, "mood": moodID }
    console.log(data)
    const jsonString = JSON.stringify(data)
    console.log(jsonString)
    localStorage.setItem("day" + formattedDate, jsonString)
}


// S H O W  D A T A
function getLogContent() {
    // iterate localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const htmlElm = document.getElementById(key)
        htmlElm.addEventListener("mouseover", () => {
            htmlElm.style.borderWidth = "3px"
        })
        htmlElm.addEventListener("mouseout", () => {
            htmlElm.style.borderWidth = ""; // Tilbakestiller borderWidth til standardverdien
        });
        htmlElm.innerHTML += " *"
        if (htmlElm) {
            console.log(htmlElm)
            // Funksjon som viser data når du trykker på diven: 
            htmlElm.addEventListener("click", () => {
                // Henter JSON-dataene fra Local Storage
                const value = localStorage.getItem(key);
                // Konverter tekststrengen til et JSON
                const storedJsonData = JSON.parse(value)
                console.log('Key: ' + key + ', Text: ' + storedJsonData.text + 'Mood: ' + storedJsonData.mood);

                // DISPLAY WINDOW 
                const displayWindow = document.createElement("div")
                displayWindow.setAttribute("id", "displayWindow")

                // legger til tittel
                const title = document.createElement("h2")
                title.innerHTML = "Your journal for " + key + ":"
                displayWindow.appendChild(title)

                // legger til input
                const divInput = document.createElement("p")
                divInput.innerHTML = "What you wrote: " + storedJsonData.text
                displayWindow.appendChild(divInput)

                // legger til mood
                const divMood = document.createElement("p")
                divMood.innerHTML = "Your mood this day: " + storedJsonData.mood
                displayWindow.appendChild(divMood)

                // legger til close-button
                const close = document.createElement("button")
                close.innerHTML = " Close window "
                close.addEventListener("click", () => {
                    displayWindow.style.display = 'none'
                })
                displayWindow.appendChild(close)

                weekElm.appendChild(displayWindow)


            })
        }

    }
}


colorToday()
getLogContent()

