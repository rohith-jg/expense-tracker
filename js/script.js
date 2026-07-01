const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const categoryTotals = document.getElementById('category-totals');
const filterCategory = document.getElementById('filter-category');
const emptyState = document.getElementById('empty-state');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function renderExpenses() {
  const selectedCategory = filterCategory.value;
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  expenseList.innerHTML = '';

  if (filteredExpenses.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  filteredExpenses.forEach((expense) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>${formatCurrency(expense.amount)}</td>
      <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
    `;
    expenseList.appendChild(row);
  });

  renderTotals();
}

function renderTotals() {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  totalAmount.textContent = formatCurrency(total);

  const totalsByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  categoryTotals.innerHTML = '';

  Object.entries(totalsByCategory).forEach(([category, amount]) => {
    const item = document.createElement('div');
    item.innerHTML = `<strong>${category}</strong>: ${formatCurrency(amount)}`;
    categoryTotals.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const expense = {
    id: Date.now().toString(),
    date: document.getElementById('date').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    amount: document.getElementById('amount').value
  };

  expenses.push(expense);
  saveExpenses();
  form.reset();
  renderExpenses();
});

expenseList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.getAttribute('data-id');
    expenses = expenses.filter((expense) => expense.id !== id);
    saveExpenses();
    renderExpenses();
  }
});

filterCategory.addEventListener('change', renderExpenses);

renderExpenses();
