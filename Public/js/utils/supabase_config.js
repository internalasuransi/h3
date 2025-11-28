/**
 * File: public/js/utils/supabase_config.js
 * Description: Supabase Client Configuration.
 * IMPORTANT: Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_ANON_KEY' with your actual Supabase project credentials.
 */

// Check if Supabase is loaded
if (typeof supabase === 'undefined') {
    console.error('Supabase SDK not loaded! Make sure to include the CDN in index.html');
}

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export globally
window.supabaseClient = supabaseClient;
