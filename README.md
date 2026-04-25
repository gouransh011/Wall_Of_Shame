# Wall of Shame 
This is a simple platform where developers can post code snippets they are not proud of, along with a short confession. Other users can view these snippets and leave comments.

The app is anonymous and does not require any login.

---

## What it does

- Post a snippet of bad code along with a confession
- Anyone can view all snippets on the wall
- Click on a snippet to read or leave comments
- Only the person who posted can delete their own snippet/comment
- A profile page that shows everything you've posted from your browser

---

## How identity works (no login required)

When you open the app, your browser gets assigned a random ID and saved in `localStorage`.  
That ID is sent along whenever you post something — so the app knows it's you without needing a username or password.  


---

## Running it locally

You'll need [Node.js](https://nodejs.org/) installed.

**1. Clone the repo**
```bash
git clone <repo-url>
cd Wall_Of_Shame
```

**2. Start the backend**
```bash
cd server
npm install
node index.js
```
Server will start at `http://localhost:5000`

**3. Start the frontend** (open a new terminal)
```bash
cd Wall_Of_shame/client/wall_of_shame 
npm install
npm run dev
```
Frontend will be at `http://localhost:5173`

**4. Open your browser and go to `http://localhost:5173`**

---

## Tech used

- **Frontend** — React, Vite
- **Backend** — Node.js, Express
- **Database** — a local `db.json` file
- **Styling** — plain CSS

---

## Screenshots

**The Wall — posting and viewing snippets (your own browser)**  
Each card shows the confession, the bad code, and a "View Comments" button.  
The "Delete Snippet" button only appears on snippets posted from your browser.

![Wall page - own view](./screenshots/WallpageUser1.png)

---

**Same wall opened in a different browser**  
No delete buttons visible — ownership is tied to the browser that posted it.

![Wall page - other user view](./screenshots/WallpageUser2.png)

---

**Comments expanded**  
Clicking "View Comments" reveals existing comments and lets anyone add one.

![Comments section expanded](./screenshots/WallpageUser2.png)

---

**Profile page — your browser's history**  
Shows all snippets and comments you've posted, stored locally in your browser.

![Profile page - User 1](./screenshots/ProfilePage1.png)

---

**Profile page — different browser, different history**  
A completely separate identity with its own set of posts and comments.

![Profile page - User 2](./screenshots/ProfilePage2.png)
