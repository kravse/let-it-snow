document.addEventListener("DOMContentLoaded", async function () {
  let storage = await browser.storage.local.get('disabled');
  let disabled = storage.disabled || false;

  const setClass = (disabled) => {
    if (disabled) {
      document.getElementById('toggle').classList.add('disabled')
    } else {
      document.getElementById('toggle').classList.remove('disabled')
    }
  }
  const setState = (disabled) => {
    setClass(disabled)
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { disable: disabled });
      });
    });
  }
  setState(disabled);
  document.getElementById('toggle').addEventListener("click", (e) => {
    e.preventDefault();
    disabled = !disabled
    browser.storage.local.set({ ['disabled']: disabled })
    setState(disabled)
  });
});

