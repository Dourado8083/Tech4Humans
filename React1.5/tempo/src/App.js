
import React from "react";
import './App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './app_component/weather.component';
import Form from "./form.component";


const API_key = "bfeda80c93ecedba61a390c83b0b5c99"
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //Declarando componentes como não definidos, mas vamos ter um problemas ++
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsiu: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Trovão: "wi-thunderstorm",
      Chuvisco: "wi-sleet",
      Chuva: "wi-storm-showers",
      Neve: "wi-snow",
      Atmmosphere: "wi-fog",
      Limpo: "wi-day-sunny",
      Nuvens: "wi-day-fog "
    }
  }
  calcCelsius(temp) {
    //fazendo a conversão de kelvin para celsius, fazendo a conversão de  ponto fluantes para inteiro
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Trovão });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Chuvisco });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Chuva });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Neve });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Limpo });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Nuvens });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Nuvens });
    }
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=pt_br&appid=${API_key}`);

      const response = await api_call.json();
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsiu: this.calcCelsius(response.main.temp),
        temp_max: this.calcCelsius(response.main.temp_max),
        temp_min: this.calcCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true })
    }
  };
  render() {
    return (<div className="App">
      <Form loadweather={this.getWeather} error={this.state.error} />
      <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsiu} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} weatherIcon={this.state.icon} />
      {/*Passando o componente*/}
    </div>);
  }
}


export default App;
