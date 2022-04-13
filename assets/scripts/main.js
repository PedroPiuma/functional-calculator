const sum = (n1, n2) => Number(n1) + Number(n2)
const subtraction = (n1, n2) => Number(n1) - Number(n2)
const multiplication = (n1, n2) => Number(n1) * Number(n2)
const division = (n1, n2) => Number(n1) / Number(n2)
const operator = {
    '+': sum,
    '-': subtraction,
    '*': multiplication,
    '/': division,
}
let aux = []
let flag = 0

let auxEqual = []
let enterFlag = 0

const form = document.querySelector('#calculator')
const input = document.querySelector('.calculator-container-input')

const clearFunction = (eventValue) => {
    aux = []
    auxEqual = []
    flag = 0
    enterFlag = 0
    input.setAttribute('placeholder', '🚀')
    input.value = ''
}

const operatorFunction = (eventValue) => {
    if (enterFlag === 1) {
        console.log('entrou')
        let func = operator[eventValue]
        aux[1] = (eventValue)
        console.log(aux)
        enterFlag = 0
    } else if (flag === 0) {
        aux.push(input.value.replaceAll(" ", ""), eventValue)
        input.value = ''
        input.setAttribute('placeholder', aux[0])
        input.classList.remove('placeholder-black')
        flag = 1
        console.log('Aqui: ' + aux)
    } else {
        aux.push(input.value.replaceAll(" ", ""))
        const result = operator[aux[1]](aux[0], aux[2])
        aux = [result, eventValue]
        input.value = ''
        input.setAttribute('placeholder', result)
        input.classList.add('placeholder-black')
    }
}

const equalFunction = (eventValue) => {
    try {
        if (enterFlag === 0) {
            enterFlag = 1
            flag = 0
            aux.push(input.value.replaceAll(" ", ""))
            let func = operator[aux[1]]
            const result = func(aux[0], aux[2])
            auxEqual = aux[2]
            input.value = ''
            input.setAttribute('placeholder', result)
            input.classList.add('placeholder-black')
            aux = [result, aux[1]]
        } else if (enterFlag = 1) {
            let func = operator[aux[1]]
            aux.push(auxEqual)
            const result = func(aux[0], aux[2])
            aux = [result, aux[1]]
            input.setAttribute('placeholder', result)
            console.log(result)
        }
    } catch (error) {
        console.log('Nenhuma operação realizada')
    }
}
window.onload = () => {
    form.addEventListener('keydown', event => {
        if (event.key in operator) {
            event.preventDefault()
            return operatorFunction(event.key)
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            return equalFunction('=')
        }
    })

    form.addEventListener('submit', event => {
        event.preventDefault()
        const eventValue = event.submitter.value

        if (eventValue === 'clear') {
            return clearFunction(eventValue)
        }

        if (eventValue in operator) {
            return operatorFunction(eventValue)
        }

        if (eventValue === '=') {
            return equalFunction(eventValue)
        }

        input.value += eventValue
    })

}
