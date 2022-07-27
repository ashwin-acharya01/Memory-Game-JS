const imageArray = [
    {
        name:'cheeseBurger',
        img : 'Images/cheeseburger.png'
    },
    {
        name:'fries',
        img : 'Images/fries.png'
    },
    {
        name:'hotdog',
        img : 'Images/hotdog.png'
    },
    {
        name:'iceCream',
        img : 'Images/ice-cream.png'
    },
    {
        name:'milkShake',
        img : 'Images/milkshake.png'
    },
    {
        name:'pizza',
        img : 'Images/pizza.png'
    },
    {
        name:'cheeseBurger',
        img : 'Images/cheeseburger.png'
    },
    {
        name:'fries',
        img : 'Images/fries.png'
    },
    {
        name:'hotdog',
        img : 'Images/hotdog.png'
    },
    {
        name:'iceCream',
        img : 'Images/ice-cream.png'
    },
    {
        name:'milkShake',
        img : 'Images/milkshake.png'
    },
    {
        name:'pizza',
        img : 'Images/pizza.png'
    }
];
const grid = document.querySelector('#grid');

//Shuffling the array to get random images after each replay or refresh;
function shuffleArray(array){
    for(let i=0;i<array.length;i++)
    {
        let rand = Math.floor(Math.random() * (i+1));
        [array[i] , array[rand]] = [array[rand],array[i]];

    }
}
shuffleArray(imageArray);

displayGrid();
let cardSeleted = [];
let selectCardId = [];
let score = 0;
let highScore = Number.MIN_SAFE_INTEGER;
let matchCount = 0;

//Function to display blank grid
function displayGrid(){
    for(let i=0;i<imageArray.length;i++){
        const card = document.createElement(`img`);
        card.setAttribute(`src`,`Images/question.png`);
        card.setAttribute(`data-id`,i); // Adding a data-id for ease of access
        card.addEventListener('click',selectCard);
        grid.appendChild(card);        
    }
}

//Function to select cards
function selectCard(){
    let resultDisplay = document.getElementById('result');
    resultDisplay.innerHTML = " ";
    let cardNo = this.getAttribute('data-id');
    this.setAttribute('src',imageArray[cardNo].img);
    cardSeleted.push(imageArray[cardNo].name);
    selectCardId.push(cardNo);
    if(cardSeleted.length === 2 && selectCardId[0] !== selectCardId[1]){
        setTimeout(checkForMatch,180);
    }
    else if(cardSeleted.length === 2 && selectCardId[0] === selectCardId[1]){        
        resultDisplay.innerHTML = "Can't select the same image twice!!!";
        selectCardId.pop();
        cardSeleted.pop();
    }
}

//Function to check whether the cards match
function checkForMatch(){
    image = document.querySelectorAll(`#grid img`);
    let scoreDisplay = document.getElementById('points');
    let resultDisplay = document.getElementById('result');
    if(cardSeleted[0] === cardSeleted[1]){
        resultDisplay.innerHTML = "Cards Match!!!";
        image[selectCardId[0]].setAttribute(`src`,`Images/correct.png`);
        image[selectCardId[1]].setAttribute(`src`,`Images/correct.png`);
        image[selectCardId[0]].removeEventListener(`click`,selectCard);
        image[selectCardId[1]].removeEventListener(`click`,selectCard);
        score += 5;
        matchCount++;
    }
    else{
        resultDisplay.innerHTML = "Cards Don't Match!!!";
        image[selectCardId[0]].setAttribute(`src`,`Images/question.png`);
        image[selectCardId[1]].setAttribute(`src`,`Images/question.png`);
        score -= 3;
    }
    //when all the cards match
    if(matchCount == 6){
        let audio = document.getElementById('victory');
        audio.currentTime = 0;
        audio.play();
        findHighScore();
        document.getElementById('highPoints').innerHTML = highScore;
        document.getElementById('result').innerHTML = "🏆Hurrah!!! You found all the pairs🏆";
        matchCount = 0;
    }
    selectCardId.length = 0;
    cardSeleted.length = 0;
    scoreDisplay.innerHTML = score;
}

//replay button to restart the game
let replay = document.getElementById('replayBtn');
replay.addEventListener('click',() => {
    grid.innerHTML = '';
    cardSeleted.length = 0;
    selectCardId.length = 0;
    matchCount = 0;
    findHighScore();
    document.getElementById('highPoints').innerHTML = highScore;
    score = 0;
    document.getElementById('points').innerHTML = score;
    document.getElementById('result').innerHTML = '';
    shuffleArray(imageArray);
    displayGrid();
})

function findHighScore(){
    highScore =  Math.max(score,highScore);
}