
let transactions = [];

const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const listEl = document.getElementById('list');


function fetchData(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'income', amount: 50000, category: 'Allowance' },
        { id: 2, type: 'expense', amount: 300, category: 'Snacks' }
      ]);
    }, 1000);
  });
}


function calculate(){
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, curr) => sum + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, curr) => sum + curr.amount, 0);

  incomeEl.innerText = `₹${totalIncome}`;
  expenseEl.innerText = `₹${totalExpense}`;
  balanceEl.innerText = `₹${totalIncome - totalExpense}`;
}


function render(){
  listEl.innerHTML = "";
  transactions.forEach(t => {
    const div = document.createElement('div');
    div.className = `flex justify-between items-center p-3 rounded-xl ${t.type === 'income' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`;
    div.innerHTML = `
      <div>
        <p class="font-medium text-sm">${t.category}</p>
        <p class="text-xs text-gray-500">${t.type}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-bold">₹${t.amount}</span>
        <button onclick="deleteItem(${t.id})" class="bg-white border px-2 py-1 rounded-lg text-xs hover:bg-gray-100">X</button>
      </div>
    `;
    listEl.appendChild(div);
  });
  calculate();
}

document.getElementById('addBtn').addEventListener('click', () => {
  const type = document.getElementById('type').value;
  const amount = Number(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if(!amount || !category) return alert("Amount & Category type cheyyu!");

  
  const newTransaction = {
    id: Date.now(), // unique id
    type,
    amount,
    category
  };


  transactions.push(newTransaction);
  render();

  // clear inputs
  document.getElementById('amount').value = "";
  document.getElementById('category').value = "";
});

function deleteItem(id){
  transactions = transactions.filter(t => t.id !== id);
  render();
}


async function init(){
  const data = await fetchData();
  transactions = data;
  document.getElementById('loading').style.display = "none";
  render();
}
init();