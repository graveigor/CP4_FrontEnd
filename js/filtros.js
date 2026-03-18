// filtros

let filtrosCategoria = document.querySelectorAll(".filtro-categoria")
let filtrosTipo = document.querySelectorAll(".filtro-tipo")
let filtrosEstrelas = document.querySelectorAll(".filtro-estrelas")

let cards = document.querySelectorAll(".produto-card")

let contador = document.querySelector("#contador-produtos")

function filtrar() {

    let categoriasMarcadas = []
    for (let i = 0; i < filtrosCategoria.length; i++) {
        if (filtrosCategoria[i].checked) {
            categoriasMarcadas.push(filtrosCategoria[i].value)
        }
    }

    let tiposMarcados = []
    for (let i = 0; i < filtrosTipo.length; i++) {
        if (filtrosTipo[i].checked) {
            tiposMarcados.push(filtrosTipo[i].value)
        }
    }

    let estrelasMinima = 0
    for (let i = 0; i < filtrosEstrelas.length; i++) {
        if (filtrosEstrelas[i].checked) {
            estrelasMinima = parseInt(filtrosEstrelas[i].value)
        }
    }

    let quantidadeVisivel = 0

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i]

        let categoriaDoCard = card.getAttribute("data-categoria")
        let tipoDoCard = card.getAttribute("data-tipo")
        let estrelasDoCard = parseInt(card.getAttribute("data-estrelas"))

        let passaCategoria = true
        if (categoriasMarcadas.length > 0) {
            passaCategoria = false
            for (let j = 0; j < categoriasMarcadas.length; j++) {
                if (categoriaDoCard == categoriasMarcadas[j]) {
                    passaCategoria = true
                }
            }
        }

        let passaTipo = true
        if (tiposMarcados.length > 0) {
            passaTipo = false
            let tiposDoCard = tipoDoCard.split(",")
            for (let j = 0; j < tiposMarcados.length; j++) {
                for (let k = 0; k < tiposDoCard.length; k++) {
                    if (tiposDoCard[k] == tiposMarcados[j]) {
                        passaTipo = true
                    }
                }
            }
        }

        let passaEstrelas = true
        if (estrelasMinima > 0) {
            if (estrelasDoCard < estrelasMinima) {
                passaEstrelas = false
            }
        }

        if (passaCategoria && passaTipo && passaEstrelas) {
            card.style.display = ""
            quantidadeVisivel++
        } else {
            card.style.display = "none"
        }
    }

    contador.innerHTML = "<b>" + quantidadeVisivel + "</b> produtos encontrados"
}

for (let i = 0; i < filtrosCategoria.length; i++) {
    filtrosCategoria[i].addEventListener("change", filtrar)
}

for (let i = 0; i < filtrosTipo.length; i++) {
    filtrosTipo[i].addEventListener("change", filtrar)
}

for (let i = 0; i < filtrosEstrelas.length; i++) {
    filtrosEstrelas[i].addEventListener("change", filtrar)
}