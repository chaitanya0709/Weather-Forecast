var input = document.querySelector('.city_name');
var city_name = document.querySelector('#name');
var temp = document.querySelector('.temp');
var min_temp = document.querySelector('.min_temp');
var max_temp = document.querySelector('.max_temp');
var button = document.querySelector('.submit');
var country = document.querySelector('.country');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.windSpeed');
var desc = document.querySelector('.desc');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

button.addEventListener('click', function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=metric&appid=ef015accb2ece7de0ad71b493f6603f7')
    .then(response => response.json())
    .then(data => {
      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var minValue = data['main']['temp_min'];
      var maxValue = data['main']['temp_max'];
      var countryValue = data['sys']['country'];
      var nameValue = data['name'];
      var humidityValue = data['main']['humidity'];
      var speedValue = data['wind']['speed'];
      var iconValue = data['weather'][0]['icon'];
      var descValue = data['weather'][0]['description']

      desc.innerHTML = descValue;
      document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + iconValue + "@2x.png";
      humidity.innerHTML = humidityValue+"%";
      windSpeed.innerHTML = speedValue+" km/h";
      min_temp.innerHTML = parseInt(minValue)+"&#176;C";
      max_temp.innerHTML = parseInt(maxValue)+"&#176;C";
      city_name.innerHTML = nameValue;
      temp.innerHTML = parseInt(tempValue)+"&#176;C";
      country.innerHTML = "Country: "+countryValue;
      input.value ="";
    
    })
    
    .catch(err => alert("Wrong city name!"));
    })