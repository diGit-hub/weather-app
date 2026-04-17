import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Highlights from './components/Highlights';
function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('metric');
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const fetchWeather = async (city) => {
        try {
            setLoading(true);
            setError(null);

            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );

            if (!weatherRes.ok) throw new Error('City not found');
            const weatherData = await weatherRes.json();
            setWeather(weatherData);

            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );

            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                setForecast(forecastData);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetch('https://ipinfo.io/json')
            .then(res => res.json())
            .then(data => {
                if (data && data.city) {
                    fetchWeather(`${data.city},${data.country || ''}`);
                } else {
                    fetchWeather('London');
                }
            })
            .catch(() => fetchWeather('London'));
    }, []);
    const handleSearch = (city) => {
        if (city.trim()) {
            fetchWeather(city);
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);

            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            if (!weatherRes.ok) throw new Error('Location not found');
            const weatherData = await weatherRes.json();
            setWeather(weatherData);

            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            if (forecastRes.ok) {
                const forecastData = await forecastRes.json();
                setForecast(forecastData);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            () => setError('Unable to retrieve your location')
        );
    };
    const toggleUnit = (newUnit) => {
        setUnit(newUnit);
    };
    return (
        <div className="bg-[#1E213A] w-screen min-h-screen flex flex-col items-center md:flex-row">
            {/* Sidebar */}
            <section className="bg-[#1E213A] flex flex-col w-screen h-screen overflow-hidden md:w-[30%] md:min-w-[380px] md:m-auto">
                <WeatherCard weather={weather} onSearch={handleSearch} onGeolocate={handleGeolocate} unit={unit} />
            </section>
            {/* Main */}
            <div className="w-full h-fit min-h-screen flex flex-col items-center bg-[#100E1D] md:w-[70%] md:min-w-[580px] md:max-h-screen">
                {/* °C / °F Toggle */}
                <div className="flex justify-end items-end h-20 w-64 gap-5 md:max-w-2xl md:w-full">
                    <button
                        onClick={() => toggleUnit('metric')}
                        className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full ${unit === 'metric' ? 'bg-[#E7E7EB] text-[#110E3C]' : 'bg-[#585676] text-[#E7E7EB]'}`}
                    >°C</button>
                    <button
                        onClick={() => toggleUnit('imperial')}
                        className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full ${unit === 'imperial' ? 'bg-[#E7E7EB] text-[#110E3C]' : 'bg-[#585676] text-[#E7E7EB]'}`}
                    >°F</button>
                </div>
                {/* Forecast - 5 days */}
                <section className="w-full md:px-5">
                    <Forecast forecast={forecast} unit={unit} />
                </section>
                {/* Highlights */}
                <Highlights weather={weather} unit={unit} />
                <footer className="py-5 w-full flex flex-row justify-center items-center text-[#A09FB1]">
                    <h4 className="text-sm font-medium text-center">Created by</h4>
                    <h2 className="font-bold text-sm text-center mx-1">Gabriel Mercês Dev</h2>
                    <h3 className="font-semibold text-sm text-center">- devChallenges.io</h3>
                </footer>
            </div>
        </div>
    );
}
export default App;