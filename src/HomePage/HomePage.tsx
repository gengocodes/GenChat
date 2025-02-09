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

const API_KEY = 'faa719ec50dffd30794d674819a2d118'; 

interface WeatherData {
    temp: number;
    description: string;
    icon: string;
    city: string;
}

function HomePage() {
    const navigate = useNavigate();
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Latitude:", position.coords.latitude);
                    console.log("Longitude:", position.coords.longitude);
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);    

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
    
            if (data.main && data.weather && data.weather.length > 0) {
                setWeather({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                    city: data.name,
                });
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
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
                {weather ? (
                    <div className="weather-widget">
                        <img src={weather.icon} alt="weather icon" />
                        <p>
                            {weather.city}: {weather.temp}°C, {weather.description}
                        </p>
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>

        </div>
    );
}

export default HomePage;
