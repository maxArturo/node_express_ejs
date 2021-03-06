# Exploring Node

## About
This is a Node project, which I've been using to explore different server configurations, NPM packages, etc. The latest version is hosted on Heroku and can be viewed [here](https://node-express-ejs.herokuapp.com/) (it's on a free web dyno so it may take a second to spin up). These are the high-level steps I've taken thus far:

* started out with an implementation of the Express framework and EJS templating engine by running `$ express --ejs node_express_ejs` in the console ([ref](https://www.thenewboston.com/videos.php?cat=355))
* integrated Grunt with a simple JSHint watch to get started with tasks ([ref](https://www.youtube.com/watch?v=7YFzYrllHkI))
* experimented with, and ultimately abandoned, Bower for managing frontend libraries ([ref](https://medium.com/@nickheiner/why-my-team-uses-npm-instead-of-bower-eecfe1b9afcb#.eui39e8vb))
* added Grunt/Browserify tasks to manage base and view specific NPM libraries for the frontend, including Bootstrap, jQuery, D3, Underscore and Moment ([ref](http://codeofrob.com/entries/grunt+browserify+npm+application=success.html))
* built out a src/public file structure with basic dev and prod Grunt tasks
* setup Heroku deployment ([ref](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction))
* configured dev and prod environment variables ([ref](http://stackoverflow.com/questions/12401998/have-grunt-generate-index-html-for-different-setups))
* added frontend liveloading and webserver restarting in dev ([ref](http://thanpol.as/grunt/Grunt-with-express-server-and-Livereload))
* configured an uglify Grunt task in prod with package.json version in script src paths for cache busting ([ref](https://www.youtube.com/watch?v=bntNYzCrzvE))
* integrate SASS with .buildpacks, Gemfile and Gemfile.lock files for Ruby to install on Heroku deployment ([ref](http://stackoverflow.com/questions/15890076/how-to-setup-gruntfile-to-use-compass-sass-on-heroku/30073828#30073828))
* *Work in Progress*: setup a virtual machine using Vagrant and VirtualBox in preperation for adding a PG database, but ran into a gotcha with node_modules and EPERM on Windows ([ref](https://harvsworld.com/2015/how-to-fix-npm-install-errors-on-vagrant-on-windows-because-the-paths-are-too-long))

## Virtual Machine (*Work In Progress*)
* install [Vagrant](https://www.vagrantup.com/downloads.html) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads) (VM was configured with Vagrant v1.7.4 and VirtualBox v5.0.12)
* run `$ vagrant up`, which will download the VM and provision it with Ruby 2.2.0, Node 4.2.3 and the required node_modules (*Work In Progress*)
* run `$ vagrant ssh` to connect to the VM
* run `$ cd /vagrant` to access the root directory

## Production
* run `$ npm install`, which will install the required node_modules
* run `$ grunt prod`, which will build assets from the src folder into the public and views folders (run automatically after `npm install` in postinstall script)
* run `$ npm start` to spin up the webserver
* navigate to [localhost:8080](http://localhost:8080) in the browser

## Development
* run `$ npm install`, which will install the required node_modules
* run `$ grunt`, which will build assets from the src folder into the public and views folders, kick off some watch tasks (frontend liveloading, webserver restarting, etc), spin up the webserver and open [localhost:8080](http://localhost:8080) in the browser

## To do
* Verify if VM works on Mac/find a solution for Windows
* CRUD with a database
* React ([ref](https://blog.risingstack.com/the-react-way-getting-started-tutorial/))
* Tests (Jasmine with Jest)
