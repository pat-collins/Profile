//Donald trump memory game on memory.html page

var cardsArray = [
    {    'name': 'Trump1',    'img': 'https://pyxis.nymag.com/v1/imgs/81e/6a8/2c561fd7ca1bc737b17a8be23d2e2c5217-gwbush-donald-trump.rsquare.w700.jpg',  },
    {    'name': 'Trump2',    'img': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png',  },
    {    'name': 'Trump3',    'img': 'https://static01.nyt.com/images/2020/04/27/us/politics/00-trump-cand-page/00-trump-cand-page-mediumSquareAt3X.jpg',  },
    {    'name': 'Trump4',    'img': 'https://media.vanityfair.com/photos/5ff608722a41ae5e9066a975/1:1/w_1333,h_1333,c_limit/Trump1.6.jpg',  },
    {    'name': 'Trump5',    'img': 'https://pyxis.nymag.com/v1/imgs/522/44e/f7f4dd414158ff20ffbd80b8c1fc53083c-27-best-debate-tweets.rsquare.w330.jpg',  },
    {    'name': 'Trump6',    'img': 'https://pyxis.nymag.com/v1/imgs/7f1/8ca/c962bf422aa8eea8b09dbc98c6c3a8303e-08-president-trump-faceline-white-house.rsquare.w700.jpg',  },
    {    'name': 'Trump7',    'img': 'https://pyxis.nymag.com/v1/imgs/b7e/6ea/185d41a9fc761bca029fa3cb9bce149c74-donald-trump-hair.rsquare.w700.jpg',  },
    {    'name': 'Trump8',    'img': 'https://i.pinimg.com/originals/55/0c/28/550c280ced60ff1855718bc7b42ce6bb.png',  },
    {    'name': 'Trump9',    'img': 'https://pyxis.nymag.com/v1/imgs/70f/2ea/70d650cec4495e2be3bdf728f6b4547986-trump.rsquare.w700.jpg',  },
    {    'name': 'Trump10',    'img': 'https://pyxis.nymag.com/v1/imgs/0a9/8b7/d42482e806ae884a7a409b06d3331b9d12-donald-trump-women-apprentice.rsquare.w700.jpg',  },
    {    'name': 'Trump11',    'img': 'https://assets.vogue.com/photos/58dbed28cb4b031393a07df4/master/pass/00-square-trump.jpg',  },
    {    'name': 'Trump12',    'img': 'https://i.kinja-img.com/gawker-media/image/upload/q_75,w_900,h_900,c_fill/4a2eddf4081707e9df631117d28159e7.JPG',  },
  ];
  
  //cardsArray[0].name; // CSS
  //cardsArray[1].img; // 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true'
  
  //Duplicate cardsArray to create a match for each card
  var gameGrid = cardsArray.concat(cardsArray);
  // Randomise game grid on each load
  gameGrid.sort(function(){
    return 0.5 - Math.random();
  })
  //Grab the div with an id of the game-board and assign to a variable 'game'
  var game = document.getElementById('game-board');
  //Create a section element and assign it to variable grid
  var grid = document.createElement('section');
  //Give section element a class of grid
  grid.setAttribute('class', 'grid');
  //Append the grid section to the game-board div
  game.appendChild(grid);
  //Loop through each item in our cards array
  for (i = 0; i < gameGrid.length; i++){
    //create a div element and assign to variable card
    var card = document.createElement('div');
    //Apply a card to that div
    card.classList.add('card');
    //Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;
    
    //Create front of the card
    var front = document.createElement('div');
    front.classList.add('front');
  
    //Create back of card
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`
  
    //Append card to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  
  }
  //Source of quote
  var endpoint = 'http://api.whatdoestrumpthink.com/api/v1/quotes/random';
  
  function displayQuote (quote){
    var quoteText = document.querySelector('.quote-text');
    quoteText.textContent = quote;
  }
  
  function getQuote(){
    fetch(endpoint)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            displayQuote(data.message + " - Donald Trump");
        })
        .catch(function(){
            console.log("an error has accured");
        })
  }
  
  var firstGuess = '';
  var secondGuess = '';
  //Set count to 0
  var count = 0;
  var previousTarget = null;
  var delay = 1200;
  //Add match CSS
  var match = function(){
    var selected = document.querySelectorAll('.selected');
    //loop through the array like object containing 'selected' class
    for (i = 0; i < selected .length; i++) {
        selected[i].classList.add('match');
    };
    //Trigger Quote
    getQuote()
  };
  
  //Reset guesses after two attempts
  var resetGuesses = function(){
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
  
    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length ; i++){
      selected[i].classList.remove('selected');
    };
  };
  
  //Add event listener to grid
  grid.addEventListener('click', function(event){
    var clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        return;
    };
    //We only want to add 'selected' class if the current count is less than 2
    if (count < 2 ){
        count ++;
        if (count === 1){
            //Asign first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else{
            //Assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } if (firstGuess !== ''&& secondGuess !== '') {
  
            if (firstGuess === secondGuess){
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
            } else {
              setTimeout(resetGuesses, delay);
            }
            
        }
        previousTarget = clicked;
    }
    
  });
  