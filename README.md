# DailyTrack-App
An app helps record daily necessities and make it easier for people to keep track of what items they have and when they need to refill.  
This app is developed with functional programming using React hooks.    
Author: Jing Xia


## Getting started
### Deployed website
Try it online: [DailyTack](https://dailytrack-functional.web.app/)  

### How to run
* `npm install`  
* `npm run dev`  

Clone the project and run commands in the directory.  
Open http://localhost:5173/ to view it in your broswer.  

### How to test
* `npm run test`  

Test is writen using Cypress, visit [test file](cypress/e2e/0-dailyTrack/dailyTrack.cy.js) to see details.  
It will cover six use cases:  
* Modify the quantity of the first item to 11 in home page
* Delete the first item in the home page
* Add a new item
* Search items by name and tag
* Search items by expiration
* Show analytics function

Test introduction video: [Testing DailyTrack]()

## Design document
Online design document: [Design document](https://docs.google.com/document/d/1rEiOIVWCqxiEGwF3uWYWnPBqwJgoAN26t8y2oIJMai0/edit?usp=sharing)
  
## Introduction video
See the video on YouTube: [Introduction of DailyTrack](https://youtu.be/s78c-bGO4DM)