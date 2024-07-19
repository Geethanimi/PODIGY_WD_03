window.addEventListener('DOMContentLoaded',() => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.player');
    const resetbutton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYER_X_WON ='PLAYER_X_WON';
    const PLAYER_O_WON ='PLAYER_O_WON';
    const TIE ='TIE';

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
     
    function handleResultValidation() {
        let roundWon =false;
        for (let i =0;i<=7;i++) {
            const WinCondition =winningConditions[i];
            const a = board[WinCondition[0]];
            const b = board[WinCondition[1]];
            const c = board[WinCondition[2]];
            if(a==='' || b==='' || c===''){
                continue;
            }
            if( a === b && b===c ){
                roundWon = true;
                break;
            }
        }
    if (roundWon) {
        announce(currentPlayer ==='X' ? PLAYER_X_WON : PLAYER_O_WON);
        isGameActive = false;
        return;
    }
    if(!board.includes(''))
        announce(TIE);
    }
    const announce= (type) => {
        switch(type){
            case PLAYER_O_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYER_X_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = "It's a Tie Game!";
        }
        announcer.classList.remove('hide');

    };
    const isValidAction = (tile) => {
        if(tile.innerText==='X' || tile.innerText ==='O'){
            return false;
        }
        return true;
    };
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };
    const ChangePlayer = () =>{
        playerDisplay.classList.remove('player${currentPlayer}');
        currentPlayer = currentPlayer ==='X' ? 'O' : 'X' ;
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add('player${currentPlayer}');

    }
    const userAction = ( tile , index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add('player${currentPlayer}');
            updateBoard(index);
            handleResultValidation();
            ChangePlayer();
        }
    }
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O'){
            ChangePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    tiles.forEach((tile,index) => {
        tile.addEventListener('click', () => userAction(tile,index));
    });
    resetbutton.addEventListener('click',resetBoard);
});
