
const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const btnSubmit = form.querySelector('button[type="submit"]');

  btnSubmit.disabled = true;
  btnSubmit.innerText = 'Entrando...';

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    if (error) throw error;

    window.location.href = '/dashboard';

  } catch (error) {
    alert('Erro ao fazer login: ' + error.message);
    console.error(error);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'Entrar';
  }
});