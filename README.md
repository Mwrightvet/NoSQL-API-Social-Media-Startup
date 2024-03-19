# SocialNet API: A NoSQL Startup

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
by Melissa Wright

This project, SocialNet API, tackles the challenge of building an API for a social network web application using MongoDB, Express.js, and Mongoose ODM. The aim is to handle large amounts of unstructured data typical in social networking platforms. The API enables users to share thoughts, react to friends' thoughts, and manage friend lists.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
  - [Models](#models)
  - [API Routes](#api-routes)
- [Demo Video](#demo-video)
- [Credits](#credits)
- [License](#license)

## User Story

As a social media startup, I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.

## Acceptance Criteria

- Server starts and Mongoose models sync to MongoDB database.
- GET routes in Insomnia for users and thoughts display formatted JSON data.
- POST, PUT, and DELETE routes in Insomnia successfully create, update, and delete users and thoughts.
- POST and DELETE routes in Insomnia successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.

## Installation

Follow these guidelines to set up models and API routes:

### Models

**User**

- `username`: String, Unique, Required, Trimmed
- `email`: String, Required, Unique, Must match a valid email address
- `thoughts`: Array of \_id values referencing the Thought model
- `friends`: Array of \_id values referencing the User model (self-reference)

**Thought**

- `thoughtText`: String, Required, Must be between 1 and 280 characters
- `createdAt`: Date, Default value set to the current timestamp
- `username`: String, Required
- `reactions`: Array of nested documents created with the reactionSchema

**Reaction (Schema Only)**

- `reactionId`: Mongoose ObjectId data type, Default value is set to a new ObjectId
- `reactionBody`: String, Required, 280 character maximum
- `username`: String, Required
- `createdAt`: Date, Default value set to the current timestamp

### API Routes

- `/api/users`

  - GET all users
  - GET a single user by its \_id and populated thought and friend data
  - POST a new user
  - PUT to update a user by its \_id
  - DELETE to remove user by its \_id

- `/api/users/:userId/friends/:friendId`

  - POST to add a new friend to a user's friend list
  - DELETE to remove a friend from a user's friend list

- `/api/thoughts`

  - GET to get all thoughts
  - GET to get a single thought by its \_id
  - POST to create a new thought
  - PUT to update a thought by its \_id
  - DELETE to remove a thought by its \_id

- `/api/thoughts/:thoughtId/reactions`
  - POST to create a reaction stored in a single thought's reactions array field
  - DELETE to pull and remove a reaction by the reaction's reactionId value

## Demo Video

[![Walkthrough](./assets/video-walk-through.gif)](./assets/video-walk-through.gif)


## Credits

UCB Class Material 
Source Code assistant:  Learning Assistant 
Stack Overflow 

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
Please refer to the LICENSE in the repo.
