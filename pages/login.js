// Array de usuários (inicialmente vazio)
const usuarios = [
    // Exemplo de usuário cadastrado:
    // { id: 1, username: 'Alice', password: 'admin123' }
  ];
  
  // Função para adicionar um novo usuário com id gerado automaticamente
  function adicionarUsuario(username, senha) {
    // Gerando um id automático para o usuário
    const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;  // Incrementa o id baseado no último usuário cadastrado
  
    // Adiciona o novo usuário ao array
    const novoUsuario = {
      id: novoId,  // O id é gerado automaticamente
      username: username,
      password: senha
    };
  
    usuarios.push(novoUsuario); // Adiciona o usuário ao array de usuários
    console.log(usuarios); // Exibe os usuários no console para verificar
  }
  
  // Exemplo de como adicionar um usuário
  adicionarUsuario('Alice', 'admin123');
  adicionarUsuario('Bob', 'felici23');
  
  // Selecionando elementos da página
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  
  // Função para processar o login
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o recarregamento da página
    
    const username = document.getElementById("username").value; // Corrigido: obtemos o valor do campo username
    const password = document.getElementById("password").value; // Corrigido: obtemos o valor do campo password
  
    // Verifica se o usuário existe no array
    const user = usuarios.find(u => u.username === username && u.password === password); // Corrigido para usar o array 'usuarios'
  
    if (user) {
      // Login bem-sucedido
      errorMsg.textContent = "";  // Limpa a mensagem de erro
      alert("Login registrado");
  
      // Armazena o username no localStorage para persistir a sessão
      localStorage.setItem("username", username);
  
      // Redireciona para a página principal (ou outra página)
      window.location.href = "../index.html"; // Se estiver servindo a partir da raiz 
    } else {
      // Exibe mensagem de erro se o login falhar
      errorMsg.textContent = "Usuário ou senha inválidos.";
    }
  });
  