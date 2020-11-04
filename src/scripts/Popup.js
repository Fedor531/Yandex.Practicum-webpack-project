export default class Popup {

  constructor(popupObject) {
    this.popupObject = popupObject
    this.close = this.close.bind(this)
  }

  open() {
    this.popupObject.classList.add('popup_is-opened')
    this.popupObject.querySelector('.popup-close').addEventListener('click', this.close)
  }

  close() {
    this.popupObject.classList.remove('popup_is-opened')
  }
}
