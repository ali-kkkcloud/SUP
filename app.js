// =========================================================
// Supabase Client Initialization
// =========================================================
const SUPABASE_URL = 'https://sizbhnyyyvbkuarulcmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpemJobnl5eXZia3VhcnVsY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjcxMzQsImV4cCI6MjA3MDQwMzEzNH0.T67uwBYJp6AbaDB1CwbXh18GjvW9KwPBuyoOhniMaF0';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =========================================================
// UI Element References
// =========================================================
const authSection = document.getElementById('auth');
const userInfoSection = document.getElementById('user-info');
const employeeSection = document.getElementById('employee-section');
const userEmailSpan = document.getElementById('user-email');
const employeeList = document.getElementById('employee-list');

// =========================================================
// User Authentication Functions (Login, Signup, Logout)
// =========================================================

// Handle user signup
document.getElementById('signupBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
        alert(error.message);
    } else {
        alert('User created! Please check your email for a confirmation link.');
    }
});

// Handle user login
document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert(error.message);
    } else {
        // UI will be updated by the onAuthStateChange listener
    }
});

// Handle user logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert(error.message);
    }
    // UI will be updated by the onAuthStateChange listener
});

// =========================================================
// Employee Management Functions
// =========================================================

// Fetch and display all employees from the database
async function fetchEmployees() {
    const { data, error } = await supabase
        .from('employees')
        .select('*');
    
    if (error) {
        alert(error.message);
        return;
    }

    employeeList.innerHTML = ''; // Clear the list before adding new items
    data.forEach(employee => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${employee.name} - ${employee.email} (${employee.position})
            <button onclick="deleteEmployee('${employee.id}')">Delete</button>
        `;
        employeeList.appendChild(li);
    });
}

// Add a new employee
document.getElementById('addEmployeeBtn').addEventListener('click', async () => {
    const name = document.getElementById('employee-name').value;
    const email = document.getElementById('employee-email').value;
    const position = document.getElementById('employee-position').value;

    const { data, error } = await supabase
        .from('employees')
        .insert([{ name, email, position }]);

    if (error) {
        alert(error.message);
    } else {
        // Clear input fields and refresh the employee list
        document.getElementById('employee-name').value = '';
        document.getElementById('employee-email').value = '';
        document.getElementById('employee-position').value = '';
        fetchEmployees();
    }
});

// Delete an employee by their ID
async function deleteEmployee(id) {
    const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

    if (error) {
        alert(error.message);
    } else {
        fetchEmployees(); // Refresh the list
    }
}

// =========================================================
// UI State Management
// =========================================================

// Listen for authentication state changes (login, logout)
supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        // User is logged in
        authSection.style.display = 'none';
        userInfoSection.style.display = 'block';
        employeeSection.style.display = 'block';
        userEmailSpan.textContent = session.user.email;
        fetchEmployees();
    } else {
        // User is logged out
        authSection.style.display = 'block';
        userInfoSection.style.display = 'none';
        employeeSection.style.display = 'none';
        userEmailSpan.textContent = '';
        employeeList.innerHTML = ''; // Clear the employee list
    }
});
