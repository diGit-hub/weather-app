function Highlights({ weather, unit }) {
    if (!weather) return null;
    const { main, wind } = weather;
    const humidity = main.humidity;
    const windSpeed = unit === 'metric'
        ? (wind.speed).toFixed(2)
        : (wind.speed * 2.23694).toFixed(1);
    const windUnit = unit === 'metric' ? 'ms' : 'mph';
    const visibilityKm = (weather.visibility || 10000) / 1000;
    const visibility = unit === 'metric'
        ? visibilityKm.toFixed(2)
        : (visibilityKm * 0.621371).toFixed(2);
    const visibilityUnit = unit === 'metric' ? 'km' : 'mi';
    const pressure = main.pressure;

    const getWindDirection = (deg) => {
        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return dirs[Math.round(deg / 45) % 8];
    };

    return (
        <div className="w-full max-w-sm px-5 mt-12 md:w-full md:max-w-none md:m-auto md:flex md:flex-col md:items-center md:justify-center">
            <h2 className="h-7 text-[#E7E7EB] text-2xl font-bold my-5 md:w-full md:max-w-2xl md:text-left">Today's Highlights</h2>

            <div className="w-full flex flex-col items-center md:grid md:grid-cols-2 gap-5 md:gap-6 md:max-w-2xl">

                {/* Wind Status */}
                <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                    <h2 className="text-base text-center text-[#E7E7EB]">Wind status</h2>
                    <div className="flex items-end h-20 mb-4">
                        <h3 className="text-[#E7E7EB] text-6xl font-bold">{windSpeed}</h3>
                        <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">{windUnit}</h4>
                    </div>
                    <div className="flex items-center text-[#E7E7EB] text-sm">
                        <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]">
                            <img src="/navigation.svg" alt="Navigation Icon" width="18" height="18" style={{ rotate: `${wind?.deg || 0}deg` }} />
                        </span>
                        {getWindDirection(wind?.deg || 0)}
                    </div>
                </div>

                {/* Humidity */}
                <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                    <h2 className="text-base text-center text-[#E7E7EB]">Humidity</h2>
                    <div className="flex items-end h-20 mb-4">
                        <h3 className="text-[#E7E7EB] text-6xl font-bold">{humidity}</h3>
                        <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1 text-right">%</h4>
                    </div>
                    <div className="w-[70%] font-bold text-xs flex justify-between text-[#A09FB1]">
                        <p>0</p><p>50</p><p>100</p>
                    </div>
                    <div className="flex items-center w-[70%] h-2 bg-[#E7E7EB] rounded-3xl">
                        <div
                            className="h-2 bg-[#FFEC65] rounded-3xl"
                            style={{ width: `${humidity}%` }}
                        />
                    </div>
                    <div className="w-[70%] text-right font-bold text-[#A09FB1]">%</div>
                </div>

                {/* Visibility */}
                <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] py-4">
                    <h2 className="text-base text-center text-[#E7E7EB]">Visibility</h2>
                    <div className="flex items-end h-20 mb-4">
                        <h3 className="text-[#E7E7EB] text-6xl font-bold">{visibility}</h3>
                        <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">{visibilityUnit}</h4>
                    </div>
                </div>

                {/* Air Pressure */}
                <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] p-4">
                    <h2 className="text-base text-center text-[#E7E7EB]">Air Pressure</h2>
                    <div className="flex items-end h-20 mb-4">
                        <h3 className="text-[#E7E7EB] text-6xl font-bold">{pressure}</h3>
                        <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">mb</h4>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Highlights;