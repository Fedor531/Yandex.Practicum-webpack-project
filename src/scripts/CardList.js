export default class CardList {
  constructor(container, buildCardItem) {
    this.container = container;
    this.buildCardItem = buildCardItem;
    this.addCard = this.addCard
  }

  addCard(placeElement) {
    this.container.appendChild(placeElement)
  }

  renderCards(array) {
    array.forEach(item => {
      const card = this.buildCardItem(item)
      this.addCard(card.create())
    })
  }
}


