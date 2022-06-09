# Alura challenge API

This challenge was made to test my knowldge of some technologies.

Here you will go through an api rest that will use tokens to authenticate the user.

You will be able to add expenditures and receipts of your month but only if you are logged in and authenticated.

<br/>

## You can test the api by the following url:

        https://voltz-challenge.herokuapp.com/

### You can test the routes using [Postman](https://www.postman.com/downloads/) or [Thunder Client](https://www.thunderclient.com/)

<br>
<br>

## Possible User Routes

        Register User:
                
                POST /register

        Login user:
                
                POST /login

        Logout user:
                
                POST /logout

        Update Token:
                
                GET /updateToken

        *The update token route must be sent with the token in the header and a refresh token in the body.
        Body: {refreshToken: "refreshToken"}
<br>

## Possible Recipts Routes

        List Recipts:

                GET /recipts
                
        List Recipts of specific description:

                GET /recipts/?description=

        List Recipts by id:
                
                GET /recipts/:id

        List Recipts by year and month:
                
                GET /recipts/:year/:month

        Insert Recipt:
                
                POST /recipts

        Update Recipt:

                PUT /recipts/:id

        Delete Recipt:

                DELETE /recipts/:id

        *all the routes above must be sent with the token in the header.

## Possible Expenditures Routes

        List Expenditures:

                GET /expenditures
                
        List Expenditures of specific description:

                GET /expenditures/?description=

        List Expenditures by id:
                
                GET /expenditures/:id

        List Expenditures by year and month:
                
                GET /expenditures/:year/:month

        Insert Expenditure:
                
                POST /expenditures

        Update Expenditure:

                PUT /expenditures/:id

        Delete Expenditure:

                DELETE /expenditures/:id

        *all the routes above must be sent with the token in the header.

## Possible Resume Routes

        List Resume by year and month:

                GET /resume/:year/:month

        *all the routes above must be sent with the token in the header.


    
## If you want to run the API on your local machine follow the tutorial bellow

<br>

# Installation (Linux)

### 1. Download the repository

        git clone git@github.com:RafaelNMeyer/challenge_back-end_alura.git

### 2. Install the dependencies

        npm i

### 3. If you don't have PostgreSQL installed. If you do, skip this one

        sudo apt install postgresql postgresql-contrib

### 4. Connect to postgres via terminal

        sudo su postgres

        psql
    
### 5.  Create the database

        CREATE DATABASE <database_name>;

Replace <database_name> with the name you want to give to your database

Now you can close this terminal.

<br/>

### 6. Run the dump sql

<br>

For this next step, open a new terminal and change the directory to the project root folder.

Then switch to user postgres running the first command on **step 4.**

After that run the command bellow

        psql database_name < alura_challenge.sql

Again, make sure the terminal directory has the same path to the project

<br/>

### 7. Create a env file inside the project folder

        touch .env.dev

Follow the .env.example

<br/>

### 8. On the .env.dev file, fill in the **DATABASE_URL** following the example bellow:

        'postgres://user@host:port/database'

## 8.1 If your database needs password, follow the example bellow:

        'postgres://user:password@host:port/database'

You should replace the values in the command:

- user : postgres (<-- it is the default user)
- host : localhost
- port : 5432
- database : The name you gave to your database on the **step 5.** 

<br>

# Run the app

        npm run dev

<br>

# Run the tests

        npm run test-once


<br>