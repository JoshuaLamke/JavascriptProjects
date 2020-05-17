const generateInputDOM = (titleOfDiv, titleOfInput, placeholder) => {
    const innerDiv = document.createElement('div')
    const outerDiv = document.createElement('div')
    const p = document.createElement('p')
    const textInput = document.createElement('input')
    //Set up div with text inside
    innerDiv.setAttribute('id', `${titleOfDiv}-inner-div`)
    p.setAttribute('class', 'white-text')
    p.textContent = titleOfInput
    innerDiv.appendChild(p)

    //Set up outer div with input field
    outerDiv.setAttribute('id',`${titleOfDiv}-outer-div`)
    textInput.setAttribute('placeholder',placeholder)
    outerDiv.appendChild(innerDiv)
    outerDiv.appendChild(textInput)
    return outerDiv
}
