# 1 - Hello World

In this step we will create a new React project using *create-react-app* and then remove the "out of the box" stuff to put us at a clean slate.

## Creating a project

Use a terminal of your choice and navigate to where ever you would like your new project to be created, and then run:

```bash
npx create-react-app todo-list
```
 *(Using npx instead of npm runs the tool without intalling it.)*

When the installation is complete, navigate to the root of the project and run:

```bash
npm install
npm run start
```

You should now have the create-react-app template running on localhost:3000, which means that you've just created your very own React application!

## Inspecting our project

### package.json
Start by looking at *package.json*. The most important things to remember is what we can do thanks to *create-react-app*:

* start
    * Runs our application in a hot-reload mode.
* build
    * Creates a package ready to be published.
* test
    * Starts the test runner.
* eject
    * ***NOT RECOMMENDED!***
    * Ejects your project from the harness of create-react-app.

The magic behind all this comes through *react-scripts*. If you browse the dependencies for that package in *package-lock.json* you will find that it contains a bunch of packages for transpiling and bundling that are used behind the scenes.

### public

In the public-folder we find everything that are exposed when we run a server to serve our app. This is where, among other things, we find our index.html with the entry point to our application *(the div with id set to root)*.

### src

The src-folder is where we put the code that makes up our application. This is the folder we will need to clean to get rid of the template we got when we ran *create-react-app*.

## Cleaning our project

Start by removing ***everything except index.js*** from the src-folder and then all ***content from index.js*** to get a clean slate.

*index.js* is the entry point for our code so this is where we will create our React App and insert it into a div in *index.html* by telling *ReactDOM* to render to that specific div. Enter the code below into *index.js*.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <h1>Hello World!</h1>
  </React.StrictMode>,
  document.getElementById('root')
);
```

It might not be much to look at, but we now have an empty project for React development!