class UserInfo {
  constructor(api, userName, userDescription, userPhoto) {
    this.api = api
    this.userName = userName
    this.userDescription = userDescription
    this.userPhoto = userPhoto
  }

  setUserInfo(userData) {
    this.name = userData.name,
    this.about = userData.about
    this.avatar = userData.avatar
    this.updateUserInfo()
  }

  updateUserInfo() {
    this.userName.textContent = this.name,
      this.userDescription.textContent = this.about
    this.userPhoto.style.backgroundImage = `url(${this.avatar})`
  }

}
