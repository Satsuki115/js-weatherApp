const apiKey = "1159b7c42ce5501a9e3e208938124d24";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){//checkWeatherはcityを引数にとる
    const response = await fetch(`${apiUrl}&q=${city}&city&appid=${apiKey}`);//awaitによってこの処理が行われてから他の処理がおこなわれる
    //fetchでapiにリクエストを送信し、結果をresponseに代入
    if(response.status == 404){//urlが無効の場合
        document.querySelector(".error").style.display = "block";//errorクラスを表示（cssで非表示にしている）
        document.querySelector(".weather").style.display = "none";//weatherクラスを非表示
    }else{//urlが有効な場合
    var data = await response.json();//awaitによってこの処理が行われてから他の処理がおこなわれる
    //responseをjson形式にしてdataに代入→apiを接続

   
    document.querySelector(".city").innerHTML= data.name;//.cityにapiによって出力された配列のdataの中のnameを代入
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) +"°c";//.tempにapiによって出力された配列のdataの中のmainのtempに°をつけたものを代入（Math.Roundで四捨五入）
    document.querySelector(".wind").innerHTML= data.wind.speed + "km/h";//.windに.apiによって出力された配列のdataの中のwindの中のspeedにkm/hをつけて代入

    if(data.weather[0].main == "Clouds"){//data配列のindexが０のmainがCloudsの場合
        weatherIcon.src = "weather-app-img/images/clouds.png";//weatherIconの画像を指定
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "weather-app-img/images/clear.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "weather-app-img/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "weather-app-img/images/mist.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "weather-app-img/images/rain.png";
    }
    else if(data.weather[0].snow == "Snow"){
         weatherIcon.src = "weather-app-img/images/snow.png";
    }
    document.querySelector(".error").style.display = "none";//errorクラスを非表示
    document.querySelector(".weather").style.display = "block";//weatherクラスを表示
}
   
}

searchBtn.addEventListener("click",()=>{//searchBtnにclickイベントを追加
    checkWeather(searchBox.value);//checkWeatherにsearchBoxにいれられたvalueを渡す
})

