class Card {
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }
  // получаем шаблон
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photocard__item')
      .cloneNode(true);

    return cardElement;
  }
  // через замыкания работа с попапом открытия превью
  _setSettingsPopup(name, link) {
    const nameImage = name;
    const linkImage = link;
    function openPopup(name, link) {
      const popup = document.querySelector('.popup_type_image');
      const closeBtn = popup.querySelector('.popup__close');
      renderPopup(popup, name, link);
      popup.classList.add('popup_opened');
      document.querySelector('.page').classList.add('overflow-hidden');
      setListenerPopup(popup, closeBtn);
    }

    function renderPopup(popup, name, link) {
      const popupImage = popup.querySelector('.popup__image');
      const popupTitle = popup.querySelector('.popup__title-image');
      popupImage.src = link;
      popupImage.alt = name;
      popupTitle.textContent = name;
    }
    
    function handleClosePopup(e) {
      const popup = document.querySelector('.popup_type_image');
      const closeBtn = popup.querySelector('.popup__close');
      if(e.target === popup || e.key === 'Escape' || e.target === closeBtn) {
        popup.classList.remove('popup_opened');
        document.querySelector('.page').classList.remove('overflow-hidden');
        removeListenerPopup(popup, closeBtn);
      }
    }

    function setListenerPopup(popup, closeBtn) {
      popup.addEventListener('click', handleClosePopup);
      closeBtn.addEventListener('click', handleClosePopup);
      window.addEventListener('keyup', handleClosePopup);

    }

    function removeListenerPopup(popup, closeBtn) {
      popup.removeEventListener('click', handleClosePopup);
      window.removeEventListener('keyup', handleClosePopup);
      closeBtn.addEventListener('click', handleClosePopup);
    }
    openPopup(nameImage, linkImage);
  }

  // like card
  _handleLikeCard() {
    this._element.querySelector('.photocard__like-btn').classList.toggle('photocard__like-btn_active');
  }
  // deletCard
  _handleDeletCard() {
    const photocardList = this._element.closest('.photocard__items')
    photocardList.removeChild(this._element);
  }
  // установка слушателей
  _setEventListeners() {
    this._element.querySelector('.photocard__image').addEventListener('click', () => {
      // this._handleOpenPopup();
      this._setSettingsPopup(this._name, this._link);
    });
    this._element.querySelector('.photocard__like-btn').addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._element.querySelector('.photocard__delet-btn').addEventListener('click', () => {
      this._handleDeletCard();
    });
  }
  // публичный метод генерирущий карточку, возвращает dom element
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photocard__image').src = this._link;
    this._element.querySelector('.photocard__image').alt = this._name;
    this._element.querySelector('.photocard__title').textContent = this._name;

    return this._element;
  }
}

export default Card;