// login //-

const form = document.querySelector("#form");
form.addEventListener("submit", login);

function login(evento){
    evento.preventDefault();

    const inputMail = document.querySelector("#email").value;
    const inputSenha = document.querySelector("#senha").value;
    const inputFile = document.querySelector("#logo-upload");

    const savedEmail = localStorage.getItem("userEmail");
    const savedSenha = localStorage.getItem("userSenha");

    if(inputMail === savedEmail && inputSenha === savedSenha) {
        window.location.href = "home.html";

    } else {
        alert("Email ou senha incorretos!");
    }

}

const logoInput = document.querySelector("#logo-upload");
const logoImage = document.querySelector("#logo-img"); // Seleciona a logo que será alterada no login

logoInput.addEventListener("change", function () {
    const file = logoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Atualiza a logo no login
            logoImage.src = e.target.result;

            // Redimensiona a imagem para 40px x 40px
            logoImage.style.width = "40px";
            logoImage.style.height = "40px";
            
            // Salva a imagem no localStorage para que ela seja usada no home
            localStorage.setItem("logoUrl", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});