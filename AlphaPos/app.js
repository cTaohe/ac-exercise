// 列出所有飲料品項，一次只能選擇一個品項
// 列出調整冰塊量的選項，一次只能選擇一個選項，預設是正常冰(Regular)
// 列出調整甜度的選項，一次只能選擇一個選項，預設是正常甜(Regular)
// 點擊新增(Add) 按鈕後，會得到店員所點選的項目，並且顯示於左側飲料訂單區
// 若沒有選擇飲料品項就直接點選新增按鈕，會出現錯誤提示：「請至少選擇一種飲料」

// constructor function for drink
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

let bubbleMilkTea = new Drink('Bubble Milk Tea', 'No sugar', 'Less Ice')
