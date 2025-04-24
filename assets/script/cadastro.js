

// Conectando ao form //

const form = document.querySelector("#form")
form.addEventListener("submit", confirmaSenha)

// function pra confirmar a senha //

function confirmaSenha(evento) {
    evento.preventDefault();
    
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const confirmSenha = document.querySelector("#confirmar-senha").value;

    if (senha === confirmSenha) {
        // Armazena no localStorage //
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userSenha", senha);

        alert("Cadastro concluído com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("As senhas não batem");
    }
}
