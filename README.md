
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

#### Important Notes
- please note that a single drawing can be viewed publicly (without requiring user authentication), for example: `<localhost>/image/1` this is done to allow users to share the link to the drawing
- when a new user is registered, currently there is no email confirmation, the user has to remember these credentials and login using those credentials

#### Architecture & Technical Choices
* This application is built using ***React*** and ***Typescript*** in the frontend and ***NodeJs/MySQL*** in the backend
* State is passed down to lower level components using props. Webpack is used to compile the application
* Currently there is no ***Context*** API since at this phase it is not necessary but when the application grows larger using the ***Context*** API it is easier to pass data to lower level components
* Jest is used for testing (although no tests are written at this phase)
* ***ESLint*** is used to lint any javascript errors while developing
* ***Prettier*** is used to format the code automatically
* **SASS*** is used since it is easier to create styling, each component has it's own ***SASS*** file so that styles are kept separate and are easier to manage
* React ***hooks*** are easy to use and quicker to build business logic. There is a custom hook ***useHttp*** that intercepts ***"axios"*** requests in order to handle errors globally within the app, but to also attach the authentication jwt token (extracted from the local storage) on each http request, so that each request does not have to pass the jwt token specifically
* ***Typescript*** is used to detect issues while coding and prevent errors during runtime
* ***Bootstrap*** 4 is used in order to quickly build the UI but to also create a mobile layout easier
* ***FontAwesome*** is used for icons

#### TODO
- fix responsive layout issues
- format the datetime properly at thumbnails on drawing list UI
- **_useHttp_** is a custom hook that intercepts ***"axios"*** , add **Context** to the entire React app and when http response errors are intercepted, handle these errors globally i.e. show a modal on each error request so that each component does not have to handle errors individually
- ***NavBar*** component currently is loaded inside each component which is redundant, we need to load that on all components (if user authorization is valid)
- write tests using ***React Testing Library***
- use a wrapper for ***console.log()*** so that if a setting is switched to on/off at `src/config/config.js` all logs to the console would be enabled or disabled
- currently user can sign out by clicking on the user's first letter icon on the top right corner, however the process is abrupt, when a user takes an action we should display a modal confirmation so that they confirm the sign out process
- increase bodyParser limit to prevent errors on saving "heavy" images where the base64 encoded data becomes larger and is passed to the backend
- when user is registered, currently there is no email confirmation, the user has to remember these credentials and log in using those credentials, an email confirmation needs to be sent to the user so that they can approve the account creation
- in the future store users in AWS IAM and store the encoded image data in S3 as objects, this would be better for performance and it would be inexpensive as well