import React, { useState } from 'react';
const api = {
    key: "53b981424d358c413c504da10e9f3e24",
    base: 'http://api.openweathermap.org/data/2.5'
};


function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });

        }
    }

    const datebuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()]; //returns day with sunday starting at 0
        let date = d.getDate(); //returns 1- 31
        let month = months[d.getMonth()]; //returns 0-11
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    };



    return ( 
        <div className = {
            (typeof weather.main != 'undefined') ?
            ((weather.main.temp < 16) ? 'App cold' :
                'App warm'

            ) : 'App'
        } >

        
    <main>

        <div className='search-box'>
            <input type = "text"
            className = 'search-bar'
            placeholder = 'search...'
            onChange = { e => setQuery(e.target.value) }
            value = { query }
            onKeyPress = { search }/> 
        </div> 
        

    {
        (typeof weather.main != "undefined") ? ( 
                <div>
                
                    <div className = "location-box" >
                        <div className = "location" > { weather.name }, { weather.sys.country } </div>  
                        <div className = "date" > { datebuilder(new Date()) } </div>  
                    </div>

                    <div className = "weather-box" >
                        <div className = "temp" > { Math.round(weather.main.temp) } <span>&#176;</span>C</div>
                        <div className= "weather" > { weather.weather[0].main } </div>  
                    </div> 
                </div>) : ('')

    } 
    </main> 
</div>
        );
    }

    export default App;