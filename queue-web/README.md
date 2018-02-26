# Hello, HQueue Web

We recognize that doing a coding exercise at a whiteboard during an interview is
stressful and likely doesn't represent how you would do if you were to work on a
problem in your own time, in a comfortable environment.

Instead, we're asking you to implement a few features on this podcatcher app.
 We ask that you return this exercise to us in about a week.
 Out of respect for your time, we suggest that you timebox your efforts to several hours.
 If you would like to spend more
time getting familar with the frameworks/libraries or polishing your code, feel
free. We don't expect you to implement every suggested feature in the exercise.
We're really just hoping to learn how you think, and how you find your way
around a new and possibly confusing codebase.

This is a somewhat new way of doing technical interviews for us. Consider this
an alpha version, both in terms of the code as well as the process. We're
curious to hear what you think of the exercise and the process, and how we can
improve them.

If you have questions or get stuck during the exercise, please reach out to your
interviewer on the private Slack channel that you received by email.

## App

A podcatcher app built using [create-react-app](https://github.com/facebook/create-react-app).

## Getting Started
Node 6.3.1+ is the only prerequisite. Consider using [nvm](http://nvm.sh/) for
installation.

Fetch dependencies with `npm install`.  
Start the Expo dev server with `npm start`.  
Lint with `npm run lint`.  

## Structure

- There is a single state object for the application.
- Views should rarely if ever hold state.
- State should only be updated in store reducers.
- Actions should trigger state change.
- Store reducers are pure functions: state is passed in, and a new state object is returned. State should never be mutated.
- Side effects should occur via action creators or middleware.

Currently a static list of podcasts is used. Data is fetched,
parsed, and returned as a JSON array
representing the podcast feeds. That information is fed into the store and
drives the app. Actions send information from these lists of podcasts to the
store, where it is trickled down to a simple player component in order to play audio
and display metadata.

## TODO

Currently a user is able to play a podcast episode. Your task is to implement
a playlist/queue with some subset of the following functionality:
- allow a user to add a podcast episode to a queue
- once an episode ends, the next queued episode should play automatically
- render the queue within the application
- allow a user to remove an episode from the queue
- allow a user to reorder episodes in the queue
- allow a user to play an episode directly from the queue

- fix bug when you load the URI http://localhost:3000/podcast/Song-Exploder the podcast data is not loaded
- clean up the styling

Though the main task is implementing the queue, please feel free to implement
additional features if you like. This is your chance to shine: show us what you
think is a good representation of your skills and interests.

## What We're Looking For

There are likely more tasks than you will be able to complete in the suggested
week timeframe. We encourage you to focus on tasks and implementation details that
highlight your skillset and interests; fewer tasks done well is better than more
tasks done at a lower degree of fidelity. Additionally, feel free to "fill in
the gaps" by explaining in TODO.md what you would do and how you might do it
given more time.

In addition to functionality, we also look at architecture, organization,
linting and style, and overall polish. We're looking for idiomatic modern
JavaScript that matches the established style of the existing codebase. 
We're looking for a mobile app that makes sense in terms of navigation 
and feel.  We value
code that is easy to follow and understand, without stale or commented-out
sections. Aim for code that you would be proud to deploy.

Lastly, this exercise does not have to be done in isolation. We encourage you to
ask questions as you familiarize yourself with the codebase, architecture, and
application. You should have received an email invite to a private Slack channel
where you can discuss questions with your interviewer. Feel free to reach out or
work alone, whichever suits you.

And remember, the purpose of this exercise is to help you demonstrate your
abilities on your own time in a low-pressure environment. Have fun with it!

## Saving and Submitting

- Work directly on master
- Commit your work to that branch (make sure not to leave uncommitted work!)
- Please do NOT include your name or other indentifying information in your
commit messages or code, as we review submissions anonymously to reduce bias
- Remove node_modules from the project, create a zip, and send it back to us
- Feel free to use TODO.md to include any additional thoughts or comments on
the app, your implementation, or what you would do if given more time.

