const alunos = [
    { nome: "Ana", nota1: 7, nota2: 8 },
    { nome: "Carlos", nota1: 5, nota2: 4 },
    { nome: "Mariana", nota1: 9, nota2: 10 },
    { nome: "João", nota1: 6, nota2: 6 },
    { nome: "Fernanda", nota1: 3, nota2: 5 }
];

function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

const alunosComMedia = alunos.map(aluno => ({
    ...aluno,
    media: calcularMedia(aluno.nota1, aluno.nota2)
}));


const aprovados = alunosComMedia.filter(aluno => aluno.media >= 6);

const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const mediaGeral = alunosComMedia.reduce((acc, aluno) => {
    return acc + aluno.media;
}, 0) / alunosComMedia.length;

const alunosOrdenados = [...alunosComMedia].sort((a, b) => b.media - a.media);

console.log("===== LISTA DE ALUNOS =====");

alunosComMedia.forEach(aluno => {
    console.log(
        `${aluno.nome} | Nota1: ${aluno.nota1} | Nota2: ${aluno.nota2} | Média: ${aluno.media.toFixed(2)}`
    );
});

console.log("\n===== APROVADOS =====");

aprovados.forEach(aluno => {
    console.log(`${aluno.nome} - Média: ${aluno.media.toFixed(2)}`);
});

console.log("\n===== REPROVADOS =====");

reprovados.forEach(aluno => {
    console.log(`${aluno.nome} - Média: ${aluno.media.toFixed(2)}`);
});

console.log(`\nMédia geral da turma: ${mediaGeral.toFixed(2)}`);

console.log("\n===== ALUNOS ORDENADOS POR MÉDIA =====");

alunosOrdenados.forEach(aluno => {
    console.log(`${aluno.nome} - Média: ${aluno.media.toFixed(2)}`);
});