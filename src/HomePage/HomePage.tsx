import React, { useEffect, useState } from 'react';
import './HomePage.css';
import logo from '../assets/GenChat.png';
import messageicon from '../assets/message-icon.svg';
import posticon from '../assets/post-icon.png';
import settingsicon from '../assets/settings-icon.png';
import logouticon from '../assets/logout-icon.png';
import HomeBackground from './particles';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const WEATHER_API_KEY = 'faa719ec50dffd30794d674819a2d118'; 
const NEWS_API_KEY = '03c14040df8bdab3daf48b314786f6b3';
const QUOTES_API_URL = 'https://zenquotes.io/api/random';
const MEME_API_URL = 'https://meme-api.com/gimme';
const FUN_FACT_API_URL = 'https://uselessfacts.jsph.pl/random.json?language=en';

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
    const [quote, setQuote] = useState('');
    const [meme, setMeme] = useState('');
    const [funFact, setFunFact] = useState('');
    
    useEffect(() => {
        if ('geolocation' in navigator) {
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
        fetchQuote();
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
            const response = await fetch(`https://gnews.io/api/v4/top-headlines?lang=en&token=${NEWS_API_KEY}`);
            const data = await response.json();
            if (!data.articles) throw new Error("No articles found");
            setNews(data.articles.slice(0, 5));
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };      

    const fetchQuote = async () => {
        try {
            const response = await fetch(QUOTES_API_URL);
            const data = await response.json();
            console.log("Quote API Response:", data); // Debugging
            if (!data || !data[0]) throw new Error("No quote found");
            setQuote(data[0].q + " - " + data[0].a);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote("Stay positive and keep moving forward! 💪");
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
        navigate('/');
    };

    const user = auth.currentUser;
    const photoURL = user?.photoURL || '';
    const displayName = user?.displayName || '';

    return (
        <div className="homepage-container">
            <HomeBackground id={undefined} className="home-background" />

            <nav className="navHome">
                <div className="logo-cont">
                    <img src={logo} className="home-logo" alt="" />
                    <p className="home-genchat">Creator</p>
                </div>
                <div className="home-user-cont">
                    <img src={photoURL} className="home-homeimg" alt="" />
                    <p className="home-user-name">{displayName}</p>
                </div>
                <div className="settings-icon-cont" onClick={() => navigate('/settings')}>
                    <img src={settingsicon} alt="" className="settings-icon" />
                    <p className="nav-text">Settings</p>
                </div>
                <div className="post-icon-cont" onClick={() => navigate('/postroom')}>
                    <img src={posticon} alt="" className="post-icon" />
                    <p className="nav-text">Post</p>
                </div>
                <div className="chat-icon-cont" onClick={() => navigate('/chatroom')}>
                    <img src={messageicon} alt="" className="chat-icon" />
                    <p className="nav-text">Chat</p>
                </div>
                <div className="logout-icon-cont" onClick={handleSignOut}>
                    <img src={logouticon} alt="" className="logout-icon" />
                    <p className="nav-text">Logout</p>
                </div>
            </nav>

            <div className="homepage-content">
                {weather && (
                    <div className="weather-widget">
                        <img src={weather.icon} alt="weather icon" className="weather-icon" />
                        <p>{weather.city}: {weather.temp}°C, {weather.description}</p>
                    </div>
                )}
                <div className="news-widget">
                    <h2>Trending News</h2>
                    {news.map((article, index) => (
                        <p key={index}>{article.title}</p>
                    ))}
                </div>
                <div className="quote-widget">
                    <p>{quote}</p>
                </div>
                <div className="meme-widget">

                    <img src={meme} alt="Random Meme" className="meme-img" />
                </div>
                <div className="funfact-widget">
                    <h2>Did You Know?</h2>
                    <p>{funFact}</p>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
