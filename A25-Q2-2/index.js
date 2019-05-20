const sliders = document.querySelector('.sliders')
const hexValue = document.querySelector('.hex-value')
const body = document.querySelector('body')
const red = document.querySelector('.red-number')
const green = document.querySelector('.green-number')
const blue = document.querySelector('.blue-number')

function numberToHex(color) {
  const hex = Number(color).toString(16)
  if (hex.length === 1) return `0${hex}`
  return hex
}

function rgbToHex(r, g, b) {
  const hexColor = `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`
  hexValue.value = hexColor
  body.style.backgroundColor = hexColor
}

sliders.addEventListener("input", event => {

  if (event.target.tagName === 'INPUT') {
    const colorValue = event.target.nextElementSibling
    colorValue.innerHTML = event.target.value
  }
  rgbToHex(red.innerText, green.innerText, blue.innerText)
})
