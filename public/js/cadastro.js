const SUPABASE_URL = 'https://ogpylujeroumxxhnpzwo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xN98jCv8nuTgBJoJN5wZXQ_3kb1F_MM';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.querySelector('.auth-card');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const instituicao = document.getElementById('faculdade').value.trim();
  const senha = document.getElementById('senha').value;

  const btnSubmit = form.querySelector('button[type="submit"]');
  btnSubmit.disabled = true;
  btnSubmit.innerText = 'A criar conta...';

  try {
    // Salvamos como full_name para alinhar com o chat.js e perfil.js
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: { 
          full_name: nome, 
          instituicao: instituicao 
        }
      }
    });

    if (authError) throw authError;

    const { error: dbError } = await supabase
      .from('alunos')
      .insert([
        {
          id: authData.user?.id,
          email: email,
          nome: nome,
          instituicao: instituicao
        }
      ]);

    if (dbError) throw dbError;

    alert('Cadastro realizado com sucesso!');
    form.reset();
    
    // Redireciona para o dashboard ou login opcionalmente
    window.location.href = '/dashboard';

  } catch (error) {
    alert('Erro ao cadastrar: ' + error.message);
    console.error(error);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'Criar Conta';
  }
});

const nome = document.getElementById('nome').value.trim(); // Garante que pega o valor do input com id="nome"