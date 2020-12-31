# Would-you-rather
The project is located [here](https://github.com/janroijen/would-you-rather).

## Introduction
This project was created as part of the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019). The app presents participants with choices between two options at a time and records their choice. For example: "would you rather write JavaScript" or "would you rather write Swift". After recording the participant's choice, the App shows how many users chose eiher choice.

Participants can also create new questions and see their position on a leaderboard. This board ranks participants according to the sum of questions they answered and created.

Finally, the app allows users to log in and out. This feature is merely a selection of a username from three hardcoded usernames. There is no authentication.

## Purpose
My goal in this project was experimenting with React.js. The project uses Redux and the Redux toolkit to manage the state of the frontend application. It uses React Router for navigation.

The project uses Google's material design system for styling.

## Installation
To run this project:
* Install dependencies with `npm install` and
* Start the development server with `npm start` (by default the server runs listens at localhost:3000)


The backend is only used for statically serving the app. The *database* of questions is just maintained in the frontend and does not persist across sessions.

