# ReadingJourney
## Description
ReadingJourney is an app that helps parents track their kids' daily reading habits and rewards consistent daily reading. 

With the help of their parents, kids can:
* Log the books they read and the time spent reading them;
* Earn a ticket for every minute they read, which can be redeemed for other rewards or activities;
* Attain progressively higher ranks based on the total minutes they have read; and
* Earn medals for each three-, five-, or seven-day reading streak.

See the app in production here: https://reading-journey.herokuapp.com/

The app is built with React, Express, Node, and Postgres; integrates the Google Books API; and uses the react-router, react-select, react-modal, luxon, and font-awesome libraries. 

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

![image](https://user-images.githubusercontent.com/22434679/156003801-507079c4-1474-40ab-979a-87cddbb576a0.png)
![image](https://user-images.githubusercontent.com/22434679/156005283-596369d2-2c70-4e45-89c4-2cef10b7ab4a.png)
![image](https://user-images.githubusercontent.com/22434679/156005310-1bee9e24-551d-44d3-95ca-d9223ed2495f.png)
![image](https://user-images.githubusercontent.com/22434679/156005416-6b118062-5135-4426-9680-6031c6a82af8.png)
![image](https://user-images.githubusercontent.com/22434679/156005497-0cc4bfc9-9b74-4cba-b99f-7a087cdd21e5.png)
## TODO
* Enable a user to have multiple profiles
* Add animations
