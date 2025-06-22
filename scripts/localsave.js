export function saveGame(moneyCount, clickBonus, autoClickers) {
  localStorage.setItem('moneyCount', moneyCount);
  localStorage.setItem('clickBonus', clickBonus);
  localStorage.setItem('autoClickers', JSON.stringify(autoClickers.map(c => ({
    count: c.count,
    cost: c.cost
  }))));
}

export function loadGame(autoClickers) {
  const savedMoney = parseFloat(localStorage.getItem('moneyCount'));
  const savedBonus = parseFloat(localStorage.getItem('clickBonus'));
  const savedClickers = JSON.parse(localStorage.getItem('autoClickers'));

  let moneyCount = 0;
  let clickBonus = 1;

  if (!isNaN(savedMoney)) moneyCount = savedMoney;
  if (!isNaN(savedBonus)) clickBonus = savedBonus;
  if (Array.isArray(savedClickers)) {
    savedClickers.forEach((data, index) => {
      if (autoClickers[index]) {
        autoClickers[index].count = data.count;
        autoClickers[index].cost = data.cost;
      }
    });
  }
  
  return { moneyCount, clickBonus };
}

export function resetGame(autoClickers) {
  localStorage.clear();
  autoClickers.forEach(c => {
    c.count = 0;
    c.cost = c.initialCost;
  });
}