
# DWGS

**DWGS** is a project that enables the creation of drawings using HTML5 Canvas.

Drawings are created in HTML5 Canvas and they are saved as base64 encoded strings on the MySQL database. The reasoning behind saving the drawings as base64 encoded strings instead of bitmap files (.jpg, .png etc) is that they preserve their quality and they are responsive to different screens and devices


## Instructions

### Step 1

Go to the root folder and install packages: `npm i`

### Step 2

Go to the root folder and start the server: `npm run dev`

#### Config Files

Config files are located at: 
* `src/config/config.js`
* `src/config/routes-config.js`


#### TODO
- work on responsive layout issues
- **_useHttp_** is a custom hook that intercepts 'axios' add **Context** to the entire React app and when http response errors are intercepted handle these errors globally 
- NavBar component currently is loaded inside each component which is redundant, we need to load that on all components (if user authorization is valid,  not on public facing components such as SingleImage component when it is accessed publicly)
- write tests us React Testing Library
- use a wrapper for console.log() so that if a setting is switch to on/off at `src/config/config.js` all logs to the console would be enable or disabled