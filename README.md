# 5 Day Forecast Weather Application

This project is for technical assessment in an internship opportunity. The overall functionality of this application is that it enables the user to enter a *city, zipcode, town's landmark and etc* to dynamically search for weather forecast of up to 5 days.

## Application Features
- Dynamically identifies the location of the query with the use of https://openweathermap.org/api

- Search with intellisense and suggestive search for ease of navigation.

- Outputs the 5 day forecast of the queried location.

## Demo
https://weather-app-pink-beta-90.vercel.app/

## How to run this application
Navigate to backend and frontend package.json and do a regular **npm install** and then start both backend and frontend application.

frontend/ folder.
1. Create a .env in the frontend/ folder
2. Have the VITE_BACKEND_URL = http://localhost:5000 or the port of the backend
3. npm run dev

backend/ folder.
1. Create a .env in the backend/ folder
2. Input PORT = 500 and OPENWEATHER_API_KEY = `value`
( Due to security concerns, I did not upload the API key of OpenWeather )
3. npm run start


