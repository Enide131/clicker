class Upgrade
 {
    constructor(cost, increment, interval, click)
    {
      this.cost = cost;
      this.increment = increment;
      this.interval = interval;
      this.click = click;
      this.label = `Auto Clicker (Cost: ${cost})`;
      this.count = 0;
      this.initialCost = cost;
    }
 }
 
 let autoClickers = 
    [
      new Upgrade(10, 1, 9999999, true),
      new Upgrade(10, 1, 1000, false),
      new Upgrade(50, 4, 4000, false),
      new Upgrade(100, 9, 10000, false)
    ];
    
    export function setupAutoClickers(container, getMoney, setMoney, getClickBonus, setClickBonus) {
      autoClickers.forEach((clicker) => {
        const autoClickerWrapper = document.createElement('div');
        autoClickerWrapper.classList.add('auto-clicker-wrapper');

        const autoClickButton = document.createElement('button');
        autoClickButton.classList.add('auto-click-button');

        const purchaseCountDisplay = document.createElement('span');
        purchaseCountDisplay.classList.add('purchase-count');

        function updateButtonStateandInformation() {
          autoClickButton.disabled = getMoney() < clicker.cost;
          purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;

          if (clicker.click === false) {
            autoClickButton.textContent = `Auto Clicker (Cost: ${clicker.cost})`;
          } else {
            autoClickButton.textContent = `Clicker Bonus (Cost: ${clicker.cost})`;
          }
        }

        setInterval(updateButtonStateandInformation, 100);

        function startAutoClickerIfNeeded() {
          if (clicker.click === false && clicker.count > 0 && !clicker._intervalStarted) {
            clicker._intervalStarted = true;

            setInterval(() => {
              setMoney(getMoney() + clicker.increment * clicker.count);
            }, clicker.interval);
          }
        }

        startAutoClickerIfNeeded();

        autoClickButton.addEventListener('click', () => {
          if (getMoney() < clicker.cost) return;

          setMoney(getMoney() - clicker.cost);
          clicker.count++;
          clicker.cost = Math.round(clicker.cost * 1.6);

          if (clicker.click) {
            setClickBonus(getClickBonus() + clicker.increment);
          } else {
            startAutoClickerIfNeeded();
          }
        });

        autoClickerWrapper.appendChild(autoClickButton);
        autoClickerWrapper.appendChild(purchaseCountDisplay);
        container.appendChild(autoClickerWrapper);
      });
}


    export { autoClickers };
