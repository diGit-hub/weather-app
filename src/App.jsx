function App() {
    let humidity = 40;
    return (
        <>
            <main>
                <section>
                    <div>
                        <a></a>
                        <a></a>
                    </div>
                    <div>
                        <img></img>
                        <p>2<span>7</span><span>°c</span></p>
                        <p>Few Clouds</p>
                        <div>
                            <p>Today</p>
                            <p>Tue 14 Apr</p>
                        </div>
                        <div>
                            <img></img>
                            <p>Salvador</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <a></a>
                        <a></a>
                    </div>
                    <div>
                        <div>
                            <p>Tomorrow</p>
                            <img></img>
                            <div>
                                <p>2<span>7</span><span>°</span><span>C</span></p>
                                <p>2<span>5</span><span>°</span><span>C</span></p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <p>Today's Highlights</p>
                    <div>
                        <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                            <h2 className="text-medium text-base text-center text-[#E7E7EB]">
                                Humidity
                            </h2>
                            <div className="flex items-end h-20 mb-4">
                                <h3 className="text-[#E7E7EB] text-6xl font-bold">{humidity}</h3>
                                <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1 text-right">%</h4>
                            </div>
                            <div className="w-[70%] font-bold text-xs flex justify-between text-[#A09FB1]">
                                <p>0</p>
                                <p>50</p>
                                <p>100</p>
                            </div>
                            <div className="flex items-center w-[70%] h-2 bg-[#E7E7EB] rounded-3xl">
                                <div
                                    className="h-2 bg-[#FFEC65] rounded-3xl m-0 p-0"
                                    style={{ width: `${humidity}%` }}
                                />
                            </div>
                            <div className="w-[70%] text-right font-bold text-[#A09FB1]">%</div>
                        </div>
                    </div>
                    <p>
                        Created by <span>Gabriel Mercês Dev</span> - devChallenges.io
                    </p>
                </section>
            </main>
        </>
    )
}

export default App
