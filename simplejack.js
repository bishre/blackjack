// Create a card constructor
function Card(suit, number){
  this.suit = suit;
  this.number = number;

  this.getSuit = function(){
    return suit;
  }

  this.getNumber = function(){
    return number;
  }
}

var loadPage = function(){
  location.reload();
}
var cardDeck = [];
var suitSet = ['diamonds', 'clubs', 'hearts', 'spades'];
var numberSet = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];

// build a deck of cards using the card constructor
var deck = function(){
  for (s in suitSet){
    var suit = suitSet[s];
    for (n in numberSet){
      var number = numberSet[n];
      var card = new Card(suit, number);
      cardDeck.push(card);
    }
  }
}

// shuffle the deck of cards created by previous function
var shuffle = function(){
  document.getElementById('shuffle').src = 'shuffle.mp3';
  var currentIndex = cardDeck.length, temporaryValue, randomIndex;
  while (currentIndex !== 0){
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;

    temporaryValue = cardDeck[currentIndex];
    cardDeck[currentIndex] = cardDeck[randomIndex];
    cardDeck[randomIndex] = temporaryValue;
  }
}

// create a function that draws a card from top of the deck
var draw = function(){
  var topCard = cardDeck[cardDeck.length-1];
  cardDeck.splice(-1, 1);
  return topCard;
}

// using the draw function, create player's hand and dealer's hand with two cards each
var deal = function(){
  var hand = [];
  hand[0] = draw();
  hand[1] = draw();
  return hand;
}

var playerHand = [];
var dealerHand = [];
// playerScore = 0;
// dealerScore = 0;

// calculate the score of the player and dealer hand
var score = function(hand){
  var sum=0;
  for (let i=0; i<hand.length; i++){
    if (hand[i].getNumber()==='jack' || hand[i].getNumber()==='queen' || hand[i].getNumber()==='king'){
      sum += 10;
    } else if (hand[i].getNumber()==='ace' && sum > 10){
      sum += 1;
    } else if (hand[i].getNumber() === 'ace' && sum <= 10) {
      sum += 11;
    } else {
      sum += hand[i].getNumber();
    }
  }
  return sum;
}

// write function that deals card to the player
var hitMe = function(){
  var card = draw();
  playerHand.push(card);
  var image = document.createElement('IMG');
  image.src = './png/' + printHand(playerHand)[playerHand.length-1] + '.png';
  document.getElementById('playSuit').appendChild(image);
  playerScore = score(playerHand);
  while (dealerScore < 17){
    dealerHand.push(draw());
    var dealerScore = score(dealerHand);
  }
  if (playerScore > 21) {
    document.getElementById('message').innerHTML = 'You busted!';
  } else if (playerScore === 21) {
    document.getElementById('message').innerHTML = 'Blackjack! You win!';
  } else {
    dealerScore = score(dealerHand);
  }
  document.getElementById('scorePlayer').innerHTML = "Player's Score: ";

  document.getElementById('scorePlayer').innerHTML += playerScore;
}

var printHand = function(hand){
  var cardBox = [];
  str = "";
  for (let i=0; i<hand.length; i++){
    str = hand[i].getNumber() + '_of_' + hand[i].getSuit();
    cardBox.push(str);
  }
  return cardBox;
}

// var x = 0px;
// start the game
var start = function(){
  playerHand = deal();
  dealerHand = deal();
  playerScore = score(playerHand);
  dealerScore = score(dealerHand);
  document.getElementById('scorePlayer').innerHTML += playerScore;
  for (i in printHand(playerHand)){
    var image = document.createElement('IMG');
    image.src = './png/' + printHand(playerHand)[i] + '.png';
    document.getElementById('playSuit').appendChild(image);
  }
  if (playerScore === 21) {
    document.getElementById('message').innerHTML = 'Blackjack! You win!';
  } else if (dealerScore === 21) {
    for (i in printHand(dealerHand)){
      var image = document.createElement('IMG');
      image.src = './png/' + printHand(dealerHand)[i] + '.png';
      // image.style.left = 25px;
      // x +=25px;
      document.getElementById('dealSuit').appendChild(image);

    }
    document.getElementById('message').innerHTML = 'Dealer Blackjack! You lost!';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  }
}

// decide the winner
var winner = function(){
  while (dealerScore < 17){
    dealerHand.push(draw());
    dealerScore = score(dealerHand);
  }
  for (i in printHand(dealerHand)){
    var image = document.createElement('IMG');
    image.src = './png/' + printHand(dealerHand)[i] + '.png';
    document.getElementById('dealSuit').appendChild(image);
  }
  if (dealerScore > 21 && playerScore < 21){
    document.getElementById('message').innerHTML = 'Dealer busted! You win!';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  } else if (playerScore > dealerScore && playerScore < 21){
    document.getElementById('message').innerHTML = 'You win!';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  } else if (playerScore === dealerScore){
    document.getElementById('message').innerHTML = 'Score tied! You lose';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  } else if (dealerScore === 21){
    document.getElementById('message').innerHTML = 'Dealer Blackjack! You lose';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  } else if (playerScore > 21){
    document.getElementById('message').innerHTML = 'You busted';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  } else if (playerScore === 21){
    document.getElementById('message').innerHTML = 'Blackjack! You win!';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  }
  else {
    document.getElementById('message').innerHTML = 'You lose!';
    document.getElementById('scoreDealer').innerHTML += dealerScore;
  }
}
