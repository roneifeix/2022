var cardSettings = {};
const gameData = {
   GameCards: [],
   Player: {
      wins: 0,
      cardsSum: 0,
      balance: 0,
   },
   Dealer: {
      wins: 0,
      cardsSum: 0,
      balance: 0,
   }
};

function redefinir() {
   cardSettings = {};
   gameData.GameCards = [];
   gameData.Player.cardsSum = 0;
   gameData.Dealer.cardsSum = 0;
   document.getElementById('player-wins').innerText = gameData.Player.wins;
   document.getElementById('dealer-wins').innerText = gameData.Dealer.wins;
   document.getElementById('Player').innerHTML = "";
   document.getElementById('Dealer').innerHTML = "";
   document.getElementById('set-player-cards-sum').innerText = 0;
   document.getElementById('set-dealer-cards-sum').innerText = 0;
}

// FUNÇÃO DE RANDOMIZAÇÃO DA CARTA DO PLAYER
function getPlayerCard() {
   try {
      setRandomCard('Player');
      document.getElementById('set-player-cards-sum').innerHTML = gameData.Player.cardsSum;

      if (gameData.Player.cardsSum === 21) {
         alert("PARABÉNS, VC FEZ 21 PONTOS!");
         gameData.Player.wins = gameData.Player.wins + 1;
         redefinir();
      } else if (gameData.Player.cardsSum > 21) {
         alert("VOCÊ PERDEU!");
         gameData.Dealer.wins = gameData.Dealer.wins + 1;
         redefinir();
      }
   } catch (error) {
      console.log(error);
   }
}
// FUNÇÃO DE RANDOMIZAÇÃO DA CARTA DO DEALER
function getDealerCard() {
   try {
      do {
         do {
            setRandomCard('Dealer');
            document.getElementById('set-dealer-cards-sum').innerHTML = gameData.Dealer.cardsSum;
         } while ((gameData.Dealer.cardsSum < 17) && (gameData.Dealer.cardsSum > 21));
      } while (gameData.Dealer.cardsSum < gameData.Player.cardsSum);

      if (gameData.Dealer.cardsSum > 21) {
         alert('O DEALER PERDEU!');
         gameData.Player.wins = gameData.Player.wins + 1;
         redefinir();
      } else {
         alert('VOCÊ GANHOU!');
         gameData.Player.wins = gameData.Player.wins + 1;
         redefinir();
      }
   } catch (error) {
      console.log(error);
   }
}

// FUNÇÃO DE RANDOMIZAÇÃO DAS CARTAS
function setRandomCard(props) {
   /* randomiza a seleção carta */
   cardSettings = {
      suit: parseInt(Math.random() * 4),
      cardValue: parseInt((Math.random() * 13) + 1),
      value: 0,
   };


   /* redefine os valores de valete, dama e rei valendo 10 */
   switch (cardSettings.cardValue) {
      case 11:
         cardSettings.value = 10;
         break;
      case 12:
         cardSettings.value = 10;
         break;
      case 13:
         cardSettings.value = 10;
         break;
      default:
         cardSettings.value = cardSettings.cardValue;
         break;
   }
   /* adiciona o valor da carta atual ao array de cartas da jogada */
   gameData.GameCards.push(cardSettings.cardValue);
   /* define nomenclatura da naipe da carta para acessar a pasta da imagem */
   switch (cardSettings.suit) {
      case 0:
         cardSettings.suit = 'copas';
         break;
      case 1:
         cardSettings.suit = 'espadas';
         break;
      case 2:
         cardSettings.suit = 'ouro';
         break;
      case 3:
         cardSettings.suit = 'paus';
         break;
      default:
         break;
   }

   /* cria objeto dom para imagem */
   let ulContainer = document.getElementById(props);
   let liContainer = document.createElement('li');
   ulContainer.appendChild(liContainer);
   let cardImage = document.createElement('img');
   liContainer.appendChild(cardImage);
   cardImage.src = './images/' + cardSettings.suit + '/' + cardSettings.cardValue + '.png';
   cardImage.style.width = '100px';

   /* redefine o valor do às como sendo 1 ou 11 */
   var numbers = gameData.GameCards;
   numbers.map(myFunction);
   function myFunction(value, index, array) {
      if (value == 1) {
         if (props == 'Player') {
            if (gameData.Player.cardsSum <= 10) {
               cardSettings.value = 11;
            }
         }
      }
      return;
   }
   /*  */
   if (props == 'Player') {
      gameData.Player.cardsSum += cardSettings.value;
   } else {
      gameData.Dealer.cardsSum += cardSettings.value;
   }
};