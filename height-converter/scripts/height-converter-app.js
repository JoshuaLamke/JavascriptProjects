const feetDiv = generateInputDOM('feet', 'feet', 'Input Feet')
const inchesDiv = generateInputDOM('inches', 'inches', 'Input Inches')
const inputContainer = document.querySelector('#inputs')
inputContainer.appendChild(feetDiv)
inputContainer.appendChild(document.createElement('br'))
inputContainer.appendChild(inchesDiv)
inputContainer.appendChild(document.createElement('br'))
let centimetersFromFeet = 0
let centimetersFromInches = 0
feetDiv.children[1].addEventListener('change',(e) => {
    try{
        if(isNaN(e.target.value)){
            throw Error('Please input a number')
        }
        centimetersFromFeet = e.target.value * 2.54 * 12
    }catch(e){
        window.alert(e.message)
    }
})
inchesDiv.children[1].addEventListener('change',(e) => {
    try{
        if(isNaN(e.target.value)){
            throw Error('Please input a number')
        }
        centimetersFromInches = e.target.value * 2.54
    }catch(e){
        window.alert(e.message)
    }
})
document.querySelector('#convert-button').addEventListener('click', (e) => {
    document.querySelector('#result').textContent = `${(centimetersFromFeet + centimetersFromInches).toFixed(2)}cm`
})
