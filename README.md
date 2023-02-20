# Project for CSC424 class

# IMPORTANT REMINDERS

## HTTPS
### Frontend
HTTPS is enabled with Windows command, if another OS is used, the package.json file might need to change. Also you will have to generate your own certifications for the project. These can be stored in the reactcert folder.

### Backend
As far as I know, HTTPS is enabled for all operating systems. In this case, you will have to generate your own certifcations. Files are stored in the cert folder.

## Envrionmental Variables
This project uses .env file to hide secrets. One of them is a TOKEN_SECRET that is used for generating the JWT token. This means that you will have to create your own .env file

## Database
This project uses a local database MongoDB. This requires for you to have MongoDB installed on your computer. 

# Instructions
## Starting the Project
Assuming you are at the root folder
### Start the backend
`cd express-backend`
`node index.js`

### Start the frontend
`cd ./../react-frontend`
`npm start`

