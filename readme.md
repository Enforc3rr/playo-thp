# Playo - Take Home Project

### Requirements :   
1. Expense Tracker
2. URL Shortener
3. QR Generator


### Tech Stack :
- Node.Js/Express.Js
- MongoDB
- Mocha + Chai (for testing)

#### Steps to run the application : `npm run start` 
#### Steps to run the test cases : `npm test`


API documentation -> https://documenter.getpostman.com/view/14030847/2s9Xy3srgD 


### 1. Expense Tracker
- Models 
  - User Model 
    ```
    firstName: String,
    lastName: String,
    emailId: : String | Unique,
    joinedAt : Date
    ```
  - ExpenseLog Model
    ```
    expense: Number ,
    ownedTo: String  | indexed,
    ownedBy: String  | indexed
    ```
    
- #### Note : User's data will flow using two ways in our System.
    1. Via normal **POST** `/user`
    2. If someone tries to add an expense of the person who is not present in our system yet, then a new entry would be created `users` collection but `joinedAt` field of that user would be `null`. That will help us to identify if that user has actually joined our application or not.

### 2. URL Shortener
- One of my key project is URL shortener (https://github.com/Enforc3rr/SMLLR). Pls check it out.

### 3. QR Generator
- Models
    - User Model
      ```
      firstName : String,
      lastName : String,
      emailId: : String | Unique,
      joinedAt : Date
      ```
  - User Model
    ```
    generatedBy : String | Index,
    generatedAt : Date,
    fileName : String | Index,
    contentToEncode : String
    ``` 
    



    
