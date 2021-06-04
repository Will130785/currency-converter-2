// Get DOM elements
const select1 = document.querySelector('.exchange-currency-select1')
const select2 = document.querySelector('.exchange-currency-select2')
const input1 = document.querySelector('.exchange-currency-input1')
const input2 = document.querySelector('.exchange-currency-input2')
const swapBtn = document.querySelector('.exchange-swap-btn')
const singleCur = document.querySelector('.single-container')

// Store
const store = {
  selected1: '',
  selected2: '',
  input1: '',
  input2: ''
}

// Function to get currencys
const getCurrencies = async () => {
  const apiKey = '4ba9b56685f9a74749c1893f'
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
  const resultData = res.json()
  return resultData
}

// Function to get exchange rate data
const getRateData = async (currency1, currency2, amt) => {
  // Check all info to make api call is available
  if (currency1 && currency2 && amt) {
    const apiKey = '4ba9b56685f9a74749c1893f'
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency1}/${currency2}/${amt}`)
    const resultData = res.json()
    return resultData
  } else {
    return 'No call made'
  }
}

// Function to handle rate data
const handleGetRateData = () => {
  getRateData(store.selected1, store.selected2, store.input1)
    .then(response => {
      input2.value = response.conversion_result
      store.input2 = response.conversion_result
    })
    .catch(error => {
      console.log(error)
    })
}
// Get currencies for selection
const getCurrencySelections = async () => {
  getCurrencies()
    .then(response => {
      response.supported_codes.forEach((item, index) => {
        // output select options into html
        select1.innerHTML += `<option value="${item[0]}">${item[0]}</option>`
        select2.innerHTML += `<option value="${item[0]}">${item[0]}</option>`
      })
    })
    .catch(error => {
      console.log(error)
    })
}

// Get single unit amount
const getSingleUnit = async (currency1, currency2) => {
  if (currency1 && currency2) {
    const apiKey = '4ba9b56685f9a74749c1893f'
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currency1}/${currency2}/1`)
    const resultData = res.json()
    return resultData
  } else {
    return 'No call made'
  }
}

// Handle single unit request
const handleSingleUnit = () => {
  getSingleUnit(store.selected1, store.selected2)
    .then(response => {
      if (store.selected1 && store.selected2) {
        singleCur.innerHTML = `<p>1 ${store.selected1} = ${response.conversion_result} ${store.selected2}`
      }
    })
    .catch(error => {
      console.log(error)
    })
}

getCurrencySelections()

// Event listeners
select1.addEventListener('change', e => {
  store.selected1 = e.target.value
  handleGetRateData()
  handleSingleUnit()
})

select2.addEventListener('change', e => {
  store.selected2 = e.target.value
  handleGetRateData()
  handleSingleUnit()
})

input1.addEventListener('input', e => {
  store.input1 = e.target.value
  handleGetRateData()
  handleSingleUnit()
})

input2.addEventListener('input', e => {
  store.input2 = e.target.value
  handleGetRateData()
  handleSingleUnit()
})

swapBtn.addEventListener('click', e => {
  let tempValue = store.selected1
  store.selected1 = store.selected2
  store.selected2 = tempValue
  tempValue = store.input1
  store.input1 = store.input2
  store.input2 = tempValue
  select1.value = store.selected1
  select2.value = store.selected2
  input1.value = store.input1
  input2.value = store.input2
  handleSingleUnit()
})
