# js-project

# Tic Tac Toe Game

## Introduction
This project is an advanced implementation of the classic Tic Tac Toe game. Built using HTML, CSS, and JavaScript, it includes user registration, login functionality, and player statistics tracking. Player details are stored using JSON.

## Features
- **User Registration:** 
  - Players are required to register by entering their name, age, and date of birth. This information is stored in a JSON file.
- **Login:** 
  - Registered players can log in by simply entering their name. The application verifies credentials against the stored JSON data.
- **Player Statistics:** 
  - The game tracks the number of wins, losses, and draws for each player. Statistics are managed and updated in the JSON file.
- **Game Play:**
  - The game is played on a 3x3 grid.
  - Player 1 (X) and Player 2 (O) take turns marking the spaces in the grid.
  - The first player to align three marks in a horizontal, vertical, or diagonal row wins.
  - If all nine squares are filled and no player has three in a row, the game ends in a draw.
- **Dynamic UI:** The interface updates in real-time to reflect the current game state and player statistics.

## Installation
To run this project locally:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open `index.html` in your web browser.

## How to Use
1. **Register:** 
   - Start by creating a new account using the registration form where you will enter your name, age, and date of birth. This data is stored in a JSON file.
2. **Login:** 
   - Log in using just your name. The application checks your credentials against the JSON data to authenticate your session.
3. **Play:** 
   - Enjoy the Tic Tac Toe game. Your game statistics will be tracked and saved in the JSON file.

## Technologies Used
- HTML
- CSS
- JavaScript
- JSON (for storing player details and game statistics)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
