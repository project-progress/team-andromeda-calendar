fetch("https://holidayapi.com/v1/holidays", {
        body: "country=AM&year=2020&pretty&key=cbb0b3c4-ca1c-45b2-a066-ea9c6f28cb5e",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then((response) => {
        return response.json();
    })
    .then((data) => {


        console.log(data.holidays);
        console.log(data.status)
    });
let calendar = document.querySelector('.calendar')
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}
generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    calendar_days.innerHTML = ''
    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()
    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year
    // get first day of month
    let first_day = new Date(year, month, 1)
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            let key = `${year}_${month}_${i - first_day.getDay() + 1}`
            let title = getCookie(key + '_title')
            if (title) {
                day.classList.add('calendar-day-cookie')
            }
            day.classList.add('calendar-day-hover')
            day.setAttribute("onclick", "popup(this)")
            day.setAttribute("id", `${i - first_day.getDay() + 1}`)
            day.setAttribute("key", key)
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}
let month_list = calendar.querySelector('.month-list')
month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})
let month_picker = calendar.querySelector('#month-picker')
month_picker.onclick = () => {
    month_list.classList.add('show')
}
let currDate = new Date()
let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }
generateCalendar(curr_month.value, curr_year.value) //clc fn
document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
document.querySelector('#today').onclick = () => {
    let days = new Date();
    let mList = days.getMonth(); // this month 0-11
    let yDays = days.getFullYear(); // this year 2021
    generateCalendar(mList, yDays)
}
document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
let dark_mode_toggle = document.querySelector('.dark-mode-switch')
dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}
function popup(e) {
    let p = document.querySelector("#popup")
    p.classList.toggle("popupOpen")
    if (e) {
        e.classList.add("select")
        let key = e.getAttribute('key')
        let title = getCookie(key + '_title')
        let desc = getCookie(key + '_desc')
        let inn = document.querySelector("#noden")
        let idd = document.querySelector("#noded")
        inn.value = title
        idd.value = desc
    } else {
        let select = document.querySelector(".select")
        let key = select.getAttribute('key')
        let title = getCookie(key + '_title')
        if (title) {
            select.classList.add("calendar-day-cookie")
        }
        select.classList.remove("select")
    }

}
cs = document.querySelector("#cs")
cs.onclick = () => {
    popup()
}
let save = document.querySelector("#save")
save.addEventListener("click", () => {
    let inn = document.querySelector("#noden")
    let idd = document.querySelector("#noded")
    let select = document.querySelector(".select")
    key = select.getAttribute('key')
    setCookie(key + "_title",inn.value,7)
    setCookie(key + '_desc',idd.value,7)
    popup()
})
function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
