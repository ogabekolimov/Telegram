const hamburgerButtonElement = document.querySelector("#hamburgerButton")
const menuElement = document.querySelector(".menu")
const rightAppMain = document.querySelector(".right_app")
const shadowELement = document.querySelector(".shadow")

const settingsElement = document.querySelector("#settings")
const settingsModalElement = document.querySelector(".settings__modal")
const closeSettings = document.querySelector("#closeSettings")
const threedotList = document.querySelector(".threedot__list")
const threeDot = document.querySelector("#threedot")

const searchFormElement = document.querySelector(".search__form")
const searchInputElement = document.querySelector(".search__input")
const searchListElement = document.querySelector(".account__list")
const searchNameElement = searchListElement.querySelectorAll(".account__name")

const profileName = document.querySelector(".profile__name")
const profileTime = document.querySelector(".profile__slog")
const rightAppHeader = document.querySelector(".right_app__header")
const profileModal = document.querySelector(".profile__modal")
const chatModal = document.querySelector(".chat__modal")
const userBtn = document.querySelector(".user__btn")
const leftArrowButton = document.querySelector(".left-arrow_button")

let infoNameImg = document.querySelector(".info__name__img")
let infoNameText = document.querySelector(".info__name__text")
let infoNameTime = document.querySelector(".info__name__time")
let mobileNum = document.querySelector(".mobile__num")
let infoName = document.querySelector(".info__name")
let accountSlog = document.querySelector(".account__slog")

let emojiList = document.querySelector(".emoji-list")
let emojiButton = document.querySelector(".emoji__button")
let usersListElement = document.querySelector(".account__list")
let messagesListElement = document.querySelector(".message__list")
let messageTextForm = document.querySelector(".message__form")
let messagesTextInput = document.querySelector(".message__textarea")

let emojies = ["😀", "😋", "😅", "😏", "😀", "😃", "😄", "😁", "😆", "😄", "😅", "😂", "😏", "😞", "😅", "😚", "🙊", "😌", "😀", "😋", "😆", "😐", "😕", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤚", "🖐", "✋"]

let inputValue = ""
let currentChat = 1

leftArrowButton.addEventListener("click", () => {
    rightAppMain.classList.add("chat-hidden")
    shadowELement.classList.add("shadowHidden")
})

shadowELement.addEventListener("click", (evt) => {
    menuElement.classList.add("hidden")
    shadowELement.classList.toggle("shadowHidden")
    settingsModalElement.classList.add("settingsHidden")
    menuElement.style.transform = "translateX(-100%)"
    chatModal.classList.add('chatHidden')
})

hamburgerButtonElement.addEventListener("click", evt => {
    menuElement.classList.remove("hidden")
    shadowELement.classList.remove("shadowHidden")
    menuElement.style.transform = "translateX(0)"
})

settingsElement.addEventListener("click", evt => {
    settingsModalElement.classList.remove("settingsHidden")
    menuElement.classList.add("hidden")
    menuElement.style.transform = "translateX(-100%)"
})

closeSettings.addEventListener("click", evt => {
    settingsModalElement.classList.add("settingsHidden")
    shadowELement.classList.toggle("shadowHidden")
})

threeDot.addEventListener("click", event => {
    threedotList.classList.toggle("threedotHidden")
})

searchInputElement.addEventListener("click", event => {
    event.target.classList.add("border-input")
})

profileModal.addEventListener("click", () => {
    chatModal.classList.remove('chatHidden')
    shadowELement.classList.remove("shadowHidden")
})

userBtn.addEventListener("click", () => {
    chatModal.classList.add('chatHidden')
    shadowELement.classList.add("shadowHidden")

})


const DATA = [{
        id: 1,
        name: "Ogabek Olimov",
        photo: "./images/account__image1.jpg",
        date: moment(Date.now()).format('dddd'),
        number: "+99890 000 00 00",
        message: [{ body: "Salom qalaysan", isMine: true }, { body: "Rahmat", isMine: false }]
    },

    {
        id: 2,
        name: "Mehriddin Rajabov",
        photo: "./images/account__image2.jpg",
        date: moment(Date.now()).startOf('day'),
        number: "+99890 111 00 00",
        message: [{ body: "Salom qalaysan", isMine: true }, { body: "Rahmat", isMine: false }]
    },
]












let malumot = JSON.parse(localStorage.getItem("data")) || DATA
localStorage.setItem("data", JSON.stringify(malumot))

for (let item of emojies) {
    let newLiElement = document.createElement("li")
    newLiElement.classList.add("emoji-item")
    newLiElement.textContent = item
    emojiList.appendChild(newLiElement)

    newLiElement.addEventListener("click", () => {
        messagesTextInput.value += item
    })
}

emojiButton.addEventListener('click', evt => {
    emojiList.classList.toggle("emojiListHidden")
    evt.preventDefault()
    messagesTextInput.focus()
})

messagesTextInput.addEventListener("keyup", event => {
    if (event.keyCode == 13) {
        if (messagesTextInput.value == 0) return
        let messageBody = event.target.value
        let userData = malumot.find(user => user.id == currentChat)
        let userIndex = malumot.findIndex(user => user.id == currentChat)
        malumot[userIndex] = userData
        localStorage.setItem("data", JSON.stringify(malumot))

        userData.message.push({
            body: messageBody,
            isMine: true
        })

        renderMessages(messagesListElement, userData.message)
        localStorage.setItem("data", JSON.stringify(malumot))
        event.target.value = ""
    }
})

messageTextForm.addEventListener("submit", evt => {
    evt.preventDefault()
    if (messagesTextInput.value == 0) return
    let messageBody = messagesTextInput.value
    let userData = malumot.find(user => user.id == currentChat)
    let userIndex = malumot.findIndex(user => user.id == currentChat)
    malumot[userIndex] = userData
    localStorage.setItem("data", JSON.stringify(malumot))
    userData.message.push({
        body: messageBody,
        isMine: true
    })
    localStorage.setItem("data", JSON.stringify(malumot))

    renderMessages(messagesListElement, userData.message)
    localStorage.setItem("data", JSON.stringify(malumot))
    evt.target.reset()
    evt.target.focus()
})


renderUsers(usersListElement, malumot)

function renderUsers(parentElement, data) {
    for (let user of data) {
        let newLiElement = document.createElement("li")
        let newImgElement = document.createElement("img")
        let newSpanElement = document.createElement("span")
        let newH2Element = document.createElement("h2")
        let newPElement = document.createElement("p")
        let newTimePlement = document.createElement("p")

        newLiElement.classList.add("account__item")
        newImgElement.classList.add("account__image")
        newSpanElement.classList.add("account__text")
        newH2Element.classList.add("account__name")
        newPElement.classList.add("account__slog")
        newTimePlement.classList.add("account__time")

        newImgElement.src = user.photo
        newH2Element.textContent = user.name
        newTimePlement.textContent = user.date
        newPElement.textContent = "Hello"


        newLiElement.addEventListener("click", () => {
            renderMessages(messagesListElement, user.message)
            localStorage.setItem("data", JSON.stringify(malumot))
            currentChat = user.id
            profileName.textContent = user.name
            profileTime.textContent = user.date
            messagesTextInput.disabled = false

            rightAppMain.classList.remove("chat-hidden")

            localStorage.getItem("data")

            rightAppHeader.addEventListener('click', evt => {
                infoNameImg.src = user.photo
                infoNameText.textContent = user.name
                infoNameTime.textContent = user.date
                mobileNum.textContent = user.number
            })
        })
        newSpanElement.appendChild(newH2Element)
        newSpanElement.appendChild(newPElement)

        newLiElement.appendChild(newImgElement)
        newLiElement.appendChild(newSpanElement)
        newLiElement.appendChild(newTimePlement)
        parentElement.appendChild(newLiElement)
    }
}


function renderMessages(parentElement, data) {
    parentElement.textContent = ""
    for (let messages of data) {
        let newLiElement = document.createElement("li")
        let newDiv1Element = document.createElement("div")
        let newDiv2Element = document.createElement("div")
        let newPElement = document.createElement("p")
        let newTimeElement = document.createElement("p")
        let newCheckElement = document.createElement("img")

        if (messages.isMine) {
            newLiElement.classList.add("message__item1")
            newDiv1Element.classList.add("message__box1")
            newDiv2Element.classList.add("message__box2")
            newPElement.classList.add("message__text")
            newTimeElement.classList.add("message__time")
            newCheckElement.classList.add("message__check__icon")

            newPElement.textContent = messages.body
            newTimeElement.textContent = moment(Date.now()).format('LT');
            newCheckElement.src = `/images/check.svg`
        } else {
            newLiElement.classList.add("message__item")
            newDiv1Element.classList.add("message__box")
            newDiv2Element.classList.add("message__box2")
            newPElement.classList.add("message__text")
            newTimeElement.classList.add("message__time")
            newCheckElement.classList.add("message__check__icon")

            newPElement.textContent = messages.body
            newTimeElement.textContent = moment(Date.now()).format('LT');
        }

        newDiv2Element.appendChild(newTimeElement)
        newDiv2Element.appendChild(newCheckElement)
        newDiv1Element.prepend(newPElement)
        newLiElement.prepend(newDiv1Element)
        newLiElement.appendChild(newDiv2Element)

        parentElement.prepend(newLiElement)
    }
}

searchInputElement.addEventListener('input', e => {
    if (!inputValue) {
        renderUsers(usersListElement, malumot)
    }
    inputValue = e.target.value;
    clearList()

    let searchResult = malumot.filter(value => {
        return value.name.toLowerCase().includes(inputValue)
    })
    renderUsers(usersListElement, searchResult)
})

function clearList() {
    while (usersListElement.firstChild) {
        usersListElement.removeChild(usersListElement.firstChild)
    }
}