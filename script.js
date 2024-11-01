// Função para mostrar mensagens de erro personalizadas
function mostrarErro(mensagem) {
  const erroDiv = document.createElement("div");
  erroDiv.classList.add("erro-mensagem");
  erroDiv.innerText = mensagem;
  document.body.appendChild(erroDiv);
  setTimeout(() => erroDiv.remove(), 3000); // Remove após 3 segundos
}

// Função para validar os campos do formulário de cadastro
function validarCadastro(nome, email, senha) {
  if (!nome || !email || !senha) {
    mostrarErro("Por favor, preencha todos os campos!");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarErro("Email inválido!");
    return false;
  }

  return true;
}

// Função para cadastrar o usuário
function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!validarCadastro(nome, email, senha)) return;

  const usuario = { nome, email, senha };
  localStorage.setItem("usuario", JSON.stringify(usuario));

  window.location.href = "login.html";
}

// Função para login do usuário
function loginUsuario() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  console.log(senha);

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  if (
    usuarioSalvo &&
    usuarioSalvo.email === email &&
    usuarioSalvo.senha === senha
  ) {
    window.location.href = "perfilAluno.html";
  } else {
    alert("Email ou senha inválidos!");
  }
}

// Função para salvar as informações atualizadas do perfil
function salvarPerfil() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const telefone = document.getElementById("telefone").value;
    const serie = document.getElementById("serie").value;

    let isValid = true;

    // Validação do telefone (exemplo: deve ter 10 ou 11 dígitos)
    const telefoneRegex = /^\d{10,11}$/;
    const telefoneError = document.getElementById("telefoneError");
    telefoneError.textContent = ""; 

    if (!telefoneRegex.test(telefone)) {
        telefoneError.textContent = "O telefone deve ter 10 ou 11 dígitos.";
        isValid = false; // Marca como inválido
    }

    // Validação dos outros campos
    if (nome.trim() === "") {
        isValid = false;
        alert("O campo nome é obrigatório.");
    }

    if (email.trim() === "") {
        isValid = false;
        alert("O campo email é obrigatório.");
    }

    if (dataNascimento.trim() === "") {
        isValid = false;
        alert("O campo data de nascimento é obrigatório.");
    }

    if (serie === "") {
        isValid = false;
        alert("Você deve selecionar uma série escolar.");
    }

    if (isValid) {
        alert("Formulário enviado com sucesso!");
        return true; 
    } else {
        return false; 
    }
}

// Associa as funções aos formulários
document.addEventListener("DOMContentLoaded", function () {
  const cadastroForm = document.querySelector(".register-form");
  const loginForm = document.querySelector(".login-form");
  const perfilForm = document.querySelector(".profile-form");
  const pageName = document.body.getAttribute("data-page");

  const primaryColor = "#004A61";
  const secondaryColor = "#FFBB00";

  if (pageName === "login") {
    // Aplica a cor de fundo na seção do formulário
    document.querySelectorAll(".form-section").forEach((el) => {
      el.style.backgroundColor = secondaryColor; // Altera a cor de fundo
    });

    // Altera apenas a cor do texto dentro da tag <strong> no título
    document.querySelectorAll(".form-title strong").forEach((el) => {
      el.style.color = primaryColor; // Aplica a cor primária ao texto dentro de <strong>
    });

    // Mantém a cor do título
    document.querySelectorAll(".form-title").forEach((el) => {
      el.style.color = ""; // Certifica-se de que a cor padrão permanece
    });

    // Altera a cor do botão
    document.querySelectorAll(".form-button").forEach((el) => {
      el.style.backgroundColor = primaryColor;
    });

    // Altera a cor do link de registro
    document.querySelectorAll(".register-link a").forEach((el) => {
      el.style.color = primaryColor;
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      cadastrarUsuario();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      loginUsuario();
    });
  }

  if (perfilForm) {
    perfilForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (salvarPerfil()) {
            // Se a validação for bem-sucedida, você pode prosseguir com o envio dos dados
            perfilForm.submit(); // Aqui você pode enviar o formulário ou fazer o que precisar
        }
    });
}
});
