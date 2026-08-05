import { useState } from "react";

function Weather() {

  const apiKey = "6498b3255d6e916bd41bd3d9f1d677ee";


  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const getWeather = async () => {


    if (!city.trim()) {

      setError("Please enter a city name");
      setWeather(null);
      return;

    }



    if (/\d/.test(city)) {

      setError("Please enter a valid city name. Numbers are not allowed");
      setWeather(null);
      return;

    }



    try {


      setLoading(true);
      setError("");



      const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;



      const response = await fetch(apiUrl);

      const data = await response.json();



      if (data.cod !== 200) {

        setError("City not found. Please enter a correct city name");
        setWeather(null);
        return;

      }



      setWeather(data);



    // eslint-disable-next-line no-unused-vars
    } catch (error) {


      setError("Something went wrong. Please try again");
      setWeather(null);


    }
    finally {

      setLoading(false);

    }


  };





  return (


    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-purple-950
      to-slate-900
      p-5
    ">



      <div className="max-w-6xl mx-auto">



        {/* Header */}

        <div className="
          flex
          justify-between
          items-start
          flex-wrap
          gap-5
          mb-6
        ">


          <div>


            <h1 className="
              text-4xl
              md:text-5xl
              font-extrabold
              text-white
            ">

              Weather
              <span className="text-cyan-400">
                App
              </span>
              🌤️

            </h1>



            <p className="text-gray-400 mt-2">
              Real-time weather information
            </p>


          </div>





          {/* Search */}


          <div className="flex gap-2">


            <input


              type="text"


              placeholder="Search city..."


              value={city}



              onChange={(e)=>{


                const value = e.target.value;


                setCity(value);



                if(!value.trim()){

                  setWeather(null);
                  setError("");

                }


              }}




              onKeyDown={(e)=>{


                if(/\d/.test(e.key)){

                  e.preventDefault();

                }



                if(e.key === "Enter"){

                  getWeather();

                }


              }}



              className="
              w-40
              md:w-64
              px-4
              py-3
              rounded-full
              bg-white/10
              backdrop-blur-lg
              border
              border-white/20
              text-white
              outline-none
              focus:ring-2
              focus:ring-cyan-400
              "


            />




            <button


              onClick={getWeather}


              className="
              px-6
              py-3
              rounded-full
              bg-cyan-500
              text-white
              font-bold
              hover:bg-cyan-600
              transition
              "


            >

              Search

            </button>



          </div>



        </div>







        {/* Error */}

        {

          error && (

            <p className="
              text-center
              text-red-400
              font-semibold
              mb-5
            ">

              {error}

            </p>

          )

        }







        {/* Loading */}

        {

          loading && (

            <p className="
              text-center
              text-cyan-400
              font-bold
            ">

              Loading weather...

            </p>

          )

        }









        {/* Welcome Screen */}



        {

          !weather && !error && !loading && (


            <div className="
              mt-20
              text-center
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-3xl
              p-10
              shadow-2xl
            ">



              <div className="text-7xl mb-5">

                🌍☁️

              </div>




              <h2 className="
                text-4xl
                md:text-5xl
                font-extrabold
                text-white
              ">

                Check Weather Anywhere

              </h2>





              <p className="
                text-gray-300
                text-lg
                mt-4
                max-w-xl
                mx-auto
              ">

                Get real-time weather updates,
                temperature, humidity and wind
                information for any city around
                the world.

              </p>





              <div className="
                flex
                justify-center
                gap-3
                flex-wrap
                mt-8
              ">



                <InfoTag text="🌤️ Live Weather" />


                <InfoTag text="🌡️ Temperature" />


                <InfoTag text="💧 Humidity" />


              </div>



            </div>


          )

        }









        {/* Weather Card */}


        {

          weather && (


            <div className="
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-3xl
              shadow-2xl
              p-6
              text-center
            ">




              <img

                src={
                  `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
                }

                alt="weather"

                className="mx-auto w-24"

              />





              <h2 className="
                text-6xl
                font-black
                text-white
              ">


                {Math.round(weather.main.temp)}


                <span className="text-cyan-400">
                  °C
                </span>


              </h2>





              <h3 className="
                text-3xl
                font-bold
                text-white
                uppercase
                mt-2
              ">

                {weather.name}

              </h3>





              <p className="
                text-gray-300
                capitalize
                mt-2
              ">

                {weather.weather[0].description}

              </p>







              <div className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-4
                mt-6
              ">


                <WeatherCard
                  icon="💧"
                  title="Humidity"
                  value={`${weather.main.humidity}%`}
                />



                <WeatherCard
                  icon="🌬️"
                  title="Wind"
                  value={`${weather.wind.speed} km/h`}
                />



                <WeatherCard
                  icon="🌡️"
                  title="Feels Like"
                  value={`${Math.round(weather.main.feels_like)}°C`}
                />



                <WeatherCard
                  icon="📊"
                  title="Pressure"
                  value={`${weather.main.pressure} hPa`}
                />



              </div>



            </div>


          )

        }



      </div>


    </div>


  );

}






function InfoTag({text}){


  return (

    <div className="
      px-5
      py-3
      rounded-full
      bg-white/10
      border
      border-white/20
      text-gray-200
    ">

      {text}

    </div>

  );


}






function WeatherCard({icon,title,value}){


  return (

    <div className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/20
      rounded-2xl
      p-4
      hover:bg-white/20
      hover:-translate-y-1
      transition
    ">


      <div className="text-3xl">

        {icon}

      </div>



      <h4 className="
        text-white
        text-xl
        font-bold
        mt-2
      ">

        {value}

      </h4>



      <p className="text-gray-300 text-sm">

        {title}

      </p>



    </div>


  );


}



export default Weather;