
const weatherApiKey = "640b0766ce6f4f7aaf373651241605";
const defaultCities = ["New York", "London", "Paris", "Tokyo", "Sydney", "Dubai"];
const blogcontainer=document.getElementById("blog-container");

async function fetchWeatherData(city) {
    try {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(city)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.current;
    } catch(error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}


async function displayDefaultWeather() {
    try {
        for (const city of defaultCities) {
            const weatherData = await fetchWeatherData(city);
            if (weatherData) {
                displayWeather(city, weatherData);
            }
        }
    } catch(error) {
        console.error("Error displaying default weather:", error);
    }
}
function displayWeather(city, weatherData) {
    const div = document.createElement("div");
    div.classList.add("blogs");
    
    const header = document.createElement("h3");
    header.textContent = `Weather in ${city}`;
    const paragraph = document.createElement("p");
    paragraph.textContent = `Temperature: ${weatherData.temp_c}°C`;

    const moreInfoButton = document.createElement("button");
    moreInfoButton.textContent = "More Info";

    div.appendChild(header);
    div.appendChild(paragraph);
    div.appendChild(moreInfoButton);
    blogcontainer.appendChild(div);

    // Add click event listener to open a new page with detailed weather information
    moreInfoButton.addEventListener("click", () => {
        openDetailedWeatherPage(city, weatherData);
    });
}

function openDetailedWeatherPage(city, weatherData) {
    const detailedWeatherPage = window.open("", "_blank");
    if (detailedWeatherPage) {
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Detailed Weather Information</title>
            </head>
            <body>
                <h1>Weather in ${city}</h1>
                <p>Temperature: ${weatherData.temp_c}°C</p>
                <p>Condition: ${weatherData.condition.text}</p>
                <p>lorem20</p>
            </body>
            </html>
        `;
        detailedWeatherPage.document.write(htmlContent);
    } else {
        alert("Please allow pop-ups to view detailed weather information.");
    }
}



async function searchedweather(city) {
    try {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
            displayWeather(city, weatherData);
        } else {
            console.error("Weather data not found for", city);
        }
    } catch(error) {
        console.error("Error fetching weather data for", city, ":", error);
    }
}


document.querySelector(".but").addEventListener("click", function() {
    const searchInput = document.getElementById("search").value.trim();
    if (searchInput !== "") {
        searchedweather(searchInput);
    }
});



// Call the function to display default weather when the page loads
displayDefaultWeather();
