const SUPABASE_URL = 'https://sizbhnyyyvbkuarulcmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpemJobnl5eXZia3VhcnVsY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjcxMzQsImV4cCI6MjA3MDQwMzEzNH0.T67uwBYJp6AbaDB1CwbXh18GjvW9KwPBuyoOhniMaF0';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
document.getElementById('signupBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert('User created! Check your email for confirmation.');
});

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else {
    // Handle successful login, hide auth section and show employee section
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  // Handle logout, hide employee section and show auth section
});
async function fetchEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('*');
  // Render the employees to the list
}

document.getElementById('addEmployeeBtn').addEventListener('click', async () => {
  const name = document.getElementById('employee-name').value;
  const email = document.getElementById('employee-email').value;
  const position = document.getElementById('employee-position').value;
  const { data, error } = await supabase
    .from('employees')
    .insert([{ name, email, position }]);
  if (error) alert(error.message);
  else fetchEmployees(); // Refresh the list
});

async function deleteEmployee(id) {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);
  if (error) alert(error.message);
  else fetchEmployees(); // Refresh the list
}

// Call fetchEmployees on page load if the user is logged in
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    // Show employee section and hide auth
    fetchEmployees();
  } else {
    // Hide employee section and show auth
  }
});
