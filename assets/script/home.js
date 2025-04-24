// Botão de logout //
const btnLogout = document.querySelector("#btn-logout")
btnLogout.addEventListener("click", logout)

function logout(){
    window.location.href = "index.html"
}



// CONECTAR AO FORM //
const formItens = document.querySelector("#form");

// FUNÇÃO PRA FAZER O MENU APARECER //
const imgDevice = document.querySelector(".box-device-btn");
imgDevice.addEventListener("click", mostrarForm);

function mostrarForm(){
    if (formItens.style.display === "none" || formItens.style.display === "") {
        formItens.style.display = "flex";
    } else {
        formItens.style.display = "none";
    }
}

// FORM EVENTOS //

formItens.addEventListener("submit", criadorItem);

function criadorItem(evento) {
    evento.preventDefault();

    const inputNome = document.querySelector("#nome").value;
    const inputDesc = document.querySelector("#detalhes").value;
    const inputImagem = document.querySelector("#imagem").files[0];

    if (inputNome.length > 20 || inputNome.length < 4) {
        alert("O nome não pode ter mais de 10 caracteres ou menos que 4");
        return;
    }

    if (inputDesc.length > 70 || inputDesc.length < 5 ) {
        alert("A descrição não pode ter mais de 70 caracteres ou menos que 5");
        return;
    }

    salvarNoLocalStorage(inputNome, inputDesc, inputImagem);
}

// PREVIEW DA IMAGEM
function mostrarImagem(event) {
    const imagemInput = event.target;
    const preview = document.getElementById('imagem-preview');

    if (imagemInput.files && imagemInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(imagemInput.files[0]);
    }
}

// SALVAR ITEM NO LOCAL STORAGE
function salvarNoLocalStorage(nome, descricao, imagem) {
    let itensSalvos = JSON.parse(localStorage.getItem("itens")) || [];

    if (imagem) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const novoItem = {
                nome,
                descricao,
                imagem: e.target.result
            };
            itensSalvos.push(novoItem);
            localStorage.setItem("itens", JSON.stringify(itensSalvos));
            itemCriado(novoItem.nome, novoItem.descricao, novoItem.imagem);
        };
        reader.readAsDataURL(imagem);
    } else {
        const novoItem = { nome, descricao, imagem: null };
        itensSalvos.push(novoItem);
        localStorage.setItem("itens", JSON.stringify(itensSalvos));
        itemCriado(novoItem.nome, novoItem.descricao, novoItem.imagem);
    }
}

// MOSTRAR ITENS SALVOS
window.addEventListener("load", function () {
    const itensSalvos = JSON.parse(localStorage.getItem("itens")) || [];
    itensSalvos.forEach(item => itemCriado(item.nome, item.descricao, item.imagem));
});

// CRIAR ITEM NA TELA
function itemCriado(nome, descricao, imagem) {
    const containerItem = document.querySelector("#container-itens-novos");

    const div = document.createElement("div");
    div.classList.add("novos-itens");

    const h4 = document.createElement("h4");
    h4.innerText = `Nome: ${nome}`;

    const p = document.createElement("p");
    p.innerText = `Descrição: ${descricao}`;

    if (imagem) {
        const img = document.createElement("img");
        img.src = imagem;
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.borderRadius = "5px";
        div.appendChild(img);
    }

    div.appendChild(h4);
    div.appendChild(p);
    
    const btn = buttonApagar(nome);
    div.appendChild(btn);

    containerItem.appendChild(div);

    apagarMenu();
    resetMenu();
    resetImagem();
}

// BOTÃO APAGAR ITEM
function buttonApagar(nomeParaExcluir) {
    const btn = document.createElement("button");
    btn.innerText = "Apagar";
    btn.className = "button-apagar";

    btn.addEventListener("click", function (evento) {
        evento.preventDefault();
        const itemDiv = btn.parentElement;
        itemDiv.remove();

        let itensSalvos = JSON.parse(localStorage.getItem("itens")) || [];
        itensSalvos = itensSalvos.filter(item => item.nome !== nomeParaExcluir);
        localStorage.setItem("itens", JSON.stringify(itensSalvos));
    });

    return btn;
}

// LIMPAR FORM
function apagarMenu() {
    document.querySelector("#form").style.display = "none";
}


// RESETAR OS INPUTS DO FORM 
function resetMenu() {
    document.querySelector("#nome").value = "";
    document.querySelector("#detalhes").value = "";
    document.querySelector("#imagem").value = "";
}

// RESETAR A IMAGEM AO USAR O FORM
function resetImagem() {
    const preview = document.getElementById("imagem-preview");
    preview.style.display = "none";
    preview.src = "";
}

const logoImage = document.querySelector("#logo-img");

if (localStorage.getItem('logoUrl')) {
    logoImage.src = localStorage.getItem('logoUrl'); // Carregar logo salva do localStorage
}

