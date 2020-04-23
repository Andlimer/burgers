// Всплывающее меню
const burgerMenu = () => {
  const burgerMenu = document.querySelector('.burger-menu'),
    burgerMenuBtn = document.querySelector('.burger-menu-btn');

  burgerMenuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    burgerMenu.classList.add('burger-menu_active');
    document.body.style.overflow = 'hidden';
  });

  burgerMenu.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    console.log(target);

    if (target.classList.contains('burger-menu__link') || target.closest('.burger-menu__close')) {
      burgerMenu.classList.remove('burger-menu_active');
      document.body.style.overflow = 'visible';
    }
  });
};

burgerMenu();

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

// Карта
ymaps.ready(function () {

  var myMap = new ymaps.Map('map', {
    center: [43.10890712, 131.90497327],
    zoom: 14
  });

  myPlacemark1 = new ymaps.Placemark([43.118600, 131.882764], {
    hintContent: 'Приход к нам',
  }, {
      iconLayout: 'default#image',
      iconImageHref: './img/icons/map-marker.svg',
      iconImageSize: [48, 60],
  });

  myPlacemark2 = new ymaps.Placemark([43.100365, 131.903451], {
    hintContent: 'Приход к нам',
  }, {
      iconLayout: 'default#image',
      iconImageHref: './img/icons/map-marker.svg',
      iconImageSize: [48, 60],
  });

  myPlacemark3 = new ymaps.Placemark([43.113680, 131.895411], {
    hintContent: 'Приход к нам',
  }, {
      iconLayout: 'default#image',
      iconImageHref: './img/icons/map-marker.svg',
      iconImageSize: [48, 60],
  });

  myMap.geoObjects
    .add(myPlacemark1)
    .add(myPlacemark2)
    .add(myPlacemark3);

  myMap.controls.remove('searchControl');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.behaviors.disable('scrollZoom');
});

// OnePageScroll
const sections = $('.section');
const display = $('.main-content');
let inScroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const performTransition = sectionEq => {
  if (inScroll === false) {
    inScroll = true;

    const position = sectionEq * -100;

    sections
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

    }, 1000);
  }
};

const scrollToSection = direction => {
  const activeSection = sections.filter('.section_active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY

  console.log('wheel');

  if (deltaY > 0) {
    scrollToSection('next');
  } 
  
  if (deltaY < 0) {
    scrollToSection('prev');
  }
});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {
    switch(e.keyCode) {
      case 38:
        scrollToSection('prev');
        break;
      case 40:
        scrollToSection('next');
        break;
    }
  }
  // console.log(e.keyCode);
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');

  performTransition(target);
});

if (isMobile) {
  $("body").swipe({
    swipe: function(
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      const scrollDirections = direction === 'up' ? 'next' : 'prev';

      scrollToSection(scrollDirections);
    }
  });
}

// Player
const player = document.querySelector('.player'),
  video = document.getElementById('video'),
  playerBtn = document.querySelector('.player__btn'),
  voluemMuted = document.querySelector('.player__volume'),
  timelineControl = document.getElementById('timeline'),
  volumeControl = document.getElementById('volume');

player.addEventListener('click', (event) => {
  event.preventDefault();

  let target = event.target;

  if (target.closest('.player__btn') || target.closest('.player__play-pause')) {
    if (video.paused) {
      video.play();
      playerBtn.style.opacity = "0";
    } else {
      video.pause();
      playerBtn.style.opacity = ".9";
    }
  }
});

// Time
video.addEventListener('play', () => {
  let interval;

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    let compleatedSec = video.currentTime;

    timelineControl.value = compleatedSec;
  
  }, 1000);

  timelineControl.addEventListener('input', () => {
    video.currentTime = timelineControl.value;
  });

});

// Volume
volumeControl.addEventListener('input', () => {
	video.volume = volumeControl.value;
}, false);