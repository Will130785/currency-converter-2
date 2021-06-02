// Function to get currencys
const getCurrencies = async () => {
  const apiKey = '4ba9b56685f9a74749c1893f'
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
  resultData = res.json()
  return resultData
}

// Function to get exchange rate data
const getRateData = async () => {
  const apiKey = '4ba9b56685f9a74749c1893f'
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/GBP/23.00`)
  resultData = res.json()
  return resultData
}

// Get currencies for selection
const getCurrencySelections = async () => {
  getCurrencies()
    .then(response => {
      response.supported_codes.forEach((item, index) => {
        console.log(item[0])
        // Get select element
        const select1 = document.querySelector('.exchange-currency-select1')
        const select2 = document.querySelector('.exchange-currency-select2')
        // output select options into html
        select1.innerHTML += `<option value="${item[0]}">${item[0]}</option>`
        select2.innerHTML += `<option value="${item[0]}">${item[0]}</option>`
      })

    })
    .catch(error => {
      console.log(error)  
    })
}

getRateData()
  .then(response => {
    console.log(response)
  })

  getCurrencySelections()