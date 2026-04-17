import { useState, useRef } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function WeatherCard({ weather, onSearch, onGeolocate, unit }) {
    const [searchCity, setSearchCity] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const debounceRef = useRef(null);

    if (!weather) {
        return <div className="flex items-center justify-center h-full text-white">Loading...</div>;
    }

    const { main, weather: weatherData, name } = weather;
    const tempC = main.temp;
    const temperature = unit === 'metric'
        ? Math.round(tempC)
        : Math.round(tempC * 9 / 5 + 32);
    const description = weatherData[0].description;
    const iconCode = weatherData[0].icon;
    const iconUrl = `/weather/${iconCode}.png`;
    const today = new Date();
    const dateStr = `${today.toLocaleDateString('en-US', { weekday: 'short' })} ${today.getDate()} ${today.toLocaleDateString('en-US', { month: 'short' })}`;
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    const fetchSuggestions = async (query) => {
        if (query.trim().length < 2) { setSuggestions([]); return; }
        try {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
            );
            const data = await res.json();
            setSuggestions(data);
        } catch {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchCity(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(value), 400);
    };

    const handleSelectSuggestion = (s) => {
        onSearch(s.name + (s.country ? `,${s.country}` : ''));
        setSearchCity('');
        setSuggestions([]);
        setSearchOpen(false);
    };

    const closePanel = () => {
        setSearchOpen(false);
        setSearchCity('');
        setSuggestions([]);
    };

    return (
        <div className="flex flex-col items-center w-full h-full text-white relative">

            {/* Search Panel */}
            {searchOpen && (
                <div className="absolute inset-0 bg-[#1E213A] z-10 flex flex-col p-6">
                    <button
                        onClick={closePanel}
                        className="self-end text-[#A09FB1] text-2xl mb-6 hover:text-white transition-colors"
                        aria-label="Close search"
                    >✕</button>

                    {/* Input + Search button */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Search location"
                            value={searchCity}
                            onChange={handleInputChange}
                            className="flex-1 bg-transparent border border-[#616475] text-white px-4 py-2 focus:outline-none focus:border-white placeholder-[#616475]"
                            autoFocus
                        />
                        <button
                            onClick={() => suggestions.length > 0 && handleSelectSuggestion(suggestions[0])}
                            className="bg-[#3C47E9] text-white px-4 py-2 font-medium hover:bg-[#5c67f2] transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    {/* Suggestions list */}
                    {suggestions.length > 0 && (
                        <ul className="flex flex-col gap-1 mt-2">
                            {suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleSelectSuggestion(s)}
                                    className="px-4 py-4 text-[#E7E7EB] bg-[#6E707A] hover:bg-[#3C47E9] cursor-pointer transition-colors flex justify-between items-center group"
                                >
                                    <span>{s.name}{s.state ? `, ${s.state}` : ''}</span>
                                    <span className="text-[#A09FB1] text-sm group-hover:text-white">{s.country}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Header buttons */}
            <div className="flex justify-around items-end w-full h-16">
                <button
                    onClick={() => setSearchOpen(true)}
                    className="w-44 h-9 bg-[#6E707A] text-[#E7E7EB] cursor-pointer text-center"
                >
                    Search for Places
                </button>
                <button
                    onClick={onGeolocate}
                    className="flex items-center justify-center w-10 h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff55] transition-colors"
                    title="Use my location"
                >
                    <img src="/location.svg" alt="location" width="25" height="25" />
                </button>
            </div>

            {/* Weather Info */}
            <div className="flex flex-col items-center w-full h-[90vh]">
                <div className="flex flex-col items-center justify-center w-full h-[45%] relative overflow-hidden after:bg-[url('/others/Cloud-background.png')] after:absolute after:w-full after:h-full after:bg-[length:150%_110%] after:bg-no-repeat after:opacity-5 after:bg-[bottom_center]">
                    <div className="flex items-center justify-center w-2/5 absolute">
                        <img src={iconUrl} alt={description} className="w-full object-contain" />
                    </div>
                </div>
                <div className="flex items-center">
                    <h2 className="font-medium text-9xl text-[#E7E7EB] my-8">{temperature}</h2>
                    <h3 className="text-6xl text-[#A09FB1] font-medium mt-6">{unitSymbol}</h3>
                </div>
                <h2 className="capitalize text-3xl text-[#A09FB1] font-semibold pt-6 pb-12">{description}</h2>
                <p className="text-sm text-[#88869D] font-medium mb-6">
                    Today &nbsp;&nbsp; . &nbsp;&nbsp; {dateStr}
                </p>
                <div className="flex items-center gap-2 text-sm text-[#88869D] h-10 bottom-0 font-semibold mb-2 mt-auto">
                    <img src="/location_on.svg" alt="location" width="20" height="20" className="mb-2" />
                    {name}
                </div>
            </div>
        </div>
    );
}
export default WeatherCard;