const elInicio = document.getElementById("inicio");

const elQuiz = document.getElementById("quiz");

const elResultado = document.getElementById("resultado");

const elPergunta = document.getElementById("pergunta");

const elOpcoes = document.getElementById("opcoes");

const elProgresso = document.getElementById("progresso");

const btnIniciar = document.getElementById("btnIniciar");

const categoria =
    document.getElementById("categoria");

const dificuldade =
    document.getElementById("dificuldade");

const barra =
    document.getElementById("barraProgresso");

const tempoElemento =
    document.getElementById("tempo");

let perguntas = [];

let atual = 0;

let pontos = 0;

let tempo = 15;

let intervalo;

async function traduzirTexto(texto){

    try{

        const resposta = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt`
        );

        const data = await resposta.json();

        return data.responseData.translatedText;

    } catch{

        return texto;
    }
}

async function buscarPerguntas(){

    const categoriaSelecionada =
        categoria.value;

    const dificuldadeSelecionada =
        dificuldade.value;

    const url =
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${categoriaSelecionada}&difficulty=${dificuldadeSelecionada}`;

    const resposta = await fetch(url);

    const data = await resposta.json();

    perguntas = await Promise.all(

        data.results.map(async pergunta => {

            return {

                question:
                    await traduzirTexto(pergunta.question),

                correct_answer:
                    await traduzirTexto(
                        pergunta.correct_answer
                    ),

                incorrect_answers:
                    await Promise.all(

                        pergunta.incorrect_answers.map(
                            resposta =>
                                traduzirTexto(resposta)
                        )
                    )
            };
        })
    );
}


function embaralhar(array){

    return array.sort(() => Math.random() - 0.5);
}

function getAlternativas(pergunta){

    const alternativas = [

        ...pergunta.incorrect_answers,

        pergunta.correct_answer
    ];

    return embaralhar(alternativas);
}

function iniciarTimer(){

    tempo = 15;

    tempoElemento.textContent = tempo;

    clearInterval(intervalo);

    intervalo = setInterval(() => {

        tempo--;

        tempoElemento.textContent = tempo;

        if(tempo <= 0){

            clearInterval(intervalo);

            atual++;

            if(atual < perguntas.length){

                exibirPergunta();

            } else {

                exibirResultado();
            }
        }

    }, 1000);
}

function exibirPergunta(){

    iniciarTimer();

    const pergunta = perguntas[atual];

    const alternativas =
        getAlternativas(pergunta);

    elProgresso.textContent =
        `${atual + 1} / ${perguntas.length}`;

    const progresso =
        ((atual + 1) / perguntas.length) * 100;

    barra.style.width = `${progresso}%`;

    elPergunta.innerHTML =
        pergunta.question;

    elOpcoes.innerHTML = "";

    alternativas.forEach(alternativa => {

        const btn =
            document.createElement("button");

        btn.className = "opcao";

        btn.innerHTML = alternativa;

        elOpcoes.appendChild(btn);
    });
}

elOpcoes.addEventListener("click", (e) => {

    if(!e.target.classList.contains("opcao")){
        return;
    }

    clearInterval(intervalo);

    const resposta =
        e.target.textContent;

    const correta =
        perguntas[atual].correct_answer;

    const botoes =
        document.querySelectorAll(".opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if(resposta === correta){

        pontos++;

        e.target.classList.add("correta");

    } else {

        e.target.classList.add("errada");

        botoes.forEach(botao => {

            if(botao.textContent === correta){

                botao.classList.add("correta");
            }
        });
    }

    setTimeout(() => {

        atual++;

        if(atual < perguntas.length){

            exibirPergunta();

        } else {

            exibirResultado();
        }

    }, 1000);
});

function exibirResultado(){

    elQuiz.hidden = true;

    elResultado.hidden = false;

    const total = perguntas.length;

    const porcentagem =
        Math.round((pontos / total) * 100);

    let mensagem = "Tente novamente!";

    if(porcentagem >= 80){

        mensagem = "Excelente!";

    } else if(porcentagem >= 60){

        mensagem = "Bom trabalho!";
    }

    const recorde =
        localStorage.getItem("recorde");

    if(!recorde || pontos > recorde){

        localStorage.setItem(
            "recorde",
            pontos
        );
    }

    elResultado.innerHTML = `
        <h2>${mensagem}</h2>

        <p>
            Você acertou
            ${pontos} de ${total}
        </p>

        <p>
            ${porcentagem}%
        </p>

        <p>
            Recorde:
            ${localStorage.getItem("recorde")}
        </p>

        <button id="btnReiniciar">
            Jogar Novamente
        </button>
    `;

    document
        .getElementById("btnReiniciar")
        .addEventListener("click", reiniciarQuiz);
}

function reiniciarQuiz(){

    atual = 0;

    pontos = 0;

    elResultado.hidden = true;

    elInicio.hidden = false;
}

btnIniciar.addEventListener("click", async () => {

    btnIniciar.disabled = true;

    btnIniciar.textContent =
        "Carregando perguntas...";

    await buscarPerguntas();

    elInicio.hidden = true;

    elQuiz.hidden = false;

    exibirPergunta();
});