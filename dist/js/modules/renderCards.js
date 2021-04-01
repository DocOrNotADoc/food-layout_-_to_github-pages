const menu = [
  {
    img: "img/tabs/vegy.jpg",
    altimg: "vegy",
    title: "Меню 'Фитнес'",
    descr: "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    price: 9
  },
  {
    img: "img/tabs/post.jpg",
    altimg: "post",
    title: "Меню 'Постное'",
    descr: "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    price: 14
  },
  {
    img: "img/tabs/elite.jpg",
    altimg: "elite",
    title: "Меню 'Премиум'",
    descr: "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    price: 21
  }
]

function renderCards() {

  const cards = document.querySelector('#cards');
  return (
      cards.innerHTML = menu.map(({img, altimg, title, descr, price}) => (
      `<img src=${img} alt=${altimg}>
      <h3 class="menu__item-subtitle">${title}</h3>
      <div class="menu__item-descr">${descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${price}</span> грн/день</div>
      </div>`
      )).join('')
  )
}

export default renderCards;