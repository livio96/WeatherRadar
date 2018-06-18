function getWeather(city){
	if (city) {
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatWeather(JSON.parse(xhr.responseText));
			document.getElementById("weather-data").innerHTML=formattedData;
			document.getElementById('cityname').value="";
		}
	};
	xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=d610395e85b50074b834a0234b0776db");
	xhr.send();
  }
  else{
  	var error='<div class="alert alert-danger alert-dismissible text-center" role="alert">';
		error+='<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		error+='Please enter a city name!</div>';
	document.getElementById('error').innerHTML=error;
  }
	return false;
}

function formatWeather(data){
	return "<h3>Current Weather for " + data.name + ", " + data.sys.country + "</h3>" + 
            "<hr/>" +
			"<p>Weather:" + data.weather[0].main+ "</p>" + 
            "<hr/>" +
			"<p>Weather Description:  " + data.weather[0].description +"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>" + "</p>" + 
            "<hr/>" +
		 	"<p>Temperature:" + Math.round(data.main.temp * (9/5) + 32 )+ "&deg;F</p>" + 
            "<hr/>" +
			"<p>Pressure:" + data.main.pressure + "hPa</p>" + 
            "<hr/>" +
			"<p>Humidity: " + data.main.humidity + "%</p>" + 
             "<hr/>" +
			"<p>Min Temperature:" + Math.round(data.main.temp_min * (9/5) + 32) + "&deg;F</p>" + 
            "<hr/>" +
			"<p>Max Temperature: " + Math.round(data.main.temp_max * (9/5) + 32) + "&deg;F</p>" + 
            "<hr/>" +
			"<p>Wind Speed: " + data.wind.speed + "m/s</p>";
}


function getForecast(city,days){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatForecast(JSON.parse(xhr.responseText));
			document.getElementById("forecast").innerHTML=formattedData;
			document.getElementById('cityname').value="";
			document.getElementById('days').value=""
		}
	};
	xhr.open("GET","http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city + "&cnt=" + days + "&units=metric&appid=d610395e85b50074b834a0234b0776db");
	xhr.send();
	return false;
}
function getDateValue(i) {
    var today = new Date();
    var dd = today.getDate();
    dd = dd+i ; 
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

today = mm + '/' + dd + '/' + yyyy;
    return today; 
    
}
function formatForecast(data){
	var table="";
    var i = 0 ; 
	for (var i = 0; i < data.list.length; i++) {
		table += "<tr>";
        table += "<td>" + getDateValue(i) + "</td>";
		table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'/></td>";
		table += "<td>" + data.list[i].weather[0].main + "</td>";
		table += "<td>" + data.list[i].weather[0].description + "</td>";
		table += "<td>" + Math.round(data.list[i].temp.min  * (9/5) + 32)+ "&deg;F</td>";
		table += "<td>" + Math.round(data.list[i].temp.max * (9/5) + 32) + "&deg;F</td>";
		table += "<td>" + data.list[i].pressure + "hPa</td>";
		table += "<td>" + data.list[i].humidity + "%</td>";
		table += "<td>" + data.list[i].speed + "m/s</td>";
		table += "</tr>";
	}
	return table;
}

