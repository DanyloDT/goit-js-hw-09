import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timerDay = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
let selectedDate = null
let timer = null

let daysEl = document.querySelector('[data-days]')
let hoursEl = document.querySelector('[data-hours]')
let minutesEl = document.querySelector('[data-minutes]')
let secondsEl = document.querySelector('[data-seconds]')
        
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0]
        
        if (selectedDate < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');

            startBtn.disabled = true
        } else {
            startBtn.disabled = false
        }
    // console.log(selectedDate);
  },
};

flatpickr(timerDay, options)


const onTimer = () => {
    timer = setInterval(() => {
        const diff = selectedDate - Date.now()
       
        if (diff <= 0) {
            clearInterval(timer)
            return
        }

        const { days, hours, minutes, seconds } = convertMs(diff)
        
        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);

    }, 1000)

}

function convertMs(diff) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(diff / day);
  // Remaining hours
  const hours = Math.floor((diff % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((diff % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((diff % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

addLeadingZero = (value) => {String(value).padStart(2, '0')}


startBtn.addEventListener('click', onTimer)


