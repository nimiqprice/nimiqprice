function fetchNimiqPrice() {
  fetch('https://api.coinmarketcap.com/v1/ticker/nimiq/')
    .then(function(response){
      return response.json()
    })
    .then(function(nimiqTicker){
      const nimiqMarketInfo = nimiqTicker[0]
      const nimiqPriceUsd   = parseFloat(nimiqMarketInfo.price_usd).toFixed(2)
      document.getElementById('price-usd').innerHTML = `$${nimiqPriceUsd}`
    })
}

fetchNimiqPrice()