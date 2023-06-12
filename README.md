# Module 6 - Weather Dashboard

## Description

This project was built in order to provide a user with current weather conditions of a selected city, as well as the 5-day forecast for that city. The dashboard also saves previously searched cities and creates buttons for the user to easily click on a city they've previously searched for before.  
  
I built this project to practice skills learned this week, including making 'fetch' calls to APIs, and printing that data to the page. I also used local storage and Jquery UI widgets to further enhance usability.   
  
I learned a lot about making API calls, and specifically the Open Weather API which I'm sure will be very useful in the future. I practiced fetching and reading the data from API calls, and how to use that data in order to print selected information to the page for the user.

## User Story

AS A traveler  
I WANT to see the weather outlook for multiple cities  
SO THAT I can plan a trip accordingly  

## Acceptance Criteria

GIVEN a weather dashboard with form inputs  
WHEN I search for a city  
THEN I am presented with current and future conditions for that city and that city is added to the search history  
WHEN I view current weather conditions for that city  
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed  
WHEN I view future weather conditions for that city  
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity  
WHEN I click on a city in the search history  
THEN I am again presented with current and future conditions for that city  

## Usage

Find the link to the published GitHub Page here: https://randirose.github.io/module-6-weather-dashboard/

See a screenshot of functioning page here:  

    ![Weather Dashboard Screenshot](assets/weather-dash-screenshot.png)

## Credits

- AskBCS: The AskBCS Learning Assistant was used on this project to help with my local storage function and the previously searched buttons. They helped me find and correct minor syntax errors that got my function working properly. They also helped me with passing data values (lat and lon) from one function to another, which helped clean up my code.

## Features

Additional features in my project include:  

- Autofill widget: Autofills city names when typing into the search bar. Includes top 100 most populated US cities and 50 most populated global cities.  
- Additional weather info, including a description and a "feels like" temperature.
