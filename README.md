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

## Updating Script with new Artwork

1. In config.js, add new artwork's initials and name as key/value pairs to the 'artwork' object i.e: `'afl': 'A Fathers Lulliby'`.

2. In [Soft Launch - ARtology Feedback (Responses)](https://docs.google.com/spreadsheets/d/18F_tIALjo9PoAtQdsiqkgl4piwYnKXNEAE_JzPakjiU/edit#gid=871407089) Form Responses 1 sheet, find the column numbers that correspond with the artworks effectiveness score question on the feedback form. Then add those numbers to the effectiveScoreColumns, artworkEffectiveScoreColumns (create if does not exist) and artworkInteractiveExperienceColumns (if has interactive portion) arrays in config.js.

3. Add the arwork's effectivescore and InteractiveExperience arrays created in step 2 to the esColumnGroup and iesColumnGroup object in config.js.
