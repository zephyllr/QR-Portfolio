# QR Portfolio

## Overview

Not everyone carries around their stack of business cards or other identification cards with them at all times. They also prefer not to bring a giant card holder to recieve other people's cards at events or coffee chats. Moreover, it's also pricy to order personalized cards and card holders. This is where an online QR Portfolio comes in handy.

QR Portfolio allows you to create an online portfolio that stores QR codes. You can create a custom QR code with your desired information on it, whether it be regarding your business, education, medical background, etc. You can also collect other people's QR codes as well. In all, this free service is incredibly handy for professionals, students, artists, and practically everyone else!  

## Data Model

The application will store Users and Cards

* Users can have multiple Cards (via references)

An Example User:

```javascript
{
    // required fields\
    username: String, // account name, unique
    password: String, // account password
    // optional fields
    cards: [Cards], // user's cards
}
```

An Example Card: 

```javascript
{
    // required fields
    cardname: String, // name of card, unique
    qrcode: Buffer, // image of qr code
    // optional fields
    text: String, // qr code text
}
```

## [Link to First Draft Schema](db.js) 

## Wireframes

/login - page for login
![login](documentation/login.png)

/portfolio - page for viewing, searching, editing, and deleting qr cards
![home](documentation/portfolio.png)

/create - page for creating qr cards
![customer-profile/slug](documentation/create.png)

/upload - page for uploading qr cards
![customer-new](documentation/upload.png)

## Site Map
![Site map](documentation/sitemap.png) 

## User Stories

1. as non-registered user, I can sign up for an account
2. as a user, I can log in to the site
3. as a user, I can create new QR cards
4. as a user, I can upload QR cards
5. as a user, I can rename QR cards
6. as a user, I can delete QR cards
7. as a user, I can search QR cards

## Research Topics

* (2 points) Bootstrap
  * A front-end component library for developing with HTML, CSS, and JS
  * Used to build responsive, mobile-first projects on the web
  * Will focus the research more on the responsive grid system 
* (3 points) QR Code API
    * API to generate and process QR codes 
    * Needed to create a new QR card for the user portfolio
    * Small library but requires much more research and testing on mobile, so I have assigned it 3 points.
* (5 points) React.js
    * A frontend framework for designing the UI with components and states
    * Used to update and render only necessary components when data changes
    * Challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points 

## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [Bootstrap 4](https://getbootstrap.com/)
2. [QR Code API](http://goqr.me/api/) 
3. [React](https://reactjs.org/)