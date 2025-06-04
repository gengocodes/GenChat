import React, { useEffect, useState } from "react";
import "./HomePage.css";
import logo from "../assets/GenChat.png";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeBackground from "./particles";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const WEATHER_API_KEY = "faa719ec50dffd30794d674819a2d118";
const NEWS_API_KEY = "03c14040df8bdab3daf48b314786f6b3";
const MEME_API_URL = "https://meme-api.com/gimme";
const FUN_FACT_API_URL = "https://uselessfacts.jsph.pl/random.json?language=en";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<{ title: string }[]>([]);
  const [meme, setMeme] = useState("");
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
    fetchNews();
    fetchMeme();
    fetchFunFact();
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        city: data.name,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&token=${NEWS_API_KEY}`
      );
      const data = await response.json();
      if (!data.articles) throw new Error("No articles found");
      setNews(data.articles.slice(0, 5));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchMeme = async () => {
    const response = await fetch(MEME_API_URL);
    const data = await response.json();
    setMeme(data.url);
  };

  const fetchFunFact = async () => {
    const response = await fetch(FUN_FACT_API_URL);
    const data = await response.json();
    setFunFact(data.text);
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  const user = auth.currentUser;
  const photoURL = user?.photoURL || "";
  const displayName = user?.displayName || "";
  const [activeSection, setActiveSection] = useState("weather");
  const [activeSection2] = useState("home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="main-homepage">
      <HomeBackground id={undefined} className="home-background" />
      <div className="homepage-container">
        <div className="home1">
          <div className="home-selection">
            <div className="home-div1">
              {" "}
              <div className="logo-cont">
                <img src={logo} className="home-logo" alt="" />
              </div>
            </div>
            <div className="home-div2">
              <div className="home-cont">
                <div
                  className={`homeic-cont ${
                    activeSection2 === "home" ? "active" : ""
                  }`}
                >
                  <HomeFilledIcon className="homeic-icon" />
                </div>
                <div
                  className="settings-cont"
                  onClick={() => navigate("/settings")}
                >
                  {" "}
                  <SettingsIcon className="settings-icon" />
                </div>
                <div
                  className="chat-cont"
                  onClick={() => navigate("/chatroom")}
                >
                  {" "}
                  <ChatIcon className="chat-icon" />
                </div>
                <div className="logout-cont" onClick={handleSignOut}>
                  <LogoutIcon className="logout-icon" />
                </div>
              </div>
            </div>
            <div className="home-div3">
              {" "}
              <div className="notif-cont">
                <NotificationsNoneIcon className="notif-icon" />
              </div>
              <div className="img-cont">
                <img src={photoURL} className="home-homeimg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="homepage-content">
          <div className="cont1">
            <div className="items">
              <div className="prof">
                <img src={photoURL} className="homeimg2" alt="" />
                <p className="home-option">{displayName}</p>
              </div>
              <div
                className={`weather ${
                  activeSection === "weather" ? "active" : ""
                }`}
                onClick={() => scrollToSection("weather")}
              >
                <p className="home-option">Weather</p>
              </div>
              <div
                className={`news ${activeSection === "news" ? "active" : ""}`}
                onClick={() => scrollToSection("news")}
              >
                <p className="home-option">News</p>
              </div>
              <div
                className={`meme ${activeSection === "meme" ? "active" : ""}`}
                onClick={() => scrollToSection("meme")}
              >
                <p className="home-option">Meme</p>
              </div>
              <div
                className={`fact ${
                  activeSection === "funfact" ? "active" : ""
                }`}
                onClick={() => scrollToSection("funfact")}
              >
                <p className="home-option">Fun Fact</p>
              </div>
              <div
                className={`soon ${activeSection === "soon" ? "active" : ""}`}
                onClick={() => scrollToSection("soon")}
              >
                <p className="home-option">Coming soon...</p>
              </div>
            </div>
          </div>
          <div className="cont2">
            <div className="holder">
              {weather && (
                <div className="weather-widget">
                  <h2 className="hometitle" id="weather">
                    Weather
                  </h2>
                  <img
                    src={weather.icon}
                    alt="weather icon"
                    className="weather-icon"
                  />
                  <p>
                    {weather.city}: {weather.temp}°C, {weather.description}
                  </p>
                </div>
              )}
              <div className="news-widget">
                <h2 className="hometitle" id="news">
                  Trending News
                </h2>
                {news.map((article, index) => (
                  <p key={index} className="newscontent">
                    {article.title}
                  </p>
                ))}
              </div>
              <div className="meme-widget" id="meme">
                <img src={meme} alt="Random Meme" className="meme-img" />
              </div>
              <div className="funfact-widget">
                <h2 className="hometitle" id="funfact">
                  Did You Know?
                </h2>
                <p className="funfactcontent">{funFact}</p>
              </div>
            </div>
          </div>
          <div className="cont3">
            <div className="cont3-cont">
              <div
                className={`soon ${activeSection === "soon" ? "active" : ""}`}
                onClick={() => scrollToSection("soon")}
              >
                <p className="home-option">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
