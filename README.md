# MagoEat App - Backend

## Tech stacks

1. NodeJs - ExpressJs
2. Database: MongoDB 
3. ORM: Mongoose
4. Validation: [Joi](https://joi.dev/api/)
5. Authentication & Authoriwation: JsonWebToken
6. SMS System: Twilio

## Get Started

:danger: This is a personal project, to contribute, feel free to contact the author and request to contribute, with the author's authorization, this project can be forked

### Prerequisites

Before stating contributing to this project, kindly make sure you master one of the specified tech stacks 
To get a copy of this project you need: 

1. Install NodeJs cli in your computer
2. At least one code editor installed
3. At least one testing tool for the backend [Postman](https://www.postman.com/) is a best example

### Instructions

4. Clone this repo
```
$ git clone https://github.com/pacyL2K19/magoEat-BackendV1.git
```
5. Go to the directory
```
$ cd magoEat-BackendV1
```
6. Install all the packages
```
$ npm install
```
7. Generate your `.env` file following the `.sample.env` template
8. Run the project 
```
$ npm run start 
```
At this point the project should run at 
[http://localhost:YOUR_PORT](http://localhost:8080)

9. Start contribuiting by creating a branch following the `Git Workflow` specifying the feature you need to add to the project ex: `feature/add_custom_restaurants_model`
10. Create a Pull request from your branch to the development branch
11. **[Optional]** Notify the owner to consider your contribution

### Test routes

1. User's routes
- *[POST]* **Login**: To login in the app
> - path: `api/auth/login`
> - Authorization: No
> - body: 
> ```
{
    username: String[Required]
    password: String[Required]
}
- *[POST]* **Signup**: To create a user account
> - path: `api/auth/signup`
> - Authorization: No
> - body: 
> ```
{
    username: String[Required]
    password: String[Required]
    confirmPassword: String[Required]
    phone: Number[Required]
    email: String[Required] - email address
    avatarUrl: String[Optional]
    verified: Boolean[Default]
    role: String[Default]
}
- *[PUT]* **Update**: Updates users infor 
- Get list of users 
- Get list of owners

2. Orders routes
- Get all the orders:
- Get orders by users:
- Get orders by restaurants:
- Cancel an order: 
- update order status:
- Rate an order:
- Get full history of orders by user:

3. Restaurants
- Get full list of restaurants
- Update Restaurant informations 
- Hold a restaurant 
- Get restaurant menu 
- Delete a restaurant

4. Items (Repas in the App context)
- Create an item: 
- Delete an item 
- Put Coupon 

## Project structure

    |── src/
        ├── constatnts/
            ├── status-code.js
        ├── controllers/
            ├── category.controller.js
            ├── order.controller.js
            ├── repas.controller.js
            ├── restau.controller.js
            ├── users.controller.js
        ├── middlewares/
            ├── auth.middleware.js
        ├── models/
            ├── category.model.js
            ├── order.model.js
            ├── repas.model.js
            ├── users.model.js
        ├── routes
            ├── auth.routes.js
            ├── order,routes.js
            ├── repas.routes.js
            ├── restaus.routes.js
            ├── users.routes.js
        ├── validators
            ├── category.validators.js
            ├── order.validators.js
            ├── repas.validators.js
            ├── restau.validators.js
            ├── users.validators.js
        ├── app.js
        └── index.js
    ├── screenshots/
        ├── capst.PNG
    ├── .gitignore
    ├── .env (to be recreated)
    ├── .sample.env
    ├── package-lock.json
    ├── package.json
    ├── eslintrc.json
    ├── eslintrc.json.
    ├── README.md

## Author

👤 **Pacifique Linjanja**

- Github: [@pacyL2K19](https://github.com/pacyL2K19)
- Twitter: [@PacifiqueLinja1](https://twitter.com/PacifiqueLinja1)
- Linkedin: [Pacifique Linjanja](https://www.linkedin.com/in/pacifique-linjanja/)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/pacyL2K19/my_ruby_linter/issues).

## Show your support

Give a ⭐️ if you like this project! 

## License

This project is [MIT](lic.url) licensed.

