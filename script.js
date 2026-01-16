document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const itemInput = document.getElementById('itemInput');
    const addBtn = document.getElementById('addBtn');
    const shoppingList = document.getElementById('shoppingList');
    const clearBtn = document.getElementById('clearBtn');

    // State
    let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

    // Initialize
    renderItems();

    // Event Listeners
    addBtn.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });
    clearBtn.addEventListener('click', clearAllItems);

    // Functions
    function addItem() {
        const text = itemInput.value.trim();
        if (text === '') return;

        const newItem = {
            id: Date.now(),
            text: text,
            completed: false
        };

        items.push(newItem);
        saveAndRender();
        itemInput.value = '';
        itemInput.focus();
    }

    function toggleItem(id) {
        items = items.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        saveAndRender();
    }

    function deleteItem(id, event) {
        event.stopPropagation(); // Prevent toggling when deleting
        items = items.filter(item => item.id !== id);
        saveAndRender();
    }

    function clearAllItems() {
        if (confirm('Are you sure you want to clear the entire list?')) {
            items = [];
            saveAndRender();
        }
    }

    function renderItems() {
        shoppingList.innerHTML = '';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = `list-item ${item.completed ? 'completed' : ''}`;
            li.onclick = () => toggleItem(item.id);

            const span = document.createElement('span');
            span.textContent = item.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;'; // HTML entity for multiplication sign (X)
            deleteBtn.onclick = (e) => deleteItem(item.id, e);
            deleteBtn.title = "Delete Item";

            li.appendChild(span);
            li.appendChild(deleteBtn);
            shoppingList.appendChild(li);
        });
    }

    function saveAndRender() {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
        renderItems();
    }
});
