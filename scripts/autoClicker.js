 let autoClickers = 
    [
      { cost: 10, increment: 1, interval: 1000, label: `Auto Clicker (Cost: 10)`, count: 0 },
      { cost: 50, increment: 20, interval: 4000, label: "Auto Clicker (Cost: 50)", count: 0 },
      { cost: 100, increment: 90, interval: 10000, label: "Auto Clicker (Cost: 100)", count: 0 },
    ];
    
    export function setupAutoClickers(container, getMoney, setMoney) 
    {
      autoClickers.forEach((clicker) => 
      {
        const autoClickerWrapper = document.createElement('div');
        autoClickerWrapper.classList.add('auto-clicker-wrapper');
    
        const autoClickButton = document.createElement('button');
        autoClickButton.textContent = clicker.label;
        autoClickButton.classList.add('auto-click-button');
    
        const purchaseCountDisplay = document.createElement('span');
        purchaseCountDisplay.classList.add('purchase-count');
        purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;
    
        function updateButtonState() 
        {
          if (getMoney() >= clicker.cost) autoClickButton.disabled = false;
          else autoClickButton.disabled = true;
        }
    
        updateButtonState();
    
        autoClickButton.addEventListener('click', () => 
        {
          if (getMoney() >= clicker.cost) 
          {
            setMoney(getMoney() - clicker.cost);
            clicker.count++;
            clicker.cost = Math.round(clicker.cost * 1.6);
            purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;
            autoClickButton.textContent = `Auto Clicker (Cost: ${clicker.cost})`;
    
            setInterval(() => 
            {
              setMoney(getMoney() + clicker.increment);
            }, clicker.interval);
          } 
        });

        setInterval(updateButtonState, 100);
    
        autoClickerWrapper.appendChild(autoClickButton);
        autoClickerWrapper.appendChild(purchaseCountDisplay);
        container.appendChild(autoClickerWrapper);
      });
    }
    
  