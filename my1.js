let contacts = [];
// Hàm hiển thị danh sách liên hệ
function renderContacts() {
    let contactListBody = document.getElementById('contact-list-body');
    contactListBody.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>${contact.other}</td>
            <td>
                <button onclick="editContact(${i})">Edit</button>
                <button onclick="deleteContact(${i})">Delete</button>
            </td>
        `;
        contactListBody.appendChild(row);
    }
}

// Xử lý sự kiện thêm , chỉnh sửa liên hệ
document.getElementById('contact-form').addEventListener("submit", function(event) {
    event.preventDefault();
    let contactForm = event.target;
    let name = contactForm.name.value;
    let phone = contactForm.phone.value;
    let email = contactForm.email.value;
    let other = contactForm.other.value;
    let contactIndex = contactForm['contact-index'].value;

    let newContact = {
        name: name,
        phone: phone,
        email: email,
        other: other
    };

    if (contactIndex === "") {
        contacts.push(newContact);
    } else {
        contacts[contactIndex] = newContact;
        document.getElementById('btn-save').style.display = "none";
        document.querySelector('input[type="submit"]').style.display = "inline";
    }

    contactForm.reset();
    document.getElementById('contact-index').value = "";
    renderContacts();
});

// Xử lý sự kiện xóa liên hệ
function deleteContact(index) {
    let confirmDelete = confirm("Are you sure you want to delete this contact #" + (index + 1) + "?");
    if (confirmDelete) {
        contacts.splice(index, 1);
        renderContacts();
    }
}

// Xử lý sự kiện chỉnh sửa liên hệ
function editContact(index) {
    let contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('other').value = contact.other;
    document.getElementById('contact-index').value = index;
    document.getElementById('btn-save').style.display = "inline";
    document.querySelector('input[type="submit"]').style.display = "none";
}

// Xử lý sự kiện lưu liên hệ chỉnh sửa
document.getElementById('btn-save').addEventListener('click', function() {
    let contactForm = document.getElementById('contact-form');
    let name = contactForm.name.value;
    let phone = contactForm.phone.value;
    let email = contactForm.email.value;
    let other = contactForm.other.value;
    let contactIndex = contactForm['contact-index'].value;

    let updatedContact = {
        name: name,
        phone: phone,
        email: email,
        other: other
    };

    if (contactIndex !== "") {
        contacts[contactIndex] = updatedContact;
        contactForm.reset();
        document.getElementById('contact-index').value = "";
        document.getElementById('btn-save').style.display = "none";
        document.querySelector('input[type="submit"]').style.display = "inline";
        renderContacts();
    }
});