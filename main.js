
document.getElementById('refresh-btn').addEventListener('click', fetchUsers);
document.getElementById('sort').addEventListener('change', sortUsers);
document.getElementById('filter').addEventListener('input', filterUsers);



let usersData = []; // массив для хранения данных о пользователях

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            usersData = users; // сохраняем данные о пользователях
            displayUsers(usersData); // отображаем пользователей
        })
        .catch(error => {
            console.error('Ошибка при выборке пользователей:', error);
            alert('Не удалось найти пользователей. Пожалуйста, повторите попытку позже.');
        });
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userCard = document.createElement('li');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
                    <div class="user-card__name">${user.name}</div>
                    <div class="user-card__email">${user.email}</div>
                    <div class="user-card__phone">${user.phone}</div>
                `;
        userList.appendChild(userCard);
    });
}

function sortUsers() {
    const sortBy = document.getElementById('sort').value;
    const sortedUsers = [...usersData].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    displayUsers(sortedUsers);
}

function filterUsers() {
    const filterBy = document.getElementById('filter').value.toLowerCase();
    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(filterBy) ||
        user.email.toLowerCase().includes(filterBy)
    );
    displayUsers(filteredUsers);
}

fetchUsers(); // Загрузка пользователей при загрузке страницы
