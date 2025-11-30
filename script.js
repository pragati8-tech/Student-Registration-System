const inputName = document.querySelector('.name')
const studentId = document.querySelector('.stdId')
const emailId = document.querySelector('.emailId')
const contact = document.querySelector('.contact')
const submit = document.querySelector('.submit')
const form = document.querySelector('.form')
const table = document.querySelector('.list')
const info = document.querySelector('.info')
const tableBody = document.getElementById('table')

// Page load पर students load करें
document.addEventListener('DOMContentLoaded', loadStudents);

// Submit button का event
submit.onclick = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!validateForm()) {
        alert('Please fill all fields correctly!');
        return;
    }
    
    // Student data collect करें
    const studentData = {
        name: inputName.value,
        studentId: studentId.value,
        email: emailId.value,
        contact: contact.value
    };
    
    // Save to localStorage
    saveStudent(studentData);
    
    // Table में display करें
    displayStudent(studentData);
    
    // Form hide करें और table show करें
    form.style.display = 'none';
    table.style.display = 'table';
    info.innerText = 'Student Information';
    
    // Form reset करें
    form.reset();
}

// Form validation function
function validateForm() {
    if (!inputName.value || !studentId.value || !emailId.value || !contact.value) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId.value)) {
        return false;
    }
    
    // Contact number validation (10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact.value)) {
        return false;
    }
    
    return true;
}

// Student को localStorage में save करें
function saveStudent(student) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

// Page load पर students load करें
function loadStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => displayStudent(student));
    
    // Agar students hain toh table show karen
    if (students.length > 0) {
        table.style.display = 'table';
        info.innerText = 'Student Information';
    }
}

// Student को table में display करें
function displayStudent(student) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="edit-btn" onclick="editStudent('${student.studentId}')">Edit</button>
        </td>
        <td>
            <button class="delete-btn" onclick="deleteStudent('${student.studentId}')">Delete</button>
        </td>
    `;
    
    tableBody.appendChild(row);
}

// Student delete करें
function deleteStudent(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.studentId !== studentId);
    localStorage.setItem('students', JSON.stringify(students));
    
    // Table refresh करें
    tableBody.innerHTML = '';
    loadStudents();
}

// Student edit करें (basic implementation)
function editStudent(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students.find(s => s.studentId === studentId);
    
    if (student) {
        // Form में values fill करें
        inputName.value = student.name;
        studentId.value = student.studentId;
        emailId.value = student.email;
        contact.value = student.contact;
        
        // Form show करें
        form.style.display = 'block';
        table.style.display = 'none';
        info.innerText = 'Manage student enrollments and academic records.';
        
        // Old entry delete करें
        deleteStudent(studentId);
    }
}






































// Load students from localStorage when page loads
// document.addEventListener('DOMContentLoaded', loadStudents);

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Get form values
//     const studentData = {
//         name: inputName.value,
//         studentId: studentId.value,
//         email: emailId.value,
//         contact: contact.value
//     };
    
//     // Save to localStorage
//     saveStudent(studentData);
    
//     // Add to display
//     displayStudent(studentData);
    
//     // Clear form
//     form.reset();
// });

// function saveStudent(student) {
//     let students = JSON.parse(localStorage.getItem('students')) || [];
//     students.push(student);
//     localStorage.setItem('students', JSON.stringify(students));
// }

// function loadStudents() {
//     let students = JSON.parse(localStorage.getItem('students')) || [];
//     students.forEach(student => displayStudent(student));
// }

// function displayStudent(student) {
//     const studentDiv = document.createElement('div');
//     studentDiv.className = 'student-card';
//     studentDiv.innerHTML = `
//         <div class="student-info">
//             <strong>Name:</strong> ${student.name}<br>
//             <strong>Student ID:</strong> ${student.studentId}<br>
//             <strong>Email:</strong> ${student.email}<br>
//             <strong>Contact:</strong> ${student.contact}
//         </div>
//         <button class="delete-btn" onclick="deleteStudent('${student.studentId}')">Delete</button>
//     `;
//     studentsList.appendChild(studentDiv);
// }

// function deleteStudent(studentId) {
//     let students = JSON.parse(localStorage.getItem('students')) || [];
//     students = students.filter(student => student.studentId !== studentId);
//     localStorage.setItem('students', JSON.stringify(students));
    
//     // Refresh display
//     studentsList.innerHTML = '';
//     loadStudents();
// }