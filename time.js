// ***************** //
// HOW TO GET A DATE //
// ***************** //

// if user's time
new Date(year, month - 1, date, hour, minutes).getTime();
// if Eastern US TZ:
  // put the above formula in your browser's console, which should give you a big number.
  // use this number directly in the code (put a comment above with the date)

// ******************************** //
// FIND CLOSEST DEADLINE (SPECIFIC) //
// ******************************** //

function findClosestDate() {
  var now = new Date();
  // convert now to num of milliseconds since Unix Epoch
  now = now.getTime();
  // make sure to format dates like shown
  var deadlines = [
    // year, month (0 indexed! (April == 3)), day, hour, minutes
    new Date(2019, 7, 19, 23, 59),
    new Date(2019, 8, 3, 23, 59),
    new Date(2019, 8, 20, 23, 59)
  ];
  var deadline = deadlines[0];
  // while the deadline is in the past...
  while (deadline.getTime() < now) {
    // go to next date in deadline array
    deadlines.shift();
    deadline = new Date(deadlines[0]);
  }
  return deadline;
}


// *********************************** //
// FIND CLOSEST DEADLINE (DAY OF WEEK) //
// *********************************** //

function findClosestDay(dayOfWeekAsInt) {
  // dayOfWeekAsInt, Monday = 1, Tuesday = 2, etc.
  // function returns closest date, so will return today if today is correct day of week
  var deadline = new Date();
  var newDate = deadline.getDate() + (dayOfWeekAsInt + 7 - deadline.getDay()) % 7;
  deadline.setDate(newDate);
  deadline.setHours(23, 59, 59);

  return deadline;
}


// ************************ //
// FIND 15 MINUTES FROM NOW //
// ************************ //

function findFutureTime(mins) {
  var deadline = new Date;
  var newTime = deadline.getMinutes() + mins;
  deadline.setMinutes(newTime);
  return deadline;
}


// *************** //
// COUNTDOWN TIMER //
// *************** //

// use one of the above functions to find closest deadline, then convert to epoch time
// or if DL is static:
  // var deadline = new Date(year, month - 1, date, hours, minutes, seconds).getTime();
var deadline = findClosestDate().getTime();

function findTime(nowTime) {
  var totalSeconds = (deadline - nowTime) / 1000;
   var days = Math.floor(totalSeconds / 86400);
   var hours = Math.floor(totalSeconds / 3600);
   var minutes = Math.floor(totalSeconds / 60);
   var seconds = Math.floor(60 * ((totalSeconds / 60) + (-1 * minutes)));

   // if not using days get rid of this line
   hours = hours % 24;

   minutes = minutes % 60;

  if (days <= 9) {days = '0' + days;}
  if (hours <= 9) {hours = '0' + hours;}
  if (seconds <= 9) {seconds = '0' + seconds;}
  if (minutes <= 9) {minutes = '0' + minutes;}
  var time = { days: days, hours: hours, minutes: minutes, seconds: seconds };
  return time;
}
function fireTime() {
  var nowTime = new Date().getTime();
  if (nowTime >= deadline) {
    // put timer end stuff HERE
    return;
  } else {
    var time = findTime(nowTime);

    // if using multiple timers you'll need to change this:
    document.querySelector('#days').innerText = time.days;
    document.querySelector('#hours').innerText = time.hours;
    document.querySelector('#mins').innerText = time.minutes;
    document.querySelector('#secs').innerText = time.seconds;
  }
  window.setTimeout(fireTime, 1000);
};
fireTime();


// ************************* //
// CONVERT AND POPULATE DATE //
// ************************* //

function populateDate(date) {
  // typical = month: 'long', day: 'numeric', year: 'numeric'
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  var options = {
    month: 'long',
    day: 'numeric'
  }

  var deadline = date.toLocaleDateString('en', options);

  var dateElems = document.querySelectorAll('.date');
  // use for loop instead of forEach for IE
  for (var i = 0; i < dateElems.length; i++) {
    dateElems[i].innerText = deadline;
  }
}
