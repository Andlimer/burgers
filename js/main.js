// Всплывающее меню
const burgerMenu = () => {
  const burgerMenu = document.querySelector('.burger-menu'),
    burgerMenuBtn = document.querySelector('.burger-menu-btn'),
    burgerMenuClose = document.querySelector('.burger-menu__close');

  burgerMenuBtn.addEventListener('click', () => {
    event.preventDefault();
    burgerMenu.classList.add('burger-menu_active');
    document.body.style.overflow = 'hidden';
  });

  burgerMenuClose.addEventListener('click', () => {
    event.preventDefault();
    burgerMenu.classList.remove('burger-menu_active');
    document.body.style.overflow = 'visible';
  });
};

burgerMenu();

// Аккордеон Команда
const accordeonTeam = () => {
  const accordeonTeam = document.querySelector('.team-accordeon'),
  accordeonTeamItems = document.querySelectorAll('.team-accordeon__item');

  const closeItem = (item) => {
    item.classList.remove('team-accordeon__item_active');
  };

  const openItem = (item) => {
    for (let i = 0; i < accordeonTeamItems.length; i++) {
      accordeonTeamItems[i].classList.remove('team-accordeon__item_active');
    }
    item.classList.add('team-accordeon__item_active');
  };

  accordeonTeam.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target,
      targetItem = target.parentNode;

    if (target.classList.contains('team-accordeon__trigger')) {
      if (target.parentNode.classList.contains('team-accordeon__item_active')) {
        closeItem(targetItem);
      } else {
        openItem(targetItem);
      }
    }
  });
};

accordeonTeam();

// Аккордеон Меню
const accordeonMenu = () => {
  const accordeonMenu = document.querySelector('.menu'),
    accordion = document.querySelector('.menu-accordeon'),
    accordeonItems = document.querySelectorAll('.menu-accordeon__item');

  const closeItem = (item) => {
    const content = item.querySelector('.menu-accordeon__content');

    item.classList.remove('menu-accordeon__item_active');

    content.style.width = ``;
    accordion.style.right = ``;
  }

  const closeAllItem = () => {
    const accordeonMenuItems = document.querySelectorAll('.menu-accordeon__item');
    
    accordeonMenuItems.forEach(item => {
      const content = item.querySelector('.menu-accordeon__content');

      item.classList.remove('menu-accordeon__item_active');

      content.style.width = ``;
      accordion.style.right = ``;
    });
  }

  // Функция для определения размера экрана для мобилок.
  const openItem = (item) => {
    const trigger = item.querySelector('.menu-accordeon__trigger'),
      content = item.querySelector('.menu-accordeon__content'),
      screenWidth = accordeonMenu.clientWidth,
      triggerWidth = trigger.clientWidth,
      contentWidth = screenWidth - triggerWidth;

    const itemNumber = item.dataset.number;
    const listPosition = (accordeonItems.length - itemNumber) * triggerWidth;

    closeAllItem();
    item.classList.add('menu-accordeon__item_active');

    if (screenWidth <= 640) {
      content.style.width = `${contentWidth}px`;
      accordion.style.right = `-${listPosition}px`;
    } else if (screenWidth <= 960) {
      content.style.width = `${contentWidth - triggerWidth * 2}px`;
    } else {
      content.style.width = '50vw';
    }
  };

  accordeonMenu.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target,
      targetItem = target.closest('.menu-accordeon__item');

    if (target.closest('.menu-accordeon__trigger')) {
      if (targetItem.classList.contains('menu-accordeon__item_active')) {
        closeItem(targetItem);
      } else {
        openItem(targetItem);
      }
    }
    if (target.closest('.menu-accordeon__trigger' === null)) {
      closeAllItem();
    }
    if (target.closest('.menu-accordeon__close')) {
      closeItem(targetItem);
    }
  });
};

accordeonMenu();

// Слайдер
const slider = () => {
  const left = document.querySelector('.burgers__arrow_left'),
    right = document.querySelector('.burgers__arrow_right'),
    sliderList = document.querySelector('.slider__list'),
    sliderItemsArray = document.querySelectorAll('.slider__item');

  sliderList.style.width = sliderItemsArray.length * 100 + '%';

  const step = 100,
    minRight = 0,
    maxRight = step * (sliderItemsArray.length - 1);
  
  let currentRight = 0;

  sliderList.style.right = currentRight;

  left.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentRight > minRight) {
      currentRight -= step;
      sliderList.style.right = currentRight + '%';
    } else {
      currentRight = maxRight;
      sliderList.style.right = currentRight + '%';
    }
  });

  right.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentRight < maxRight) {
      currentRight += step;
      sliderList.style.right = currentRight + '%';
    } else {
      currentRight = minRight;
      sliderList.style.right = currentRight + '%';
    }
  });
};

slider();
  
// Модальные окна
const togglePopUpRevievs = () => {
  const popUp = document.querySelectorAll('.popup'),
    popUpBtn = document.querySelectorAll('.popup-button'),
    popUpRevievs = document.querySelector('.popup-revievs');

  popUpBtn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (target.classList.contains('reviews__btn')) {
        popUpRevievs.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  popUp.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (target.classList.contains('popup__close') || target.closest('.popup__close')) {
        elem.style.display = 'none';
        document.body.style.overflow = 'visible';
      } else {
        target = target.closest('.popup__content');
        if (!target) {
          elem.style.display = 'none';
          document.body.style.overflow = 'visible';
        }
      }
    });
  });
};

togglePopUpRevievs();

// Форма
const sendForm = () => {
  const errorMessage = 'Отправить письмо не удалось, повторите запрос позже',
    successMessage = 'Письмо успешно отправлено',
    modalText = document.querySelector('.popup-modal__text'),
    orderForm = document.querySelector('.form'),
    sendButton = document.querySelector('.form__button');

  sendButton.addEventListener('click', (event) => {
    event.preventDefault();

    const togglePopUpModal = () => {
      const popUpClose = document.querySelector('.popup__close'),
        popUpModal = document.querySelector('.popup-modal');
    
      popUpModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    
      popUpClose.addEventListener('click', () => {
        popUpModal.style.display = 'none';
        document.body.style.overflow = 'visible';
      });
    
      popUpModal.addEventListener('click', (event) => {
        if (event.target === popUpModal) {
          popUpClose.click();
        }
      });
    };

    if (validateForm(orderForm)) {
      togglePopUpModal();

      // Отправка на серевер
      let formData = new FormData(orderForm);
      formData.append("to", "Andlimer@gmail.com");

      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      const randomSend = () => {
        let current = Math.floor(Math.random() * 2);
        console.log(current);

        if (current === 0) {
          xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        } else {
          xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
        }
      }

      randomSend();

      xhr.send(formData);

      xhr.addEventListener('load', () => {
        if (xhr.response.status) {
          modalText.textContent = successMessage;
        } else {
          modalText.textContent = errorMessage;
        }
      });
    }
  });

  const validateForm = (forms) => {
    let valid = true;

    if (!validateField(forms.elements.name)) {
      valid = false;
    } 
    if (!validateField(forms.elements.phone)) {
      valid = false;
    }
    if (!validateField(forms.elements.street)) {
      valid = false;
    }
    if (!validateField(forms.elements.home)) {
      valid = false;
    }
    if (!validateField(forms.elements.apartment)) {
      valid = false;
    }
    return valid;
  };

  const validateField = (input) => {
    if (!input.checkValidity()) {
      input.parentElement.classList.add('form__block_error');
      return false;

    } else {
      input.parentElement.classList.remove('form__block_error');
      return true;
    }
  };
};

sendForm();

// OnePageScroll
const section =$('.section');
const display = $('.main-content');
let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const performTransition = sectionEq => {
  if (inScroll) return;

  inScroll = true;

  const transitionIsOver = 1000;
  const position = sectionEq * -100;

  if (isNaN(position)) 
    console.error('Передано не верное значение performTransition');

  section
    .eq(sectionEq)
    .addClass('section_active')
    .siblings()
    .removeClass('section_active');

  display.css({
    transform: `translateY(${position}%)`
  });

  setTimeout(() => {
    inScroll = false
    
    $('.paginator__item')
      .eq(sectionEq)
      .addClass('paginator__item_active')
      .siblings()
      .removeClass('paginator__item_active');

  }, transitionIsOver);
}

const scroller = () => {
  const activeSection = section.filter('.section_active'),
    nextSection = activeSection.next(),
    prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) 
        performTransition(nextSection.index());
    },
    prev() {
      if (prevSection.length) 
        performTransition(prevSection.index());
    }
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const windowScroller = scroller();

  if (deltaY > 0) {
    windowScroller.next();
  }

  if (deltaY < 0) {
    windowScroller.prev();
  }
});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
  const windowScroller = scroller();

  if (userTypingInInputs) return;

  switch(e.keyCode) {
    case 38:
      windowScroller.prev();
      break;
    case 40:
      windowScroller.next();
      break;
  }
  
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');

  performTransition(target);
});

if (isMobile) {
  $('body').swipe( {
    swipe:function(event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      const scrollDirections = direction === 'up' ? 'next' : 'prev';
  
      scroller(scrollDirections);
    }
  });
}