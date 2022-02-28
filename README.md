# ReadingJourney
## Description
ReadingJourney is a kids’ app that allows users to track their daily reading habits and rewards consistent daily reading. 

Users can:
* Log the books they read and the time spent reading them;
* Earn a ticket for every minute they read, which can be redeemed for other rewards or activities;
* Attain progressively higher ranks based on the total minutes they have read; and
* Earn medals for each three-, five-, or seven-day reading streak.

See the app in production here: https://reading-journey.herokuapp.com/

The app is built with React, Express, Node, and Postgres.  It uses the Google Books API and certain React libraries, including react-select, react-modal, luxon, and font-awesome. 

## Instructions

* Create a database by running 

        createdb reading-journey_development
        
* From the server folder, run 
 
        yarn install 
        yarn migrate:latest 
        yarn db:seed

* Create a file named .env in the server folder and include the following: 

        SESSION_SECRET="{your session secret}"
        
* From the root folder, run 
 
         yarn dev
         
* Navigate to localhost:3000 in your browser to see the app

## TODO
* Enable a user to have multiple profiles
* Add animations
