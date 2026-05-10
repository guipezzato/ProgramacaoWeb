const produtos = [
    {
        nome: "Notebook",
        preco: 3500,
        categoria: "Eletrônicos"
    },
    {
        nome: "Mouse",
        preco: 80,
        categoria: "Eletrônicos"
    },
    {
        nome: "Cadeira",
        preco: 500,
        categoria: "Móveis"
    },
    {
        nome: "Mesa",
        preco: 900,
        categoria: "Móveis"
    },
    {
        nome: "Celular",
        preco: 2500,
        categoria: "Eletrônicos"
    }
];

const container = document.getElementById("container");

function criarCards(lista) {

    container.innerHTML = "";

    lista.forEach(produto => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h2>${produto.nome}</h2>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            <p>Categoria: ${produto.categoria}</p>
        `;

        container.appendChild(card);
    });
}

function filtrarEletronicos() {

    const eletronicos = produtos.filter(produto =>
        produto.categoria === "Eletrônicos"
    );

    criarCards(eletronicos);
}

function limparCards() {

    container.innerHTML = "";
}

criarCards(produtos);

function adicionarProduto(){

    const nome = document.getElementById("nome").value;

    const preco = Number(document.getElementById("preco").value);

    const categoria = document.getElementById("categoria").value;

    if(nome === "" || preco === 0 || categoria === ""){

        alert("Preencha todos os campos!");

        return;
    }

    produtos.push({
        nome,
        preco,
        categoria
    });

    criarCards(produtos);

    document.getElementById("nome").value = "";

    document.getElementById("preco").value = "";

    document.getElementById("categoria").value = "";
}