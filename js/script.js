const pedirProdutos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fetch("/js/produtos.json"))
        }, 200)
    })
}

let produtos = []
const renderProdutos = (produtos) => {
    let produtosVeganos = document.getElementById("produtos-veganos")
    let produtosSuplementos = document.getElementById("produtos-suplementos")
    let produtosLimpeza = document.getElementById("produtos-limpeza")
    let produtosRoupas = document.getElementById("produtos-roupas")
        produtos.forEach((produto, index) => {
        let col = document.createElement("div")
        col.setAttribute("class", "col-6 col-md-4 col-lg-3")

        let card = document.createElement("div")
        card.setAttribute("class", "card h-100 border-0 shadow-sm")

        let img = document.createElement("img")
        img.src = produto.img
        img.className = "card-img-top"

        let cardBody = document.createElement("div")
        cardBody.className = "card-body"

        let cardTitle = document.createElement("h6")
        cardTitle.className = "card-title"
        cardTitle.textContent = produto.nome

        let cardPreco = document.createElement("p")
        cardPreco.className = "fw-bold mb-3"
        cardPreco.textContent = produto.preco

        let cardDesc = document.createElement("p")
        cardDesc.className = "text-muted small"
        cardDesc.textContent = produto.desc

        let adicionarCarrinho = document.createElement("button")
        adicionarCarrinho.className = "btn btn-success btn-sm w-100 btn-adicionar"
        adicionarCarrinho.textContent = "Adicionar"
        adicionarCarrinho.setAttribute("data-id", produto.id || index)
        adicionarCarrinho.setAttribute("data-nome", produto.nome)
        adicionarCarrinho.setAttribute("data-preco", produto.preco)

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardDesc)
        cardBody.appendChild(cardPreco)
        cardBody.appendChild(adicionarCarrinho)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)


        if (produto.categoria == "vegano") {
            produtosVeganos.appendChild(col)
        }else if(produto.categoria == "suplemento"){
            produtosSuplementos.appendChild(col)
        }else if(produto.categoria == "limpeza"){
            produtosLimpeza.appendChild(col)
        }else if(produto.categoria == "roupa"){
            produtosRoupas.appendChild(col)
        }
    });
}


pedirProdutos()
    .then((res) => {
        return res.json();
    })
    .then((dadosConvertidos) => {
        produtos = dadosConvertidos;
        renderProdutos(produtos)
    })

// Carrinho

let carrinho = []
 
let sidebar = document.querySelector("#carrinho-sidebar")
let overlay = document.querySelector("#carrinho-overlay")
let lista = document.querySelector("#carrinho-lista")
let totalEl = document.querySelector("#carrinho-total")
let qtdEl = document.querySelector("#carrinho-qtd")
 
document.querySelector("#btn-abrir-carrinho").addEventListener("click", (e) => {
    e.preventDefault()
    sidebar.classList.add("aberto")
    overlay.classList.add("aberto")
})
 
document.querySelector("#btn-fechar-carrinho").addEventListener("click", () => {
    sidebar.classList.remove("aberto")
    overlay.classList.remove("aberto")
})
 
overlay.addEventListener("click", () => {
    sidebar.classList.remove("aberto")
    overlay.classList.remove("aberto")
})

const atualizarCarrinho = () => {
    lista.innerHTML = ""
 
    if (carrinho.length === 0) {
        lista.innerHTML = '<li class="carrinho-vazio">Seu carrinho está vazio</li>'
    } else {
        carrinho.forEach(item => {
            lista.innerHTML +=
                '<li class="carrinho-item">' +
                    '<div class="carrinho-item-info">' +
                        '<strong>' + item.nome + '</strong>' +
                        '<span class="carrinho-item-preco">R$ ' + (item.preco * item.qtd).toFixed(2).replace(".", ",") + '</span>' +
                    '</div>' +
                    '<div class="carrinho-item-controles">' +
                        '<button class="btn-qtd btn-diminuir" data-id="' + item.id + '">−</button>' +
                        '<span class="carrinho-item-qtd">' + item.qtd + '</span>' +
                        '<button class="btn-qtd btn-aumentar" data-id="' + item.id + '">+</button>' +
                        '<button class="btn-remover" data-id="' + item.id + '">✕</button>' +
                    '</div>' +
                '</li>'
        })
    }
 
    let soma = 0
    let qtdTotal = 0
    for (let i = 0; i < carrinho.length; i++) {
        soma += carrinho[i].preco * carrinho[i].qtd
        qtdTotal += carrinho[i].qtd
    }
    totalEl.textContent = "R$ " + soma.toFixed(2).replace(".", ",")
    qtdEl.textContent = qtdTotal
}
 
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-adicionar")) {
        let btn = e.target.closest(".btn-adicionar")
        let id = btn.getAttribute("data-id")
        let nome = btn.getAttribute("data-nome")
        let precoTexto = btn.getAttribute("data-preco")
        let preco = parseFloat(precoTexto.replace("R$", "").replace(",", ".").trim())
 
        let encontrado = null
        for (let i = 0; i < carrinho.length; i++) {
            if (carrinho[i].id == id) {
                encontrado = carrinho[i]
            }
        }
 
        if (encontrado) {
            encontrado.qtd++
        } else {
            carrinho.push({ id: id, nome: nome, preco: preco, qtd: 1 })
        }
 
        atualizarCarrinho()
        sidebar.classList.add("aberto")
        overlay.classList.add("aberto")
    }
})
 
lista.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id")
 
    if (e.target.classList.contains("btn-remover")) {
        let novo = []
        for (let i = 0; i < carrinho.length; i++) {
            if (carrinho[i].id != id) novo.push(carrinho[i])
        }
        carrinho = novo
        atualizarCarrinho()
    }
 
    if (e.target.classList.contains("btn-aumentar")) {
        for (let i = 0; i < carrinho.length; i++) {
            if (carrinho[i].id == id) carrinho[i].qtd++
        }
        atualizarCarrinho()
    }
 
    if (e.target.classList.contains("btn-diminuir")) {
        for (let i = 0; i < carrinho.length; i++) {
            if (carrinho[i].id == id) carrinho[i].qtd--
        }
        let novo = []
        for (let i = 0; i < carrinho.length; i++) {
            if (carrinho[i].qtd > 0) novo.push(carrinho[i])
        }
        carrinho = novo
        atualizarCarrinho()
    }
})
 
atualizarCarrinho()
