const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registrationSection = document.getElementById('registration');
    const loginSection = document.getElementById('login');
    const gameSection = document.getElementById('game');
    const player1Display = document.getElementById('player1');
    const player2Display = document.getElementById('player2');
    const playerStats = document.getElementById('playerStats');

    let currentPlayer = null;
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let player1 = null;
    let player2 = null;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', handleReset);

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const age = document.getElementById('registerAge').value;
      const dob = document.getElementById('registerDOB').value;

      const player = {
        name,
        age,
        dob,
        gamesPlayed: 0,
        wins: 0,
        losses: 0
      };

      localStorage.setItem(name, JSON.stringify(player));
      alert('Registration successful! Please login.');
      registerForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('loginName').value;
      const player = JSON.parse(localStorage.getItem(name));

      if (player) {
        if (!player1) {
          player1 = player;
          player1Display.innerText = `Player 1: ${player1.name} (X)`;
        } else if (!player2) {
          player2 = player;
          player2Display.innerText = `Player 2: ${player2.name} (O)`;
          startGame();
        } else {
          alert('Two players are already logged in!');
        }

        displayPlayerStats(player);
      } else {
        alert('Player not found. Please register.');
      }

      loginForm.reset();
    });

    function handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const cellIndex = parseInt(clickedCell.getAttribute('data-cell-id'));
      
      if (gameState[cellIndex] !== '' || !gameActive) {
        return;
      }
      
      gameState[cellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      
      if (checkResult()) {
        gameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        updateStats(currentPlayer === 'X' ? player1 : player2, true);
        updateStats(currentPlayer === 'X' ? player2 : player1, false);
        return;
      }
      
      if (!gameState.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'Draw!';
        return;
      }
      
      togglePlayer();
    }

    function checkResult() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return true;
        }
      }
      return false;
    }

    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleReset() {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      
      cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
      });

      registrationSection.style.display = 'block';
      loginSection.style.display = 'block';
      gameSection.style.display = 'none';
    }

    function startGame() {
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      registrationSection.style.display = 'none';
      loginSection.style.display = 'none';
      gameSection.style.display = 'block';
    }

    function updateStats(player, won) {
      player.gamesPlayed++;
      if (won) {
        player.wins++;
      } else {
        player.losses++;
      }
      localStorage.setItem(player.name, JSON.stringify(player));
      displayPlayerStats(player);
    }

    function displayPlayerStats(player) {
      playerStats.innerHTML = `
        <p>Name: ${player.name}</p>
        <p>Games Played: ${player.gamesPlayed}</p>
                <p>Wins: ${player.wins}</p>
        <p>Losses: ${player.losses}</p>
      `;
    }

    function displayPlayerStats(player) {
      // Display statistics for both players if available
      let statsHTML = '';
      if (player1) {
        statsHTML += `
          <h3>Player 1 (${player1.name})</h3>
          <p>Games Played: ${player1.gamesPlayed}</p>
          <p>Wins: ${player1.wins}</p>
          <p>Losses: ${player1.losses}</p>
        `;
      }
      if (player2) {
        statsHTML += `
          <h3>Player 2 (${player2.name})</h3>
          <p>Games Played: ${player2.gamesPlayed}</p>
          <p>Wins: ${player2.wins}</p>
          <p>Losses: ${player2.losses}</p>
        `;
      }
      playerStats.innerHTML = statsHTML;
    }