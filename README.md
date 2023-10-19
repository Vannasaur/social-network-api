# Social Network API
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
## Description

This is an API for a social network web application where users can share their thoughts, react to other users' thoughts and create a friends list. This application uses Express.js for routing, a MongoDB database, and the Mongoose ODM. Please see User Story and Acceptance Criteria below:

User Story: 

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

Acceptance Criteria:

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list


## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)


## Installation

Please download Git BASH at https://gitforwindows.org/ if you are a Windows user. If you are a Mac user, please pull up the terminal on your Mac by pressing Command Spacebar and searching for terminal. 

Please also install the following programs: 

     - Node.js at https://nodejs.dev/en/download/
     - VScode at https://code.visualstudio.com/download
     - Mongoose at https://www.npmjs.com/package/mongoose
     - express at https://www.npmjs.com/package/express
     - Insomnia at https://docs.insomnia.rest/insomnia/install


## Usage

In order to use this application, open up your terminal (on Mac) or Git Bash (on Windows). CD into the folder that contains the social network code. Once in the folder, type `npm i` in order to install the dependencies listed in the package.json. Once everything is installed, type in `npm run start` in order to start the server.

Once your server is running, open up insomnia. Inside of insomnia, you can make get, post, put or delete requests to http://localhost:3001/api/users and http://localhost:3001/api/thoughts. Please refer to the route files to see which endpoints and routes are possible with the provided code. 

## Demo

Please see a demo of my application [here](https://drive.google.com/file/d/19QZvD4w7WFKP2ogPvWiDNoEhp8jEs2i9/view?usp=sharing).


## Credits

Badge for MIT License was made with [Shields.io](http://shields.io/) and taken from GitHub user: lukas-h. See below for the link to the license badge collection: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba


## License

MIT License, please refer to the LICENSE in the repo.

## Contributing

N/A

## Tests

N/A

## Questions

Please refer to my profile for additional projects: https://github.com/Vannasaur

If you have any questions please email me at: vannaluciano@gmail.com