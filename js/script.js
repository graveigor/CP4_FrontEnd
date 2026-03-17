BD = [
    { id: 1, nome: "Creme Hidratante Natural", img: "assets/img/hidratante.jpg", desc: "Karité e aloe vera · 200ml", preco: "R$ 34,90" },
    { id: 2, nome: "CREMINHO", img: "assets/img/hidratante.jpg", desc: "Karité e aloe vera · 200ml", preco: "R$ 34,90" }
]

const pedirProdutos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(BD)
        }, 500)
    })
}

let produtos = []
const renderProdutos = (arr) => {
    let produtosVeganos = document.getElementById("produtos-veganos")
    arr.forEach(produto => {
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
        produtosVeganos.appendChild(col)
    });
}


pedirProdutos()
    .then((res) => {
        produtos = res
        renderProdutos(produtos)
    })
