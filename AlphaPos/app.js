const alphaPos = new AlphaPos()
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')

// constructor function for drink
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}
Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

// new the alphaPos Instance
addDrinkButton.addEventListener('click', function () {
  console.log('click')
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)
  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  console.log(drink)
  console.log(drink.price())
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

// AlphaPos Constructor Function
function AlphaPos() { }
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    console.log(event.target)
    return
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
  console.log(event.target.parentElement.parentElement.parentElement)
})

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
    console.log(drink)
    console.log(drink.textContent)
  })
  return totalAmount
}

AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}
checkoutButton.addEventListener('click', function () {
  // 計算訂單總金額
  alert(`Total amount of drink: ${alphaPos.checkout()}`)

  // 清空訂單
  alphaPos.clearOrder(orderLists)
})
