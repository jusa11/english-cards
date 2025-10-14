class CardManager {
  constructor(cards, mode) {
    this.cards = cards;
    this.mode = mode;
    this.currentPosition = -1;
  }

  getCard = () => {
    if (this.mode === 'random') {
      return this.random();
    }
    if (this.mode === 'order') {
      return this.order();
    }
  };

  random = () => {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    this.currentPosition = randomIndex;
    const card = this.cards[this.currentPosition];
    return card;
  };

  order = () => {
    this.currentPosition++;

    if (this.currentPosition >= this.cards.length) {
      this.currentPosition = 0;
    }

    return this.cards[this.currentPosition];
  };
}

export default CardManager;
