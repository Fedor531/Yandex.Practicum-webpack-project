(function () {
  const placesList = document.querySelector('.places-list')

  const placeForm = document.querySelector('.popup__form')
  const editForm = document.querySelector('.edit-popup__form')
  const avatarForm = document.querySelector('.avatar-popup__form')

  const openPlaceFormButton = document.querySelector('.user-info__button')
  const openEditFormButton = document.querySelector('.user-info__edit-button')
  const openAvatarFormButton = document.querySelector('.user-info__photo')

  const popupPlaceButton = document.querySelector('.popup__button')
  const popupEditButton = document.querySelector('.edit-popup__button')
  const popupAvatarButton = document.querySelector('.avatar-popup__button')

  const popupAvatarInput = document.querySelector('.avatar-popup__input')

  const userName = document.querySelector('.user-info__name')
  const userDescription = document.querySelector('.user-info__job')
  const userPhoto = document.querySelector('.user-info__photo')
  const userNameInput = document.querySelector('.edit-popup__input_type_profile-name')
  const userDescriptionInput = document.querySelector('.edit-popup__input_type_description')
  const name = document.querySelector('.popup__input_type_name')
  const link = document.querySelector('.popup__input_type_link-url')

  const placeFormValidator = new FormValidator(placeForm, popupPlaceButton, errorMessages)
  const editFormValidator = new FormValidator(editForm, popupEditButton, errorMessages)
  const avatarFormValidator = new FormValidator(avatarForm, popupAvatarButton, errorMessages)

  const popupPicture = new Popup(document.querySelector('.image-popup'));
  const popupPlace = new Popup(document.querySelector('.popup'));
  const popupEdit = new Popup(document.querySelector('.edit-popup'));
  const popupAvatar = new Popup(document.querySelector('.avatar-popup'));

  const config = {
    url: 'https://nomoreparties.co/cohort12',
    headers: {
      authorization: '28f11b08-e5e2-4767-8f2f-b8c0fbf2748f',
      'Content-Type': 'application/json'
    }
  }

  const api = new Api(config)

  const userInfo = new UserInfo(api, userName, userDescription, userPhoto)

  const buildCardItem = (cardData) => new Card(cardData, openPicturePopup, api)
  const cardList = new CardList(placesList, buildCardItem)

  const openPicturePopup = (link) => {
    document.querySelector('.image-popup__picture').setAttribute('src', link)
    popupPicture.open()
  }


  function getInitialData() {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then((values) => {
        const [userData, initialCards] = values;
        userInfo.setUserInfo(userData)
        const cardsWithUserId = initialCards;
        cardsWithUserId.forEach(item => item.userId = userData._id)
        cardList.renderCards(cardsWithUserId)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  function renderLoading(isLoading, button) {
    if (isLoading) {
      button.textContent = 'Загрузка...'
    } else {
      button.textContent = 'Сохранить'
    }
  }

  function addNewPlace(event) {
    event.preventDefault();
    renderLoading(true, popupPlaceButton)
    api.postNewCard(name.value, link.value)
      .then((obj) => {
        const objCard = obj
        objCard.userId = obj.owner._id
        const card = buildCardItem(objCard)
        cardList.addCard(card.create())
        popupPlace.close()
        placeForm.reset()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(false, popupPlaceButton)
      })
  }

  function changeProfile(event) {
    event.preventDefault()
    renderLoading(true, popupEditButton)
    api.changeUserInfo(userNameInput.value, userDescriptionInput.value)
      .then((res) => {
        userInfo.setUserInfo(res)
        popupEdit.close()
        editForm.reset()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(false, popupEditButton)
      })
  }

  function changeProfileAvatar(event) {
    event.preventDefault()
    renderLoading(true, popupAvatarButton)
    api.changeAvatar(popupAvatarInput.value)
      .then((res) => {
        userInfo.setUserInfo(res)
        popupAvatar.close()
        avatarForm.reset()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(false, popupAvatarButton)
      })
  }




  function openEditForm() {
    placeFormValidator.setSubmitButtonState()
    placeFormValidator.deleteError()
    popupPlace.open()
  }

  function openPlaceForm() {
    userNameInput.value = userName.textContent;
    userDescriptionInput.value = userDescription.textContent;
    editFormValidator.deleteError()
    popupEdit.open()
  }

  function openAvatarForm() {
    avatarFormValidator.setSubmitButtonState()
    avatarFormValidator.deleteError()
    popupAvatar.open()
  }

  //Слушатели
  placeForm.addEventListener('submit', addNewPlace)
  editForm.addEventListener('submit', changeProfile)
  avatarForm.addEventListener('submit', changeProfileAvatar)

  openPlaceFormButton.addEventListener('click', openEditForm)
  openEditFormButton.addEventListener('click', openPlaceForm)
  openAvatarFormButton.addEventListener('click', openAvatarForm)


  getInitialData()

})()
