# ARtology Community Feedback Script 💯

## Prerequisites

- Visual Studio Code
- npm

## Setup Clasp

We are using clasp to connect to our google app script file in the cloud. Clasp allows us to push/pull our script to/from the cloud from our local machine. To install clasp run:

```
npm i @google/clasp -g
```

Type `clasp` in your terminal to verify it was installed. You should see a list of command line options if installed successfully.

### Login To clasp

```
clasp login
```

A browser window will appear prompting you to login to your gmail account. Make sure you login to your TW account.

### Enable Google App Script API

Enable your Google App Script API [here](https://script.google.com/home/usersettings)

### Access To The Script

Clone the [artology-community-feedback](https://github.com/thoughtworksarts/artology-community-feedback) repo to your local machine and run `npm i` to install dependencies.

## Deploying To The Cloud

In the root directory of the project run:
`npm run deploy`
