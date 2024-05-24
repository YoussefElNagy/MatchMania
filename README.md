# MatchMania

## Overview

MatchMania is designed to refresh and test the player's memory. The game board consists of 16 cards arranged in a 4x4 matrix. Initially, 
all cards display the same back face image. Each pair of cards has a matching face image. 
The objective of the game is to match all pairs of cards by flipping them two at a time. 
The game provides a counter to track the number of flips and a reset button to restart the game as well as a timer for countdown.

## Gameplay

1. **Starting the Game:**
   - The game board displays 16 cards with their back faces up.
   - Each pair of cards has a matching face image.

2. **Flipping Cards:**
   - Click on a card to flip it and reveal its face image.
   - Click on another card to flip it and reveal its face image.
   - If the two images match, the cards remain face up and are excluded from further gameplay after 5 seconds.
   - If the two images do not match, the cards flip back to their back faces after 5 seconds.

3. **Game End:**
   - The game ends when all pairs of cards have been matched and removed from the board.
   - The game also ends when the player presses the reset button or when the time is up.

4. **Reset Button:**
   - Resets the counter and timer.
   - Redistributes the eight images randomly among the 16 cards.

5. **Counter:**
   - Tracks the number of flips made by the player.

6. **End Messages:**
   - A victory message is displayed when all pairs are successfully matched.
   - A game over message is displayed when the player presses the reset button before matching all pairs.

## Features

- **Interactive Gameplay:** Click to flip cards and match pairs.
- **Counter:** Counts the number of flips made by the player.
- **Reset Button:** Resets the game and shuffles the cards.
- **End Messages:** Displays a success message on completing the game and a fail message on losing.

## Setup and Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/YoussefElNagy/MatchMania/
   cd MatchMania
2. **Open the Game:**
Open index.html in a web browser to start playing the game!

## References
github.com/WebDevSimplified/Mix-Or-Match

