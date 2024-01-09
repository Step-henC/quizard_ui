# Quiz Making App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A working demonstration can be found in [my linkedin post!](https://www.linkedin.com/posts/stephen-e-cunningham-7077b6239_as-i-was-studying-for-comptia-exams-there-activity-7148860602315141120-6p69?utm_source=share&utm_medium=member_desktop)


## App Background

This is the UI for a Quiz Making app that I have called `Quiz Blank`. The backend service for this app [can be found here](https://github.com/Step-henC/quizard_backend_go)
This app allows for completions of self-assessment quizzes. Ideal for people like me preparing for exams and certifications. Ulitmately, this app became an excuse to work with tools 
I found exciting during my reading. 

## How is this app built.

Quiz Blank or quizard uses [Apollo GraphQL](https://www.apollographql.com/docs/react/data/mutations/) server to send mutations to the Elasticsearch backend with link in the `App Backgorund` section. 

### State management

Quiz Blank makes use of Apollo's built-in memory cache for [state management](https://www.apollographql.com/docs/react/local-state/local-state-management/). As a result, fewer network calls are needed as the database becomes eventually consistent with the apollo cache. Also, local state management with cache make for a smoother user experience. 

## How To Run Quiz Blank 

#### NPM installed

Enter the project's directory and type the following command: `npm run start`.
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

#### Run with Docker

For those with no npm, make sure you have [Docker Engine installed](https://docs.docker.com/engine/install/)
Build the image in the Dockerfile in the root directory.

`docker build -t quizard_fe:latest .`

Then run the container 

`docker run --name quizard_frontend -p 3000:3000 -d quizard_fe:latest`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Considerations
 - State storage: Writing to Apollo GraphQL in-memory cache may not be as quick to develop with for local state management as oppose to use Redux or IndexedDB for state management.



