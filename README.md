# Baby Trainer

By Leslie Owiti.

## Baby Trainer at a glance

Baby Trainer is a fullstack app that uses a Flask backend and React on the front end.

Target users are parents with new borns and especially new parents. There is a lot to taking care of a baby and speaking from personal experience it is a lot to try and get a handle on at first time of asking. There is a lot of helpful apps out there and I hope Baby Trainer will add positively to help new moms and dads have a way to manage babies development activities.

##Application Architecture

Baby Trainer is containerized in Docker and uses gihub action to atomatically push to Heroku where it is hosted. The front end is done using a React-redux state management lifecycle. 

## Frontend Overview

The bulk of the app is build using vaniilla React and Redux on the front end. The charts feature and the timer feature that visuallize and record feed dta respectively were implemented using the third party libraries.

# React-Time-Hook
The react-timer-hook is awesome at handling time related loging and manipulation. The documentation on this library is very short and to the point and the functionality is very user friendly to parse. I found that this library lent it;'s self very well to my timer component that visually records as you time how long your baby fed for.

#Recharts
Recharts in my opinion is by far the best library out there that I have come across and the documentation on it very extensive and well written. There are a lot of various graphs, charts and other data visualisation tools on it that are very flexible. I love playing around with its functionality and implemented my charts feature using it.
 

