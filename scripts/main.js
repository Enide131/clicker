// Основные переменные
let moneyCount = 0;
const counterMoneyDisplay = document.getElementById('moneyCounter');
const clickerButton = document.getElementById('clickerButton');
const autoClickersContainer = document.getElementById('autoClickersContainer');

// Обновление счётчика денег
function updateMoneyCounter() {
  counterMoneyDisplay.textContent = moneyCount;
}

// Обработчик клика на основную кнопку
clickerButton.addEventListener('click', () => {
  moneyCount++;
  updateMoneyCounter();
});

// Данные автокликеров
const autoClickers = [
  { cost: 10, increment: 1, interval: 1000, label: "Auto Clicker 1", count: 0 },
  { cost: 50, increment: 2, interval: 800, label: "Auto Clicker 2", count: 0 },
  { cost: 100, increment: 5, interval: 500, label: "Auto Clicker 3", count: 0 }
];

// Функция для создания кнопок автокликеров
autoClickers.forEach((clicker, index) => {
  const autoClickerWrapper = document.createElement('div');
  autoClickerWrapper.classList.add('auto-clicker-wrapper');

  const autoClickButton = document.createElement('button');
  autoClickButton.textContent = `${clicker.label} (Cost: ${clicker.cost})`;
  autoClickButton.classList.add('auto-click-button');

  const purchaseCountDisplay = document.createElement('span');
  purchaseCountDisplay.classList.add('purchase-count');
  purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;

  // Обработчик клика для покупки автокликера
  autoClickButton.addEventListener('click', () => {
    if (moneyCount >= clicker.cost) {
      moneyCount -= clicker.cost;
      updateMoneyCounter();

      clicker.count++;
      purchaseCountDisplay.textContent = `Bought: ${clicker.count}`;

      // Запуск интервала для автоклика
      setInterval(() => {
        moneyCount += clicker.increment * clicker.count;
        updateMoneyCounter();
      }, clicker.interval);
    } else {
      alert("Not enough money for this Auto Clicker!");
    }
  });

  autoClickerWrapper.appendChild(autoClickButton);
  autoClickerWrapper.appendChild(purchaseCountDisplay);
  autoClickersContainer.appendChild(autoClickerWrapper);
});


