let numerosSorteados = [];
let ultimoNumero = null;

// Inicializar a tabela quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    criarTabela();
});

function criarTabela() {
    const tabela = document.getElementById('tabela-bingo');
    tabela.innerHTML = '';
    
    // Criar 15 linhas com 5 colunas cada (75 números total)
    for (let linha = 0; linha < 15; linha++) {
        const tr = document.createElement('tr');
        for (let coluna = 0; coluna < 5; coluna++) {
            const numero = linha * 5 + coluna + 1;
            const td = document.createElement('td');
            td.textContent = numero;
            td.id = `numero-${numero}`;
            tr.appendChild(td);
        }
        tabela.appendChild(tr);
    }
}

function sortearNumero() {
    // Verificar se ainda há números para sortear
    if (numerosSorteados.length >= 75) {
        alert('Todos os números já foram sorteados!');
        return;
    }
    
    let numeroSorteado;
    do {
        numeroSorteado = Math.floor(Math.random() * 75) + 1;
    } while (numerosSorteados.includes(numeroSorteado));
    
    // Adicionar à lista de sorteados
    numerosSorteados.push(numeroSorteado);
    ultimoNumero = numeroSorteado;
    
    // Atualizar interface
    atualizarInterface();
    marcarNumeroNaTabela(numeroSorteado);
    
    // Desabilitar botão se todos os números foram sorteados
    if (numerosSorteados.length >= 75) {
        document.getElementById('sortear').disabled = true;
    }
}

function atualizarInterface() {
    document.getElementById('ultimo-numero').textContent = ultimoNumero || '-';
    document.getElementById('contador').textContent = numerosSorteados.length;
}

function marcarNumeroNaTabela(numero) {
    // Remover destaque do último número
    const ultimoDestacado = document.querySelector('.ultimo');
    if (ultimoDestacado) {
        ultimoDestacado.classList.remove('ultimo');
    }
    
    // Marcar o novo número
    const celula = document.getElementById(`numero-${numero}`);
    celula.classList.add('sorteado', 'ultimo');
}

function novaRodada() {
    // Resetar variáveis
    numerosSorteados = [];
    ultimoNumero = null;
    
    // Limpar marcações da tabela
    const celulas = document.querySelectorAll('#tabela-bingo td');
    celulas.forEach(celula => {
        celula.classList.remove('sorteado', 'ultimo');
    });
    
    // Reabilitar botão sortear
    document.getElementById('sortear').disabled = false;
    
    // Atualizar interface
    atualizarInterface();
}