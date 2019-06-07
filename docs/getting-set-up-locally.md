# Getting Setup Locally

Create a local .env file with the following content

```
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
MONGODB=""
```

## MongoDB Database

- Go to https://www.mongodb.com/cloud/atlas
- create / sign in to account
- Create a project
- Create a cluster
- Click on Database Access and create a user
- Go back to clusters
- Click connect and choose "Connect Your Application"
- Copy the connection string into MONGODB in the .env file
- replace password with the users your created

## Google Oauth

- go to https://console.cloud.google.com
- Create a project
- Click the hamburger menu and go to API & Services > Credentials
- Create credentials for Oath client ID
- copy client id and secret into the .env file