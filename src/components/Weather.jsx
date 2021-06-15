import { useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

const api = {
  key: "a09b9a0de48c45b63a70454f0000db8e",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <WeatherContainer
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 55
            ? "warm"
            : "cold"
          : ""
      }
    >
      <SearchBarContainer>
        <input
          type="text"
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </SearchBarContainer>
      {typeof weather.main != "undefined" ? (
        <ContentContainer>
          <div className="location-box">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-data">
            <div className="current-temp">
              Current: {Math.round(weather.main.temp)}°F
            </div>
            <div className="feels-like">
              Feels like: {Math.round(weather.main.feels_like)}°F
            </div>
            <div className="high-low">
              High/Low: {Math.round(weather.main.temp_max)}°F/
              {Math.round(weather.main.temp_min)}°F
            </div>
          </div>
          <div className="conditions">{weather.weather[0].main}</div>
        </ContentContainer>
      ) : (
        ""
      )}
    </WeatherContainer>
  );
};

const WeatherContainer = styled(motion.div)`
  /* border: 2px solid blue; */
  height: 100vh;
  padding: 2rem;

  &.warm {
    background: rgb(62, 30, 2);
    background: linear-gradient(
      25deg,
      rgba(62, 30, 2, 1) 30%,
      rgba(217, 92, 43, 1) 100%
    );
  }

  &.cold {
    background: rgb(88, 182, 224);
    background: linear-gradient(
      90deg,
      rgba(88, 182, 224, 1) 28%,
      rgba(5, 89, 87, 1) 100%
    );
  }
`;

const SearchBarContainer = styled(motion.div)`
  /* border: 2px solid green; */
  display: flex;
  justify-content: center;
  .search {
    width: 50%;
    height: 4rem;
    background: rgba(0, 0, 0, 0.4);

    border: none;
    outline: none;
    border-radius: 1rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 2rem;
    padding-left: 1rem;
    &:focus {
      background: rgba(0, 0, 0, 0.7);
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const ContentContainer = styled(motion.div)`
  border: 2px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 35%;
  height: 70vh;
  margin: auto;
  margin-top: 5rem;
  font-size: 3rem;
  justify-content: space-evenly;
`;

export default Weather;
