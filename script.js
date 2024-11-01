document.addEventListener("DOMContentLoaded", function() {
    const botaoFecharPedido = document.querySelector(".btt-bar-button");
    const botaoCancelar = document.querySelector(".cancel");
    botaoFecharPedido.addEventListener("click", function() {
        const modal = document.querySelector(".modal");
        modal.classList.remove("hidden");
    });

    botaoCancelar.addEventListener("click", function() {
        const modal = document.querySelector(".modal");
        modal.classList.add("hidden");
        const resumoPedido = document.querySelector(".resumoPedido");
        const tagsP = resumoPedido.querySelectorAll('p');
        tagsP.forEach(tag => tag.remove());
    });
});


function selecionar(item) {
    const select = document.querySelector("." + item);
    const parent = select.parentNode;
    const selectAnt = parent.querySelector(".selecionado");

    if (selectAnt) {
        selectAnt.classList.remove("selecionado");
    }

    select.classList.add("selecionado");

    const selectAll = document.querySelectorAll(".selecionado");

    if(selectAll.length === 3){
        document.querySelector(".btt-bar-button").innerText = "Fechar Pedido";
        document.querySelector(".btt-bar-button").classList.add("selecionado-footer");
    }

    console.log(selectAll);

}

function fecharPedido(){
    const resumoPedido = document.querySelector(".resumoPedido");
    const prato = document.querySelectorAll(".pratos .selecionado h1.nome-prato, .pratos .selecionado p.preco-prato");
    const bebida = document.querySelectorAll(".bebidas .selecionado h1.nome-prato, .bebidas .selecionado p.preco-prato");
    const sobremesa = document.querySelectorAll(".sobremesas .selecionado h1.nome-prato, .sobremesas .selecionado p.preco-prato");

    const pedido = {
        prato: criarElementoPedido(prato),
        bebida: criarElementoPedido(bebida),
        sobremesa: criarElementoPedido(sobremesa)
    };

    resumoPedido.append(pedido.prato);
    resumoPedido.append(pedido.bebida);
    resumoPedido.append(pedido.sobremesa);

    if (resumoPedido.querySelectorAll('p').length === 3) {
        const precoPrato = parseFloat(prato[1]?.innerText.replace('R$', '').replace(',', '.') || 0);
        const precoBebida = parseFloat(bebida[1]?.innerText.replace('R$', '').replace(',', '.') || 0);
        const precoSobremesa = parseFloat(sobremesa[1]?.innerText.replace('R$', '').replace(',', '.') || 0);
    
        const totalValor = precoPrato + precoBebida + precoSobremesa;
    
        const total = document.createElement("p");
        total.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
        total.style.fontWeight = "bold";
        resumoPedido.appendChild(total);
    }
}

function criarElementoPedido(prato) {
    const elemento = document.createElement("p");
    elemento.textContent = `${prato[0].innerText}: R$ ${prato[1].innerText}`;
    return elemento;
}


function pedidoWhatsapp() {

    const prato = document.querySelectorAll(".pratos .selecionado h1.nome-prato, .pratos .selecionado p.preco-prato");
    const bebida = document.querySelectorAll(".bebidas .selecionado h1.nome-prato, .bebidas .selecionado p.preco-prato");
    const sobremesa = document.querySelectorAll(".sobremesas .selecionado h1.nome-prato, .sobremesas .selecionado p.preco-prato");

    const nomePrato = prato[0]?.innerText || "Não selecionado";
    const precoPrato = parseFloat(prato[1]?.innerText.replace('R$', '').replace(',', '.') || 0);

    const nomeBebida = bebida[0]?.innerText || "Não selecionado";
    const precoBebida = parseFloat(bebida[1]?.innerText.replace('R$', '').replace(',', '.') || 0);

    const nomeSobremesa = sobremesa[0]?.innerText || "Não selecionado";
    const precoSobremesa = parseFloat(sobremesa[1]?.innerText.replace('R$', '').replace(',', '.') || 0);

    const total = (precoPrato + precoBebida + precoSobremesa).toFixed(2);

    const mensagem = `Olá, gostaria de fazer o pedido:\n- Prato: ${nomePrato}\n- Bebida: ${nomeBebida}\n- Sobremesa: ${nomeSobremesa}\nTotal: R$ ${total}`;

    const mensagemCodificada = encodeURIComponent(mensagem);

    const numero = "47989190109";
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagemCodificada}`;

    document.getElementById("whatsappLink").href = linkWhatsApp;
}
