
# Meeting Room Booking System for Co-working spaces

Meeting Room Booking System is a web application designed to streamline the reservation process for co-working spaces. It enables administrators to manage room details, create time slots, and oversee bookings, while users can effortlessly book available slots for meeting rooms. The system incorporates robust user authentication, detailed validations, and informative error handling to enhance user interaction. Built with TypeScript, Express.js, and Mongoose, this platform ensures a smooth and efficient booking experience, promoting real-time availability checks and conflict-free scheduling for various co-working spaces.


## Tech Stack

**Programming Language:** Typescript

**Server:** Node, Express

**Database:** MongoDb (Mongoose) 

**Authentication & Authorization:** JWT 




## Features

- **User Authentication**: Secure login and registration system for users and administrators with roles specified for access control.
- **Dynamic Room Management**: Admins can add, update, and remove meeting rooms, including details like room name, number, floor, capacity, and amenities.
- **Slot Scheduling**: Administrators can create time slots for each room, specifying start and end times, which helps in planning availability accurately.
- **Real-time Availability**: Users can view real-time room and slot availability to make informed booking decisions without the risk of double-booking.
- **Automated Billing**: The system calculates the total cost based on the number of slots booked and the per slot price, simplifying the payment process.
- **User-driven Booking**: Allows users to book slots for specific dates and times, providing flexibility and convenience in scheduling.
- **Soft Deletion**: Admins can perform soft deletes on rooms and bookings, ensuring data recovery and audit trails are maintained.
- **Comprehensive Error Handling**: Robust error handling mechanisms to manage validation errors, database errors, and other runtime exceptions, providing clear feedback.
- **API Security**: Secured API routes with Bearer token authentication to ensure that only authenticated users can access sensitive operations.
- **Cross-platform Compatibility**: Designed to work seamlessly across different devices and platforms, enhancing accessibility for all users.

## Run Locally

Clone the project

```bash
  https://github.com/shohaib1996/meeting-room-system.git
```

Go to the project directory

```bash
  cd meeting-room-system
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```
**It will run at the: [http://localhost:5000/](http://localhost:5000/)**
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You have to create a .env file at root directory and paste this.

`NODE_ENV = development`

`PORT = 5000`

`DB_URL= mongodb+srv://meeting-room-system:3Ya1HeylpIoeAFsL@cluster0.lapzl7c.mongodb.net/meeting-room-project?retryWrites=true&w=majority&appName=Cluster0`

`BCRYPT_SALT_ROUND = 10`

`JWT_ACCESS_SECRET = 9174b804d5b0824161a740d01807a9698a603d850c33c5148f9875cf7f6d2805f5198805b75799ea01d53b8f446638c9c1e052425e7ce97c3278a32192461125`

`JWT_ACCESS_EXPIRES_IN = 1d`


## Live site

If you don't want to run the project locally just go to this link

**[Live site](https://meeting-room-system.vercel.app/)**


## Usage/Examples

To create a user go to the postman or from client enter this URL
`http://localhost:5000/api/auth/signup`(localhost) or `https://meeting-room-system.vercel.app/auth/signup`(LiveSite)

```javascript
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
  
```

* To login enter this URL
`http://localhost:5000/api/auth/signup`(localhost) or `https://meeting-room-system.vercel.app/auth/signup`(LiveSite)

```javascript
{
    "email": "web@programming-heroo.com",
    "password": "ph-password"
}
  
```

**Resonse will be like**

```javascript
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvby5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxODkwMDU2MSwiZXhwIjoxNzUwNDM2NTYxfQ.v3lbkY61rYPJ1JHsyJPAyzCgJJxF5w84S5SOJCuiZ90",
    "data": {
        "_id": "6672cf83db27b81c0a622b7f",
        "name": "Programming Hero",
        "email": "web@programming-heroo.com",
        "phone": "1234567890",
        "address": "123 Main Street, City, Country",
        "role": "user"
    }
}
  
```
