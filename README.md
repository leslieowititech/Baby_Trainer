# Baby Trainer

By Leslie Owiti.

Link to [Live site](https://baby-trainer.herokuapp.com/)

## Baby Trainer at a glance


Baby Trainer is a fullstack app that uses a Flask backend and React on the front end.

Target users are parents with new borns and especially new parents. There is a lot to taking care of a baby and speaking from personal experience it is a lot to try and get a handle on at first time of asking. There is a lot of helpful apps out there and I hope Baby Trainer will add positively to help new moms and dads have a way to manage babies development activities.

##Application Architecture

Baby Trainer is containerized in Docker and uses gihub action to atomatically push to Heroku where it is hosted. The front end is done using a React-redux state management lifecycle. 

# Frontend Overview

The bulk of the app is build using vaniilla React and Redux on the front end. The charts feature and the timer feature that visuallize and record feed dta respectively were implemented using the third party libraries.

## React-Timer-Hook
The react-timer-hook is awesome at handling time related loging and manipulation. The documentation on this library is very short and to the point and the functionality is very user friendly to parse. I found that this library lent it;'s self very well to my timer component that visually records as you time how long your baby fed for.

## Recharts
Recharts in my opinion is by far the best library out there that I have come across and the documentation on it very extensive and well written. There are a lot of various graphs, charts and other data visualisation tools on it that are very flexible. I love playing around with its functionality and implemented my charts feature using it.

## Figma
I utilised Figma's design tools to wireframe my app before I begun building out my components. I found this practice to be very helpful in visualising the amount of work building the app will approximately take and what kind of tools do I want to build from scratch and where good third party libraries if available can be utilised.

Below is an example of a wireframe workflow i designed in figma to hel me visualize how i wanted this feature to work.

![Feed_flow_logs](	https://mir-s3-cdn-cf.behance.net/project_modules/disp/674f04126687771.6132389abe68a.png)
 
 # Backend Overview
 For the backend I wrote out all my route logic in Blueprits and utilised maintained a similar output for all my endpoints using decorators and all this was done in flask. I normalised my data as mych as posible in the backend to minimise too much nesting when trying to access my data in the fron end.
 
 ## PostgreSQL
 Locally I used PostgreSQL to seed and test my data. The initial set-up of my database I did using raw SQL but from then on I utilised alembic to manage my data. I also want to give a mention to Postman. This tool was very helpful when testing my route logic before making ajax call to my store in the frontend.

