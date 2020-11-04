class Card {
  constructor(cardData, openPicturePopup, api) {
    this.cardData = cardData;
    this.openPicturePopup = openPicturePopup;
    this.remove = this.remove.bind(this);
    this.showImage = this.showImage.bind(this);
    this.api = api
  }

  create() {
    const markUp = `
    <div class="place-card">
    <div class="place-card__image"
      data-url=""
      style="background-image: url()">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <div class="place-card__like-container">
        <button class="place-card__like-icon"></button>
        <p class="place-card__like-count">0</p>
      </div>
    </div>
  </div>`;
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markUp.trim());
    element.querySelector('.place-card__name').textContent = this.cardData.name;
    element.querySelector('.place-card__image').style.backgroundImage = `url(${this.cardData.link})`;
    element.querySelector('.place-card__image').dataset.url = this.cardData.link;
    element.querySelector('.place-card__like-count').textContent = this.cardData.likes.length;
    this.placeElement = element.firstElementChild;

    this.setEventListeners()

    if (this.cardData.userId === this.cardData.owner._id) {
      this.placeElement.querySelector('.place-card__delete-icon').setAttribute('style', 'display:block')
    }

    this.cardData.likes.forEach((item) => {
      if (this.cardData.userId === item._id) {
        this.placeElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked')
        this.placeElement.querySelector('.place-card__like-icon').addEventListener('click', this.deleteLike)
        this.placeElement.querySelector('.place-card__like-icon').removeEventListener('click', this.addEventLike)
      }
    })

    return element.firstElementChild;
  }

  setEventListeners() {
    this.placeElement.querySelector('.place-card__like-icon').addEventListener('click', this.addEventLike)
    this.placeElement.querySelector('.place-card__image').addEventListener('click', this.showImage)
    this.placeElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove)
  }

  showImage() {
    this.openPicturePopup(this.cardData.link)
  }

  addEventLike = (event) => {
    this.api.addLike(this.cardData._id)
      .then((res) => {
        event.target.classList.add('place-card__like-icon_liked')
        this.placeElement.querySelector('.place-card__like-count').textContent = res.likes.length
      })
      .then(() => {
        this.placeElement.querySelector('.place-card__like-icon').removeEventListener('click', this.addEventLike)
        this.placeElement.querySelector('.place-card__like-icon').addEventListener('click', this.deleteLike)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike = (event) => {
    this.api.deleteLike(this.cardData._id)
      .then((res) => {
        event.target.classList.remove('place-card__like-icon_liked')
        this.placeElement.querySelector('.place-card__like-count').textContent = res.likes.length
      })
      .then(() => {
        this.placeElement.querySelector('.place-card__like-icon').removeEventListener('click', this.deleteLike)
        this.placeElement.querySelector('.place-card__like-icon').addEventListener('click', this.addEventLike)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(event) {
    event.stopPropagation()
    if (confirm('Вы действительно хотите удалить эту карточку?')) {
      this.api.deleteCard(this.cardData._id)
        .then(() => {
          event.target.closest('.place-card').remove()
          this.removeListener()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  removeListener() {
    this.placeElement.querySelector('.place-card__image').removeEventListener('click', this.showImage)
    this.placeElement.querySelector('.place-card__like-icon').removeEventListener('click', this.deleteLike)
    this.placeElement.querySelector('.place-card__like-icon').removeEventListener('click', this.addEventLike)
  }

}
