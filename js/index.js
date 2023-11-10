const name = document.getElementById('name');
const email = document.getElementById('email');
const age = document.getElementById('age');
const btn = document.getElementById('btn');
const table = document.getElementById('table');
const form = document.getElementById('form');

function isGmailAddressValid(email) {
    // Regular expression for basic Gmail address validation
    let gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    return gmailRegex.test(email);
}

function validate() {
    if (!name.value) {
        name.style.outlineColor = 'red';
        name.focus();
        return;
    }

    if (!email.value) {
        email.style.outlineColor = 'red';
        email.focus();
        return;
    }

    if (!isGmailAddressValid(email.value)) {
        alert('Please enter a valid Gmail address');
        email.style.outlineColor = 'red';
        email.focus();
        email.value = '';
        return;
    }

    if (!age.value) {
        age.style.outlineColor = 'red';
        age.focus();
        return;
    }

    // Additional validation or form submission logic can be added here
}

function createRow(user, index) {
    let strRow = `
    <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
           <span id='user-delete-${user.id}' class='delete'>Delete</span>
           <span class='update'>Update</span>
        </td>
    </tr>`;
    table.innerHTML += strRow;
}

function createAndSave() {
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let user = {};
    user.id = Date.now();
    user.name = name.value;
    user.email = email.value;
    user.age = age.value;
    data.push(user);

    localStorage.setItem('users', JSON.stringify(data));

    createRow(user, data.length - 1);
    form.reset();
}

btn.addEventListener('click', function () {
    validate();
    createAndSave();
});

window.onload = function () {
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    data.forEach((user, index) => {
        createRow(user, index);
    });

    let deleteButtons = document.querySelectorAll('span.delete');
    if (deleteButtons.length) {
        deleteButtons.forEach(item => {
            item.addEventListener('click', function () {
                let confirmDelete = confirm("Do you really want to delete this record?");

                if (confirmDelete) {
                    let userId = item.id.substring(12);

                    data = data.filter(el => el.id != userId);

                    localStorage.setItem('users', JSON.stringify(data));
                    window.location.reload();
                }
            });
        });
    }
};
