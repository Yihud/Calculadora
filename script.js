const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function isValidExpression(expr) {
  // Expressão válida: apenas números, operadores e ponto
  return /^[0-9+\-*/.() ]+$/.test(expr);
}

function calculate() {
  const expression = display.value;
  try {
    if (!expression || !isValidExpression(expression)) {
      display.value = 'Erro';
      return;
    }

    const result = eval(expression);

    if (!isFinite(result)) {
      display.value = 'Erro';
    } else {
      addToHistory(expression + ' = ' + result);
      display.value = result;
    }

  } catch {
    display.value = 'Erro';
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}

// Teclado funcional
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
  }
});
