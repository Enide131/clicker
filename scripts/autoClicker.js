 class Upgrade
 {
    constructor(cost, increment, interval)
    {
      this.cost = cost;
      this.increment = increment;
      this.interval = interval;
      this.label = `Auto Clicker (Cost: ${cost}`;
      this.count = 0;
    }
 }
 
 let autoClickers = 
    [
      new Upgrade(10, 1, 1000),
      new Upgrade(50, 4, 4000),
      new Upgrade(100, 9, 10000)
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
            //autoClickButton.textContent = `Auto Clicker (Cost: ${clicker.cost})`;
    
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
    
  