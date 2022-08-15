var eventArray = [
  {event: "Christmas Day", date: "2022-12-25"},
  {event: "Independence Day", date: "2022-07-04"},
  {event: "New Year's Day", date: "2022-01-01"},
  {event: "Juneteenth", date: "2022-06-19"},
  {event: "Veterans Day", date: "2022-11-11"}
  ];

var currentDateObject = new Date();
var today = currentDateObject.toISOString().split('T')[0] // "2022-08-13"
var primaryDate = formatDate(today)
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

window.onload = function() {
  populateData();
}

// Getc called onload to pre-populate page data.
function populateData() {
  displayPrimary(primaryDate);
  evaluateEventArrayDates();
  displayEventsTable();
}

function dateDiffInDays(eventDate) {
  var a = new Date(primaryDate)
  var b = new Date(eventDate); // "2022-12-25" to Date Object
  const current = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const event = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((event - current) / _MS_PER_DAY);
}

// Loops eventArray to update difference in days
function evaluateEventArrayDates() {
  for (let eventObj in eventArray) {
    var obj = eventArray[eventObj];
    obj.days = dateDiffInDays(obj.date);
  }
}

function processPrimaryForm() {
  primaryDate = document.getElementById('primaryDate').value;
  document.getElementById("primaryForm").reset();
  formattedDate = formatDate(primaryDate);
  displayPrimary(formattedDate);
  evaluateEventArrayDates();
  displayEventsTable();
}

function displayPrimary(formattedDate) {
  document.getElementById('displayPrimary').innerHTML = formattedDate;
}

// Formats from "2022-08-13" to "Saturday, August 13, 2022"
function formatDate(dateString) {
  var d = new Date(dateString); // date Object
  var formattedDate = "";
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
  'Thursday', 'Friday', 'Saturday'];
  
  var day = days[d.getDay()];
  var mm = months[d.getMonth()];
  var dd = d.getDate();
  var yyyy = d.getFullYear();
  formattedDate += day + ", " + mm + " " + dd + ", " + yyyy;
  return formattedDate;  // "Saturday, August 13, 2022"
}

function processEventsForm() {
  var date = document.getElementById('date').value;
  var event = document.getElementById('event').value;
  var eventDateObject = new Date(date);
  var days = dateDiffInDays(eventDateObject)
  eventArray.push({event: event, date: date, days: days});
  document.getElementById("eventsForm").reset();
  displayEventsTable();
}

function displayEventsTable() {
clearTable();
  var itemsTBody = document.getElementById("itemsTBody");
  for (let eventObj in eventArray) {
    var obj = eventArray[eventObj];
    var formattedDate = formatDate(obj.date);
    var itemsTBody = document.getElementById("itemsTBody");
    var row = itemsTBody.insertRow();
    var eventCell = row.insertCell(0);
    var dateCell = row.insertCell(1);
    var daysCell = row.insertCell(2);
    eventCell.innerHTML =  obj.event;
    dateCell.innerHTML = formattedDate;
    daysCell.innerHTML = obj.days;
  }
}

function clearTable() {
const itemsTBody = document.getElementById("itemsTBody");
  while (itemsTBody.hasChildNodes()) {
    itemsTBody.removeChild(itemsTBody.firstChild);
  }
}

