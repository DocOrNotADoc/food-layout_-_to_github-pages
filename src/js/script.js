// import { tabs } from './modules/tabs';



window.addEventListener('DOMContentLoaded', () => {


// tabs
function tabs() {

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('.tabheader__item'.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
tabs();


//slider
    function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
        
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showCurrentSlideNumber(){
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    showCurrentSlideNumber();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsOpasity(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNaNs(str) {
        return +str.replace(/\D/g, '');
    }

    function toNextSlide(){
        if (offset == deleteNaNs(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += deleteNaNs(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentSlideNumber();
        dotsOpasity();
    }

    function toPrevSlide(){
        if (offset == 0) {
            offset = deleteNaNs(width) * (slides.length - 1);
        } else {
            offset -= deleteNaNs(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentSlideNumber();
        dotsOpasity();
    }

    next.addEventListener('click', () => toNextSlide());
    prev.addEventListener('click', () => toPrevSlide());

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = offset = deleteNaNs(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            showCurrentSlideNumber();
            dotsOpasity();
        });
    });


    // make swipes & mouse grab
    slidesWrapper.addEventListener('pointerdown', () => {
        let swipeFrom = event.pageX;
        // console.log("swipeFrom",swipeFrom);
        function listenDir(e) {
                // console.log("swipeTo", e.clientX);
            let moveDir = swipeFrom - e.clientX;
                // console.log('moveDir:', moveDir)
            if (moveDir > 0) {
                toNextSlide();
            }
            if (moveDir < 0) {
                toPrevSlide();
            }

            setTimeout(slidesWrapper.removeEventListener('pointermove', listenDir),100);
        }
        slidesWrapper.addEventListener('pointermove', listenDir);
        slidesWrapper.addEventListener('pointerup', () =>{
            slidesWrapper.removeEventListener('pointermove', listenDir)
        })
    });
    }
    slider({
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    //если страница скролится, можно убрать свайпы по слайдеру


//calculator
function calc() {

  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
  } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
  } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.classList.remove(activeClass);
          if (elem.getAttribute('id') === localStorage.getItem('sex')) {
              elem.classList.add(activeClass);
          }
          if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
              elem.classList.add(activeClass);
          }
      });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
          result.textContent = '____';
          return;
      }

      if (sex === 'female') {
          result.textContent = Math.round((447,6 + (9.2 * weight) + (3.1 * height) - (4,3 * age)) * ratio);
      } else {
          result.textContent = Math.round((88,36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
          elem.addEventListener('click', (e) => {
              if (e.target.getAttribute('data-ratio')) {
                  ratio = +e.target.getAttribute('data-ratio');
                  localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
              } else {
                  sex = e.target.getAttribute('id');
                  localStorage.setItem('sex', e.target.getAttribute('id'));
              }
  
              elements.forEach(elem => {
                  elem.classList.remove(activeClass);
              });
  
              e.target.classList.add(activeClass);
  
              calcTotal();
          });
      });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector){
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

          if (input.value.match(/\D/g)) {
              input.style.border = '1px solid red';
          } else {
              input.style.border = 'none';
          }

          switch(input.getAttribute('id')) {
              case 'height':
                  height = +input.value;
                  break;
              case 'weight':
                  weight = +input.value;
                  break;
              case 'age':
                  age = +input.value;
                  break;
          }
        calcTotal();
      });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
  }
  calc();


// cards
const menu = [
    {
        img: "img/tabs/vegy.jpg",
        altimg: "vegy",
        title: "Меню 'Фитнес'",
        descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        price: 229
    },
    {
        img: "img/tabs/post.jpg",
        altimg: "post",
        title: "Меню 'Постное'",
        descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        price: 270
    },
    {
        img: "img/tabs/elite.jpg",
        altimg: "elite",
        title: "Меню 'Премиум'",
        descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        price: 320
    }
  ]
  
  function renderCards() {
  
    const cards = document.querySelector('#cards');

    return (
        cards.innerHTML = menu.map(({img, altimg, title, descr, price}) => (
        `<div class="menu__item">
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
        </div>`
        )).join('')
    )
  }
  
  renderCards();

//timer
  function timer(id, deadline) {

    function getTimeRemaning(endTime) {
      const t = Date.parse(endTime) - Date.parse(new Date()),
      // Второй date.parse можно убрать, но оставим элементы идентичными для наглядности.
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        seconds = Math.floor((t / 1000) % 60);

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
      } else {
      return num;
    }
  }

  function setClock (selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function  updateClock() {
      const t = getTimeRemaning(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
  }
  timer('.timer', '2022-08-11');

// modal
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
    
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerDelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerDelector),
        modal = document.querySelector(modalSelector);

            // чтобы добавить селектор, не вызвав openModal, обернём в стрелочную
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
                
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector); 
        }
    });                                              // найти коды клавиш - event.code в гугле

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); 
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}
const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
modal('[data-modal]', '.modal', modalTimerId);


// hamburger - tap to show menu & block scroll
const body = document.querySelector('body'),
    headerMenu = document.querySelector('.header__links'),
    menuItem = document.querySelectorAll('.header__link'),
    hamburger = document.querySelector('.hamburger');

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger_active");
  headerMenu.classList.toggle('header__links_active');
  document.body.classList.toggle('fixed');
});

menuItem.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    headerMenu.classList.toggle('header__links_active');
    body.classList.toggle('fixed');
  })
})

// cделать завершающее окно заглушкой - по заполнении полей и нажатии кнопки
});