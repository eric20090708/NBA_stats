# NBA Stats

## Introduction

Welcome to the NBA Stats, a place where you can dive into the world of basketball statistics through a visually compelling and user-friendly interface. Designed to enrich your NBA experience, the app offers a modern, Netflix-inspired background video on the homepage and a range of interactive features to keep you up to date with the latest player stats.

## Features

- **Engaging Background Video**: A Netflix-style video that dynamically plays in the background, setting an exciting tone for your stats exploration.
- **Secure Search Bar**: Find your favorite NBA players using the secure search bar, which includes data sanitization to prevent XSS exploits.
- **Leaderboard Sidebar**: A sidebar that displays NBA statistical leaders with pagination, allowing you to view more players without overwhelming the interface.
- **Suggestion System** : On each player's page, discover new favorites with the "You May Also Like" feature, which recommends the players you may be interested in.
- **Efficient Data Handling** : With a plethora of data available on the leaderboard, the app employs a smooth progress bar, providing a visual cue of data loading in real-time, which ensures you are informed about the data retrieval process without interrupting your experience.

## Features

* **Dynamic Background Video** : Experience the excitement of NBA with a full-screen video background inspired by popular streaming platforms, energizing your stats exploration journey.
* **Secure and Intelligent Search** : Dive into player statistics with confidence; the search bar not only prevents XSS exploits with robust data sanitization practices but also offers intelligent suggestions based on your input.
* **Suggestion System** : On each player's page, discover new favorites with the "You May Also Like" feature, which recommends similar players based on playing style, statistics, and user search patterns, enhancing your discovery and exploration of players.
* **Efficient Data Handling** : With a plethora of data available on the leaderboard, the app employs a smooth progress bar, providing a visual cue of data loading in real-time, which ensures you are informed about the data retrieval process without interrupting your experience.
* **Interactive Leaderboard** : The leaderboard sidebar is more than just statistics; it’s a gateway to a deeper dive into the NBA universe. With client-side pagination, you can effortlessly move through vast sets of data, discovering leaders across different categories.

## Objectives Accomplished

- **Creative and Engaging Data Display**: I've designed the app with a creative edge, incorporating video and interactive elements to enhance your experience.
- **Efficient Initial Load**: The homepage is rendered server-side for an optimized initial loading experience.
- **Smooth Pagination**: Navigate through player statistics seamlessly with the built-in pagination feature.
- **Robust Testing**: A Jest test suite has been written and passed to ensure the app's components function as intended.

## Installation and Usage

### Running the Application

To launch the NBA Stats locally:

1. Install the necessary dependencies by running:

```bash
npm install
```

2. Then, start the server with:

```bash
node server.js
```

Access the app through your web browser at [http://localhost:3000](http://localhost:3000).

### Running Jest Tests

Ensure the quality and stability of the app by executing:

```bash
npm test
```

This command runs the suite of Jest tests I've created.

## Contribution

I am open to suggestions and feedback. If you have ideas for improvement or want to discuss the app, feel free to reach out.
