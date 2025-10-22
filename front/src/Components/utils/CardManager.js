class CardManager {
  constructor(cards, mode = 'order', setId = 0) {
    this.cards = cards;
    this.mode = mode;
    this.setId = setId;
    this.currentPosition = -1;
    this.complete = [];

    this.loadFromLocalStorage();
    this.initCard();
  }

  initCard = () => {
    if (this.currentPosition === -1 && this.cards.length > 0) {
      this.currentPosition = 0;
      this.saveToLocalStorage();
    }
    return this.cards[this.currentPosition];
  };

  getCard = () => {
    if (this.mode === 'random') return this.random();
    return this.order();
  };

  random = () => {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    this.currentPosition = randomIndex;
    this.saveToLocalStorage();
    return this.cards[this.currentPosition];
  };

  order = () => {
    this.currentPosition++;
    if (this.currentPosition >= this.cards.length) this.currentPosition = 0;
    this.saveToLocalStorage();
    return this.cards[this.currentPosition];
  };

  addComplete = () => {
    const cardId = this.cards[this.currentPosition].id;
    if (!this.complete.includes(cardId)) {
      this.complete.push(cardId);
      this.saveToLocalStorage();
      console.log(this.complete);
    }
  };

  getStats = () => ({
    total: this.cards.length,
    complete: this.complete.length,
    howMuchLeft: this.cards.length - this.complete.length,
    currentPosition: this.currentPosition,
    mode: this.mode,
    progress: Math.round((this.complete.length * 100) / this.cards.length),
  });

  saveToLocalStorage = () => {
    const key = `cardManagerState_${this.setId}`;
    const data = this.getStats();
    localStorage.setItem(key, JSON.stringify(data));
  };

  loadFromLocalStorage = () => {
    const key = `cardManagerState_${this.setId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.mode = parsed.mode ?? 'order';
        this.currentPosition = parsed.currentPosition ?? -1;
        this.complete = Array.isArray(parsed.complete) ? parsed.complete : [];
      } catch (error) {
        console.error(`Ошибка при загрузке статистики ${error}`);
        this.complete = [];
      }
    }
  };

  showUnknownCards() {
    return this.cards.filter((card) => !this.complete.includes(card.id));
  }

  resetStats() {
    this.currentPosition = -1;
    this.complete = [];
    const key = `cardManagerState_${this.setId}`;
    localStorage.removeItem(key);
  }
}

export default CardManager;
