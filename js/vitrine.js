let container = document.querySelector("#produto-detalhe")

if (container) {

    let params = new URLSearchParams(window.location.search)
    let idProduto = params.get("id")

    fetch("/js/produtos.json")
        .then(function(resposta) {
            return resposta.json()
        })
        .then(function(produtos) {

            let produto = null
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].id == idProduto) {
                    produto = produtos[i]
                }
            }

            if (!produto) {
                container.innerHTML = `
                    <div class="container my-5 text-center">
                        <h3>Produto não encontrado</h3>
                        <p class="text-muted">Volte para o <a href="/pages/categorias.html">catálogo</a>.</p>
                    </div>
                `
                return
            }

            let nomesCategorias = {
                "vegano": "Beleza Natural",
                "suplemento": "Suplementos",
                "limpeza": "Casa & Limpeza",
                "roupa": "Roupas & Acessórios"
            }

            let categoriaBonita = nomesCategorias[produto.categoria] || produto.categoria

            let imgSrc = produto.img
            if (!imgSrc.startsWith("/") && !imgSrc.startsWith("..")) {
                imgSrc = "/" + imgSrc
            }

            let detalheHTML = `
                <!-- BREADCRUMB -->
                <section class="container mt-4 mb-4">
                    <div class="d-flex flex-wrap align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                         style="background: #f8f5ef; width: fit-content;">
                        <a href="/index.html" class="text-decoration-none fw-semibold" style="color: #5c7c5a;">
                            <i class="fas fa-house me-1"></i>Home
                        </a>
                        <span style="color: #b0b0b0;">/</span>
                        <a href="/pages/categorias.html" class="text-decoration-none fw-semibold" style="color: #5c7c5a;">
                            ${categoriaBonita}
                        </a>
                        <span style="color: #b0b0b0;">/</span>
                        <span class="fw-semibold" style="color: #2f4f2f;">
                            ${produto.nome}
                        </span>
                    </div>
                </section>

                <!-- DETALHE DO PRODUTO -->
                <section style="padding: 3rem 0;">
                    <div class="container">
                        <div class="row g-5">

                            <!-- IMAGEM -->
                            <div class="col-lg-6">
                                <div class="bg-white rounded-4 shadow-sm overflow-hidden mb-3">
                                    <img id="mainImg"
                                         src="${imgSrc}"
                                         alt="${produto.nome}"
                                         class="img-fluid w-100"
                                         style="height: 460px; object-fit: cover;">
                                </div>
                            </div>

                            <!-- INFO -->
                            <div class="col-lg-6">
                                <span class="badge bg-success mb-2">${categoriaBonita}</span>
                                <h1 style="font-size:2rem; color:#2d6a4f; margin-bottom:0.5rem;">
                                    ${produto.nome}
                                </h1>

                                <div class="d-flex align-items-center gap-3 mb-1">
                                    <div style="color: #f5a623;">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span style="font-size:0.88rem; color:#888;">4.5 (87 avaliações)</span>
                                    <span style="color:#52b788; font-size:0.85rem; font-weight:600;">
                                        <i class="fas fa-check-circle me-1"></i>Em estoque
                                    </span>
                                </div>

                                <div style="margin:1.2rem 0;">
                                    <span style="font-size:2.2rem; font-weight:700; color:#2d6a4f;">${produto.preco}</span>
                                </div>

                                <p style="color:#666; font-size:0.95rem; line-height:1.75; margin-bottom:1.5rem;">
                                    ${produto.desc}. Produto 100% vegano, cruelty-free e fabricado com ingredientes sustentáveis.
                                    Embalagens biodegradáveis.
                                </p>

                                <div class="d-flex gap-2 flex-wrap mb-3">
                                    <span style="background:rgba(82,183,136,0.12); color:#52b788; font-size:0.78rem; font-weight:600; padding:4px 12px; border-radius:20px;">
                                        <i class="fas fa-leaf me-1"></i>Vegano
                                    </span>
                                    <span style="background:rgba(82,183,136,0.12); color:#52b788; font-size:0.78rem; font-weight:600; padding:4px 12px; border-radius:20px;">
                                        <i class="fas fa-paw me-1"></i>Cruelty-Free
                                    </span>
                                    <span style="background:rgba(82,183,136,0.12); color:#52b788; font-size:0.78rem; font-weight:600; padding:4px 12px; border-radius:20px;">
                                        <i class="fas fa-recycle me-1"></i>Sustentável
                                    </span>
                                </div>

                                <hr style="border-color:#e0e0e0; margin:1.5rem 0;" />

                                <div class="d-flex align-items-center gap-3 mb-3">
                                    <span style="font-weight:600; font-size:0.9rem; color:#2d6a4f;">Quantidade:</span>
                                    <div style="display:flex; align-items:center; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
                                        <button onclick="changeQty(-1)" style="border:none; background:#f8f8f8; width:36px; height:36px; font-size:1.1rem; cursor:pointer;">−</button>
                                        <input type="number" id="qty" value="1" min="1" max="10" readonly
                                               style="width:40px; text-align:center; border:none; font-weight:600;" />
                                        <button onclick="changeQty(1)" style="border:none; background:#f8f8f8; width:36px; height:36px; font-size:1.1rem; cursor:pointer;">+</button>
                                    </div>
                                </div>

                                <div class="d-grid gap-2">
                                    <button class="btn btn-success btn-adicionar"
                                            style="font-size:1.05rem; padding:0.85rem;"
                                            data-id="${produto.id}"
                                            data-nome="${produto.nome}"
                                            data-preco="${produto.preco}">
                                        <i class="fas fa-cart-plus me-2"></i>Adicionar ao Carrinho
                                    </button>
                                </div>

                                <div style="margin-top:1.2rem; display:flex; gap:1rem; flex-wrap:wrap;">
                                    <div style="display:flex; align-items:center; gap:6px; font-size:0.83rem; color:#888;">
                                        <i class="fas fa-truck" style="color:#52b788;"></i>
                                        Frete grátis acima de R$150
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; font-size:0.83rem; color:#888;">
                                        <i class="fas fa-undo" style="color:#52b788;"></i>
                                        Troca em até 30 dias
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; font-size:0.83rem; color:#888;">
                                        <i class="fas fa-shield-halved" style="color:#52b788;"></i>
                                        Pagamento seguro
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TABS -->
                        <div style="margin-top:3.5rem;">
                            <ul class="nav nav-tabs" style="border-bottom:2px solid #e0e0e0;">
                                <li class="nav-item">
                                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#descTab"
                                            style="font-weight:600; color:#666;">Descrição</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#detailsTab"
                                            style="font-weight:600; color:#666;">Informações</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reviewsTab"
                                            style="font-weight:600; color:#666;">Avaliações</button>
                                </li>
                            </ul>

                            <div class="tab-content" style="background:#fff; border-radius:0 0 16px 16px; padding:2rem; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                                <div class="tab-pane fade show active" id="descTab">
                                    <h4 style="color:#2d6a4f; margin-bottom:1rem;">Descrição do Produto</h4>
                                    <p style="color:#666; line-height:1.8;">
                                        ${produto.nome} — ${produto.desc}. Produzido com ingredientes de alta qualidade,
                                        seguindo padrões rigorosos de sustentabilidade. Ideal para quem busca um estilo de vida
                                        mais consciente e responsável com o planeta.
                                    </p>
                                </div>
                                <div class="tab-pane fade" id="detailsTab">
                                    <h4 style="color:#2d6a4f; margin-bottom:1rem;">Informações Técnicas</h4>
                                    <ul style="color:#666; line-height:1.9; padding-left:1rem;">
                                        <li>Produto 100% vegano</li>
                                        <li>Não testado em animais</li>
                                        <li>Embalagens biodegradáveis</li>
                                        <li>Ingredientes sustentáveis</li>
                                        <li>Categoria: ${categoriaBonita}</li>
                                    </ul>
                                </div>
                                <div class="tab-pane fade" id="reviewsTab">
                                    <h4 style="color:#2d6a4f; margin-bottom:1rem;">Avaliações dos Clientes</h4>
                                    <p style="color:#666; margin-bottom:0.8rem;">
                                        <strong>Mariana S.</strong> — "Amei o produto! Qualidade excelente e a proposta sustentável é um diferencial enorme."
                                    </p>
                                    <p style="color:#666; margin-bottom:0;">
                                        <strong>Lucas R.</strong> — "Recomendo muito. Produto de qualidade e entrega rápida."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- PRODUTOS RELACIONADOS -->
                        <div style="margin-top:4rem;" id="relacionados-container"></div>

                    </div>
                </section>
            `
            container.innerHTML = detalheHTML

            let relacionados = []
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].categoria == produto.categoria && produtos[i].id != produto.id) {
                    relacionados.push(produtos[i])
                }
            }

            let relContainer = document.querySelector("#relacionados-container")

            if (relacionados.length > 0 && relContainer) {

                let relHTML = `
                    <div class="text-center mb-4">
                        <h4 style="color:#2d6a4f;">Produtos Relacionados</h4>
                        <p class="text-muted small">Outros itens da mesma categoria</p>
                    </div>
                    <div class="row g-4">
                `

                relacionados.forEach(function(rel) {
                    let relImg = rel.img
                    if (!relImg.startsWith("/") && !relImg.startsWith("..")) {
                        relImg = "/" + relImg
                    }

                    relHTML += `
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="card h-100 border-0 shadow-sm">
                                <img src="${relImg}" class="card-img-top" alt="${rel.nome}">
                                <div class="card-body">
                                    <h6 class="card-title">${rel.nome}</h6>
                                    <p class="text-muted small">${rel.desc}</p>
                                    <p class="fw-bold mb-3">${rel.preco}</p>
                                    <a href="/pages/produtos.html?id=${rel.id}" class="btn btn-success btn-sm w-100">Ver Produto</a>
                                </div>
                            </div>
                        </div>
                    `
                })

                relHTML += `</div>`
                relContainer.innerHTML = relHTML
            }

        })
}

function changeQty(delta) {
    let input = document.querySelector("#qty")
    if (input) {
        let valor = parseInt(input.value) + delta
        if (valor < 1) valor = 1
        if (valor > 10) valor = 10
        input.value = valor
    }
}