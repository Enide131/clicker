const autoClickers = [
    { cost: 10, increment: 1, interval: 1000, label: "Auto Clicker 1 (Cost: 10)", count: 0 },
    { cost: 50, increment: 2, interval: 800, label: "Auto Clicker 2 (Cost: 50)", count: 0 },
    { cost: 100, increment: 5, interval: 500, label: "Auto Clicker 3 (Cost: 100)", count: 0 }
  ];
  
  export function setupAutoClickers(container, getMoney, setMoney) {
    autoClickers.forEach((clicker) => {
      const autoClickerWrapper = document.createElement('div');
      autoClickerWrapper.classList.add('auto-clicker-wrapper');
  
      const autoClickButton = document.createElement('button');
      autoClickButton.textContent = clicker.label;
      autoClickButton.classList.add('auto-click-button');
  
      const purchaseCountDisplay = document.createElement('span');
      purchaseCountDisplay.classList.add('purchase-count');
      purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;
  
      autoClickButton.addEventListener('click', () => {
        if (getMoney() >= clicker.cost) {
          setMoney(getMoney() - clicker.cost);
          clicker.count++;
          purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;
  
          setInterval(() => {
            setMoney(getMoney() + clicker.increment * clicker.count);
          }, clicker.interval);
        } else {
          alert("Not enough money for this Auto Clicker!");
        }
      });
  
      autoClickerWrapper.appendChild(autoClickButton);
      autoClickerWrapper.appendChild(purchaseCountDisplay);
      container.appendChild(autoClickerWrapper);
    });
  }
  