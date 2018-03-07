function fetchNimiqPrice() {
  fetch('https://api.coinmarketcap.com/v1/ticker/nimiq/')
    .then(function(response){
      return response.json()
    })
    .then(function(nimiqTicker){
      const nimiqMarketInfo  = nimiqTicker[0]
      const nimiqPriceUsd    = parseFloat(nimiqMarketInfo.price_usd).toFixed(2)
      const percentChange24h = nimiqMarketInfo.percent_change_24h
      const percentChange1h  = nimiqMarketInfo.percent_change_1h
      const percentChange7d  = nimiqMarketInfo.percent_change_7d

      document.getElementById('price-usd').textContent = `$${nimiqPriceUsd}`
      document.title = `($${nimiqPriceUsd}) Nimiq price - simple and mobile friendly`
 
      percentChanges({
        lastHour: percentChange1h,
        lastDay:  percentChange24h,
        lastWeek: percentChange7d
      })
    })
}

function percentChanges(changes) {
  for (change in changes) {
    showPercentChange(changes[change], change)
  }
}

function showPercentChange(percent, elementId) {
  const percentChangeHeader = document.getElementById(elementId)
  if (percent > 0) {
    percentChangeHeader.classList.add('positive')
  } else {
    percentChangeHeader.classList.add('negative')
  }
 percentChangeHeader.textContent = `${percent}%`
}

fetchNimiqPrice()