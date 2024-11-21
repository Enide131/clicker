import { updateMoneyCounter } from './utils.js';
import { setupClickerButton } from './clicker.js';
import { setupAutoClickers } from './autoClicker.js';

let moneyCount = 0;
let clickBonus = 1;



document.addEventListener('DOMContentLoaded', () => {
  const counterMoneyDisplay = document.getElementById('moneyCounter');
  const clickerButton = document.getElementById('clickerButton');
  const autoClickersContainer = document.getElementById('autoClickersContainer');

  setupClickerButton(clickerButton, () => {
    moneyCount += clickBonus;
    updateMoneyCounter(counterMoneyDisplay, moneyCount);
  });

  setupAutoClickers(autoClickersContainer, () => moneyCount, (newCount) => 
    {
      moneyCount = newCount;
      updateMoneyCounter(counterMoneyDisplay, moneyCount);
    }, () => clickBonus, (newBonus) =>
    {
      clickBonus = newBonus;
    })
});



