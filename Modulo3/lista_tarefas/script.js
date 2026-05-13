const form = document.getElementById("formTarefa");

const inputTarefa = document.getElementById("inputTarefa");

const lista = document.getElementById("lista");

const buscar = document.getElementById("buscar");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas(){

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function renderizarTarefas(){

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${tarefa.riscada ? "riscada" : ""}">
                ${tarefa.texto}
            </span>

            <button class="remover" data-index="${index}">
                X
            </button>
        `;

        lista.appendChild(li);
    });
}

form.addEventListener("submit", function(event){

    event.preventDefault();

    const texto = inputTarefa.value.trim();

    if(texto === ""){
        return;
    }

    tarefas.push({
        texto,
        riscada: false
    });

    salvarTarefas();

    renderizarTarefas();

    inputTarefa.value = "";
});

lista.addEventListener("click", function(event){

    if(event.target.classList.contains("remover")){

        const index = event.target.dataset.index;

        tarefas.splice(index, 1);

        salvarTarefas();

        renderizarTarefas();

    } else if(event.target.tagName === "SPAN") {

        const texto = event.target.innerText;

        tarefas = tarefas.map(tarefa => {

            if(tarefa.texto === texto){

                tarefa.riscada = !tarefa.riscada;
            }

            return tarefa;
        });

        salvarTarefas();

        renderizarTarefas();
    }
});

buscar.addEventListener("input", function(){

    const textoBusca = buscar.value.toLowerCase();

    const itens = lista.querySelectorAll("li");

    itens.forEach(item => {

        const texto = item.innerText.toLowerCase();

        if(texto.includes(textoBusca)){

            item.style.display = "flex";

        } else {

            item.style.display = "none";
        }
    });
});

renderizarTarefas();