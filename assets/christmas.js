(async () => {
  document.querySelectorAll(".christmas_extension_flake").forEach(e => e.parentNode.removeChild(e));
  let flake = document.createElement('div');
  flake.className = 'christmas_extension_flake';
  document.body.append(flake);

  function createFlake() {
    const snow = flake.cloneNode(true);
    snow.style.left = Math.random() * 100 + "%";
    snow.style.fontSize = Math.floor(Math.random() * (30 - 11) + 10) +"px";
    snow.style.animationDuration = (Math.random() * 5) + 4 + "s";
    document.body.append(snow);
  }

  function hideFlakes(hide) {
    var divs = document.querySelectorAll('.christmas_extension_flake');
    for (var i = 0; i < divs.length; i++) {
      if (hide) {
        divs[i].classList.add('hide_christmas_flake');
      } else {
        divs[i].classList.remove('hide_christmas_flake');
      }
    }
  }
  function startSnow() {
    let snow = setInterval(createFlake, 250);
    setTimeout(() => {
      clearInterval(snow);
    }, 4000);
  }
  let storage = await browser.storage.local.get('disabled');
  let disabled = storage.disabled;
  startSnow();
  console.log
  if (disabled) {
    hideFlakes(true);
  }

  browser.runtime.onMessage.addListener(msgObj => {
    hideFlakes(msgObj.disable);
  });
})()
