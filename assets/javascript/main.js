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
      const totalMarketCap   = nimiqMarketInfo.market_cap_usd
      const priceBtc         = nimiqMarketInfo.price_btc

      document.getElementById('price-usd').textContent = `$${nimiqPriceUsd}`
      document.title = `($${nimiqPriceUsd}) Nimiq price - simple and mobile friendly`
 
      percentChanges({
        lastHour: percentChange1h,
        lastDay:  percentChange24h,
        lastWeek: percentChange7d
      })

      document.getElementById('marketcap').textContent = prettyMarketCap(totalMarketCap)
      document.getElementById('nim-value').textContent = `$${priceOfNim(nimiqPriceUsd)}`
      document.getElementById('price-btc').textContent = `${priceBtc} BTC`

      fetchEthPrice(nimiqPriceUsd)
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

function prettyMarketCap(marketcap) {
  const oneMillion          = 1000000
  const marketCapInMillions = parseFloat(marketcap / oneMillion).toFixed(1)
  return `$${marketCapInMillions} Million`
}

function priceOfNim(netPrice) {
  return parseFloat(netPrice / 100.0).toFixed(3)
}

function fetchEthPrice(nimiqPriceUsd) {
  fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
    .then(function(response){
      return response.json()
    })
    .then(function(ethTicker){
      const ethMarketInfo    = ethTicker[0]
      const priceOfNimiqInEth = parseFloat(nimiqPriceUsd / ethMarketInfo.price_usd).toFixed(7)
      document.getElementById('price-eth').textContent = `${priceOfNimiqInEth} ETH`
    })
}

fetchNimiqPrice()

setInterval(function() {
  window.location.reload();
}, 180000);

// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');

    // Offline icon
    var offline = document.getElementById("offline");
    function updateOnlineStatus(event) {
      var condition = navigator.onLine ? "none" : "block";  
      offline.style.display = condition;
    }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  });
}
