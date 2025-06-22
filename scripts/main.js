import { autoClickers, setupAutoClickers } from './autoClicker.js';
import { saveGame, loadGame, resetGame} from './localsave.js';


let moneyCount = 0;
let clickBonus = 1;

function updateMoneyCounter(element, moneyCount) 
{
    element.textContent = `Money: ${moneyCount}`;
}

function setupClickerButton(button, onClick) 
{
    button.addEventListener('click', onClick);
}

document.addEventListener('DOMContentLoaded', () => 
{
  const counterMoneyDisplay = document.getElementById('moneyCounter');
  const clickerButton = document.getElementById('clickerButton');
  const autoClickersContainer = document.getElementById('autoClickersContainer');

  const loaded = loadGame(autoClickers);
  moneyCount = loaded.moneyCount;
  clickBonus = loaded.clickBonus;
  updateMoneyCounter(counterMoneyDisplay, moneyCount);
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
    
  document.getElementById('resetButton').addEventListener('click', () => {
    localStorage.clear();
    moneyCount = 0;
    clickBonus = 1;
    resetGame(autoClickers);
    updateMoneyCounter(counterMoneyDisplay, moneyCount);
  });

    setInterval(() => saveGame(moneyCount, clickBonus, autoClickers), 3000);
    window.addEventListener('beforeunload', () => saveGame(moneyCount, clickBonus, autoClickers));
});

