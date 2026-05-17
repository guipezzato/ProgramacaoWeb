const formatarMensagem = (texto) => {
    return `[LOG]: ${texto} - Processado em ${new Date().toLocaleTimeString()}`;
};

const somar = (a, b) => a + b;

module.exports = {
    formatarMensagem,
    somar
};