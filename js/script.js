let root = document.querySelector("#root");
let days = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dectember"];
const weekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let wDays = days.getDay(); // this weeks day 0-6
let mList = days.getMonth(); // this month 0-11
let mDays = days.getDate(); // this Day 1-31
let yDays = days.getFullYear(); // this year 2021
function createCalendar(elem, year, month) {
    let arr = []
    let mon = month - 1;
    let d = new Date(year, mon);
    let table = '<table><tr class="days"><th>Moy</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';
    for (let i = 0; i < getDay(d); i++) {  //0-6
        table += '<td></td>';
        arr.push(1)
    }
    while (d.getMonth() == mon) {
        arr.push(1)
        if (arr.length > 5) {
            table += '<td onclick="note(this)" class="weekend"><span class = "comment" contenteditable="true"> </span>' + d.getDate() + '</td>';
        } else {
            table += '<td onclick="note(this)"><span class = "comment" contenteditable="true"> </span>' + d.getDate() + '</td>';
        }
        if (getDay(d) % 7 == 6) {
            table += '</tr><tr>';
            arr = []
        }
        d.setDate(d.getDate() + 1);
    }
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</tr></table>';
    elem.innerHTML = table;
}
function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}
function headerRender() {
    let parSelect = document.querySelector("#select");
    let parTable = document.querySelector("#table");
    document.querySelector(".year").innerHTML = yDays;
    let select = document.createElement("select");
    select.id = "monthSelect";
    parSelect.appendChild(select);
    for (let i = 0; i < monthNames.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = monthNames[i];
        if (i === mList) {
            option.selected = true
            document.querySelector(".mh").innerText = monthNames[i];
        }
        select.appendChild(option)
    }
}
headerRender()
let monthSelect = document.querySelector("#monthSelect")
let next = document.querySelector("#next")
let m = parseInt(monthSelect.value, 10);
next.addEventListener("click", () => {
    yDays += 1
    createCalendar(root, yDays, m + 1);
    document.querySelector(".year").innerHTML = yDays;
})
let prev = document.querySelector("#prev")
prev.addEventListener("click", () => {
    yDays -= 1
    createCalendar(root, yDays, m + 1);
    document.querySelector(".year").innerHTML = yDays;
})
let today = document.querySelector("#today")
today.addEventListener("click", () => {
    createCalendar(root, days.getFullYear(), days.getMonth() + 1);
    document.querySelector(".year").innerHTML = days.getFullYear();
    document.querySelector(".mh").innerText = monthNames[days.getMonth()]
    monthSelect.value = days.getMonth()
})
monthSelect.addEventListener("change", () => {
    let m = parseInt(monthSelect.value, 10);
    document.querySelector(".mh").innerText = monthNames[m]
    console.log(yDays)
    console.log(m)
    createCalendar(root, yDays, m + 1)
})
createCalendar(root, yDays, mList + 1);
let S = new Date();
let time = S.getHours() + ":" + S.getMinutes() + ":" + S.getSeconds();
let clock = document.querySelector("#time")
clock.innerHTML = time
setInterval(() => {
    let S = new Date();
let time = S.getHours() + ":" + S.getMinutes() + ":" + S.getSeconds();
let clock = document.querySelector("#time")
clock.innerHTML = time
}, 1000);
let text = document.createElement("textarea")
function note(td){
    // td.appendChild(text)
  td.classList.toggle("note")
  td.querySelector(".comment").focus();
}



