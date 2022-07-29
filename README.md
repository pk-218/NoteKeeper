# Note Keeper

This is a web application deployed using Heroku at [https://mern-note-keeper.herokuapp.com/](https://mern-note-keeper.herokuapp.com/)

## Tech Stack

- MongoDB Atlas serving as cloud database
- Express.js for middleware
- React.js as frontend library
- Node.js for JavaScript backend runtime.

---

### Design

- Bootstrap - A frontend framwork for styling
- Material UI - Provides React components such as Zoom, Fab and several icons
- Material Design - For colour scheme
- Transparent Textures - For transparent and customized background textures.

## Installation

Clone this repository by

```
git clone https://github.com/pk-218/NoteKeeper.git
```

Then install the dependencies mentioned in package.json

```
cd NoteKeeper
npm install
```

For client dependencies

```
cd client
npm install
```

Create a .env file at the root of the folder and add your MongoDB Atlas URI

```
ATLAS_URI=mongodb+srv://username:password@cluster0-yo0nm.mongodb.net/notesDB
```

With the help of concurrently dependency, now both client and server can run locally using

```
npm run dev
```

Your app will now run on localhost:3000
