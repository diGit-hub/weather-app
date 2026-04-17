function Forecast({ forecast, unit }) {
    if (!forecast) return null;
    const dailyDataMap = new Map();

    const todayDateStr = forecast.list[0].dt_txt.split(' ')[0];

    forecast.list.forEach(item => {
        const dateStr = item.dt_txt.split(' ')[0];
        if (dateStr === todayDateStr) return;

        if (!dailyDataMap.has(dateStr)) {
            dailyDataMap.set(dateStr, {
                dt: item.dt,
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
                icon: item.weather[0].icon.replace('n', 'd')
            });
        } else {
            const dayRecord = dailyDataMap.get(dateStr);
            dayRecord.temp_max = Math.max(dayRecord.temp_max, item.main.temp_max);
            dayRecord.temp_min = Math.min(dayRecord.temp_min, item.main.temp_min);
            
            if (item.dt_txt.includes('12:00:00')) {
                dayRecord.icon = item.weather[0].icon.replace('n', 'd');
            }
        }
    });

    const dailyData = Array.from(dailyDataMap.values()).slice(0, 5);

    if (dailyData.length === 0) return null;
    return (
        <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit">
            {dailyData.map((day, i) => {
                const toUnit = (c) => unit === 'metric' ? Math.round(c) : Math.round(c * 9 / 5 + 32);
                const tempMax = toUnit(day.temp_max);
                const tempMin = toUnit(day.temp_min);
                const iconCode = day.icon;
                const iconUrl = `/weather/${iconCode}.png`;
                const d = new Date(day.dt * 1000);
                const defaultDateStr = `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })}`;
                const dayName = i === 0 ? 'Tomorrow' : defaultDateStr;
                return (
                    <li key={i} className="w-[7.5rem] h-40 bg-[#1E213A] flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium">
                        <h3 className="mb-2">{dayName}</h3>
                        <span className="flex items-center justify-center w-14 h-16">
                            <img src={iconUrl} alt="condition" className="w-full h-full object-contain" />
                        </span>
                        <div className="flex gap-2 mt-2">
                            <p>{tempMax}°{unit === 'metric' ? 'C' : 'F'}</p>
                            <p className="text-[#A09FB1]">{tempMin}°{unit === 'metric' ? 'C' : 'F'}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
export default Forecast;