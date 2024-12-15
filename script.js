let usersData = [];

// Функція для відображення користувачів
function displayUsers(users) {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = '';

    // Виведення користувачів
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
        <img src="${user.picture?.large || ''}?${new Date().getTime()}" alt="User Picture" />
        <p><strong>Ім'я:</strong> ${user.name?.first || ''} ${user.name?.last || ''}</p>
        <p><strong>Телефон:</strong> ${user.cell || ''}</p>
        <p><strong>Місто:</strong> ${user.location?.city || ''}</p>
        <p><strong>Країна:</strong> ${user.location?.country || ''}</p>
        `;

        usersContainer.appendChild(userCard);
    });
}

// Функція для отримання даних з API
function loadUsers() {
    fetch('https://randomuser.me/api/?results=5')
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка при завантаженні даних');
            }
            return response.json();
        })
        .then(data => {
            usersData = data.results;  
            displayUsers(usersData);  
        })
        .catch(error => {
            console.error('Сталася помилка:', error);
        });
}

// Функція для завантаження користувачів з файлу
function uploadUsersFromFile(event) {
    const file = event.target.files[0];  
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);  
            usersData = data;  
            displayUsers(usersData);  
        } catch (error) {
            console.error('Помилка при читанні файлу:', error);
        }
    };

    reader.readAsText(file); 
}

document.getElementById('loadUsersBtn').addEventListener('click', loadUsers);
document.getElementById('uploadFile').addEventListener('change', uploadUsersFromFile);

loadUsers();
