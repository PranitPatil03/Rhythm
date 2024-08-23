
# Rhythm 🎵

**Rhythm** is a responsive and interactive music player application built with ReactJS. This project showcases a modern UI design, fluid animations, and a seamless user experience with music control and dynamic UI changes.

## 🌐 Live Demo

Check out the live demo: [Rhythm on Vercel](https://rhythm-iota.vercel.app/)

## 🚀 Features

- **Responsive Design:** The UI adapts to different screen sizes, ensuring a great user experience across devices.
- **Dynamic Background:** The background gradient changes according to the cover image of the currently playing song.
- **Music Controls:** Play, pause, next, and previous controls with a smooth seeker.
- **Tab Navigation:** Switch between "For You" and "Top Tracks" tabs seamlessly.
- **Search Functionality:** Quickly search for your favorite tracks.
- **Persistent Playback:** Music continues playing even if you navigate to another tab.

## 📸 Screenshots

![Mobile View](public\mobile.png)
![Desktop View](public\desktop.png)

## 🛠️ Installation & Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/PranitPatil03/Rhythm.git
    cd rhythm
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

4. **Open your browser:**

    Visit `http://localhost:5173` to view the app.

## 🔧 Technologies Used

- **ReactJS:** For building the user interface.
- **TailwindCSS & Shadcn/UI:** For styling components.
- **Axios/Fetch API:** For fetching song data from the REST API.
- **Vercel/Netlify:** For deployment.

## 📡 API Reference

This application fetches data from a REST API:

- **Songs List API:** `https://cms.samespace.com/items/songs`
  
  Example to fetch a cover image:

  ```plaintext
  https://cms.samespace.com/assets/{COVER_IMAGE_ID}
  ```
