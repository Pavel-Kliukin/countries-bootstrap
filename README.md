# Countries app on React with Redux



![Home page](https://github.com/Pavel-Kliukin/countries-bootstrap/assets/98514950/74ec9b18-f219-4b64-898e-c217329a0efe)

![Countries page](https://github.com/Pavel-Kliukin/countries-bootstrap/assets/98514950/893a71d2-a082-4d98-bc47-2439a79b3a59)

![Country page](https://github.com/Pavel-Kliukin/countries-bootstrap/assets/98514950/7b1b5bcf-6552-4465-a460-1ddd2ca00fe5)

## Here you can try it [https://countries-redux.netlify.app/](https://countries-redux.netlify.app/)

**This app has authentication, so to try it you should register first.**  
**It's easy!**  
**Just enter any name, any email address (you don't have to confirm it) and choose any password.**

## This app was created on React with Redux

It uses [Google Firebase](https://firebase.google.com/) to handle authentication and user's Favourite countries

It also uses four APIs:
- [REST Countries](https://restcountries.com/) to get countries info
- [Google maps API](https://developers.google.com/maps) to show countries maps
- [Unsplash API](https://source.unsplash.com) to show random pictures of every country
- [Open Weather](http://openweathermap.org) to get the country's capital weather

### If you whant to run this app's code on your machine, you should:
1. Register at [Google Firebase](https://firebase.google.com/), create a new project and get the API-key and other connection required data there.
2. Register at [Google maps Platform](https://developers.google.com/maps) and connect your Firebase project to the maps platform. In this case you will be able to use your Firebase API-key to get the maps of the countries.
3. Get the API-key from the [Open Weather](http://openweathermap.org).
4. Clone this repository to your machine.
5. Install the dependencies with `npm install`.
6. In app's root folder create an .env file and fill it with your own data, like this:
   ![Screenshot 2023-10-17 at 17 33 39](https://github.com/Pavel-Kliukin/countries-bootstrap/assets/98514950/dcc64d8b-7c80-4bb1-893d-6a10c0ace873)
7. And finally, you can start this app with command `npm start`.
