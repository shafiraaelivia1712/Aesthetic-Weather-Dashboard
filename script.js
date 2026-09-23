// GANTI DENGAN API KEY ASLI DARI OPENWEATHERMAP AGAR BISA MUNCUL
const apiKey = 'b6f8d85663527b0dcf4592be3513c2d4'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city !== "") {
        getWeather(city);
    }
});

// Fitur tambahan: bisa cari pakai tombol "Enter" di keyboard
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value;
        if (city !== "") getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            // Mengambil ikon cuaca langsung dari OpenWeatherMap
            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').innerText = data.weather[0].description;
            
            // Memasukkan data kelembapan dan angin
            document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            // Konversi dari m/s ke km/jam
            document.getElementById('wind-speed').innerText = `${Math.round(data.wind.speed * 3.6)} km/j`;

            // Tampilkan hasil
            weatherInfo.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}