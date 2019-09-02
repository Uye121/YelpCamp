
# YelpCamp

**YelpCamp** is a Node.js web application with RESTful routing from the Udemy course [The Web Developer Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/). This app contains secret keys and codes that were removed from the public build and on Github, so some features will not work as expected. 

### Live Demo
To see the app in action, go to [https://yelp-camp-0819.herokuapp.com/](https://yelp-camp-0819.herokuapp.com/).

### Features
* Authentication:
  
  * User login with username and password

  * Admin signup with admin code

* Authorization:

  * Authentication is required to manage posts

  * User can only edit or delete their own posts and comments

  * Admin can edit and delete posts and comments

* Campground functionalities:

  * Create, edit and delete posts and comments

  * Upload and edit campground photos

  * Add and edit campground pricing

  * Display campground location on Google Map

* Misc:

  * Flash messages for user's successful or failed interaction

  * Responsive web design

## Getting Started

### Setup
You will need a Cloudinary account, Google account, and MongoDB Atlas (or any database of your choice) account to develop all of the features of this app. 

### Clone this repository

```
git clone https://github.com/Uye121/YelpCamp.git
```

### Update and install these package first

```shell
$ npm install
```
or
```shell
$ yarn install
```

Set up environment variables in a .env file and the project is good to go!

## Built With

### Front-end
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
* [ejs](https://ejs.co/)
* [Google Map API](https://cloud.google.com/maps-platform/)

### Back-end

* [body-parser](https://www.npmjs.com/package/body-parser)
* [cloudinary](https://cloudinary.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://expressjs.com/)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [multer](https://www.npmjs.com/package/multer)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)

### Deployment

* [Heroku](https://www.heroku.com/)