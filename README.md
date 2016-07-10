# Blip-Challenge
JS application build to amaze BLIP.

# Application Description

Web application that given a location (e.g. Porto) fetches the weather forecast for the next 5 days. 
To achieve the result it was proposed to use the Yahoo API.

# How I built it
The application was built on Node.js. 
With the help of Express.js it was built two routes, one to the main page and another to the city's forecast data fetch, this last one is used for an AJAX call on the main page.

## How to run it
To run the application:
- First you need to make sure that you install Node.js: https://nodejs.org/en/download/
- Then go to the repository dir through the Node.js Command Prompt and run the command "npm install"
- At last you must start the application executting the command "node Server.js".

That's it, now you can see and use the application at your localhost port 4000: http://localhost:4000

## Scripts implemented
The application has two unit tests, implemented with mocha, one to check the connection to the port 4000 and another to try and fetch the weather forecast for a city.
To run the tests simply run "npm test", it will output the results.

It was also implemented a gulp watch task, that will monitorize all the JS files on the root of the application directory, when it detects any changes it will run the mocha tests.
To start the gulp watch you just have to run the command "npm run watch" and it will do its job.
