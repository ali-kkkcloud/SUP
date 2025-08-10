
// config.js
const CONFIG = {
    SUPABASE_URL: 'https://sizbhnyyyvbkuarulcmz.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpemJobnl5eXZia3VhcnVsY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjcxMzQsImV4cCI6MjA3MDQwMzEzNH0.T67uwBYJp6AbaDB1CwbXh18GjvW9KwPBuyoOhniMaF0',
    APP_NAME: 'Employee Portal'
};

// Supabase client load करें
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
document.head.appendChild(script);

script.onload = function() {
    window.supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    console.log('✅ Database connected!');
};
