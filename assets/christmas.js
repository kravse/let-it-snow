(async () => {
  document.querySelectorAll(".christmas_extension_flake").forEach(e => e.parentNode.removeChild(e));
  let flake = document.createElement('div');
  flake.className = 'christmas_extension_flake';
  document.body.append(flake);

  function createFlake() {
    const clone = flake.cloneNode(true);
    clone.style.left = Math.random() * 100 + "%";
    clone.style.fontSize = Math.floor(Math.random() * (30 - 11) + 10) +"px";
    document.body.append(clone);
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
  console.info(storage)
  startSnow();
  console.log
  if (disabled) {
    hideFlakes(true);
  }

  browser.runtime.onMessage.addListener(msgObj => {
    hideFlakes(msgObj.disable);
  });
})()
