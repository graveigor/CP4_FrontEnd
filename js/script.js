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
    produtos.forEach(produto => {
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

        let adicionarCarrinho = document.createElement("a")
        adicionarCarrinho.className = "btn btn-success btn-sm w-100"
        adicionarCarrinho.href = "/pages/produtos.html"
        adicionarCarrinho.textContent = "Adicionar"


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
