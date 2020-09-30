const { axios } = require("axios");

function tick() {
    var mins = new Date().getMinutes();
    if (mins == "14") {
       axios.get("localhost:5000/airQuality/delete")
    }
    console.log('Tick ' + mins);
  }
  
  setInterval(tick, 1000);