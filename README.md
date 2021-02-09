# The Poop Tracker
![alt text](https://github.com/LukGit/frontend-poop-tracker/blob/master/src/img/Poop-track-screen.png?raw=true)
This is an app for users to report incident of dog poop not picked up by owners. User can take a picture with smart phone that captures GPS location and then report it through the app. Once reported, user can see all the dog poops within the zip code where the user lives (zipcode entered during signup).  

## Technical information

The app's frontend is built in JavaScript with React/Redux framework. The backend is Ruby on Rails with a PostgreSQL DB. All map rendering is done using Google Maps React. Photo GPS information is extracted using EXIF JS. JSON web token is also implemented for user authentication. Styling is impleneted using Sematic UI React with some CSS. 

## General operation

Once logged in, users are greeted with a local map showing markers respresenting the dog poops in their neighborhood. Map is automatically centered based on the registered zipcode of the user. User can click on New Report to report a unpicked-up dog poop. The form requires a photo, with embedded GPS data, to be selected. It also requires user to determine the size of the pile. Once submit button is clicked, GPS data will be extracted from photo and report is uploaded to backend. Sicne user can be out of his/her own zip code while reporting, the zipcode of the reported file is automatically determined and recorded based on the photo GPS. User is required to click the Exit button to close the form. Once closed, user will see an updated map with all the dog poop markers of various sizes showing the locations of unpicked-up piles. User can also filter reports by size or see reported poops outside the home zip code by unchecking the My Zip Only box. User can also recenter the map to a poop location by clicking on any poop marker. User can check local weather condition and forecast by clicking the weather button.


## Technical Notes

In order to use Google Maps, all components must be first imported from google-map-reacts: 

```javascript
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
```
An API key obtained in your google account must also be specified in the same container where map and its components are used:
```javascript
export default GoogleApiWrapper({
  apiKey: 'your-api-key-from-google'
})(MapContainer)
```
In order to use Sematic UI react, the following must be specified in the index.html file:
```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
```
To use EXIF JS, the following must be specified in the index.html file before importing into a component:
```html
<script src="vendors/exif-js/exif-js"></script>

```
In order to obtain current weather condition via Weather API, use this link: "https://api.weatherapi.com/v1/current.json?key=apikey&q=zip" (substitute apikey with your own key and zip with zip code in decimal)
```
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
