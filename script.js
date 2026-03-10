// --- CONFIGURAÇÕES INICIAIS ---
let money = 0;
const moneyDisplay = document.getElementById('money-display');

// Estado inicial dos trabalhadores
let workers = {
    1: { active: true, progress: 0, speed: 2, val: 10 },
    2: { active: false, progress: 0, speed: 1.5, val: 20 },
    3: { active: false, progress: 0, speed: 1.2, val: 50 }
};

// --- FUNÇÃO PARA SALVAR (LOCAL STORAGE) ---
function salvarProgresso() {
    const dadosParaSalvar = {
        money: money,
        workers: workers
    };
    localStorage.setItem('meuJogoFactory', JSON.stringify(dadosParaSalvar));
}

// --- FUNÇÃO PARA CARREGAR ---
function carregarProgresso() {
    const dadosSalvos = localStorage.getItem('meuJogoFactory');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        money = dados.money;
        workers = dados.workers;
        
        // Atualiza o visual de cada slot baseado no que foi carregado
        for (let id in workers) {
            if (workers[id].active && id > 1) { // O 1 já nasce ativo
                atualizarVisualSlot(id);
            }
        }
        moneyDisplay.innerText = money;
    }
}

// --- FUNÇÃO PARA ATUALIZAR O VISUAL DO SLOT COMPRADO ---
function atualizarVisualSlot(id) {
    const slot = document.getElementById(`slot-${id}`);
    if (slot) {
        slot.classList.remove('locked');
        slot.removeAttribute('onclick');
        
        // Define o ícone dependendo do trabalhador
        const icone = id == 2 ? "📦" : "🏭"; 
        
        slot.innerHTML = `
            <div id="content-${id}">
                <div class="item-icon">${icone}</div>
                <div class="worker-label">TRABALHADOR ${id}</div>
                <div class="progress-bar">
                    <div id="fill-${id}" class="progress-fill"></div>
                </div>
            </div>
        `;
    }
}

// --- FUNÇÃO PARA COMPRAR ---
function comprarTrabalhador(id, preco) {
    if (money >= preco && !workers[id].active) {
        money -= preco;
        workers[id].active = true;
        moneyDisplay.innerText = money;

        atualizarVisualSlot(id);
        salvarProgresso(); // Salva logo após a compra
    } else if (!workers[id].active) {
        alert("Dinheiro insuficiente!");
    }
}

// --- LOOP PRINCIPAL ---
function update() {
    let mudouAlgo = false;

    for (let id in workers) {
        if (workers[id].active) {
            workers[id].progress += workers[id].speed;

            if (workers[id].progress >= 100) {
                workers[id].progress = 0;
                money += workers[id].val;
                moneyDisplay.innerText = money;
                mudouAlgo = true; // Dinheiro mudou, vamos salvar
            }

            const bar = document.getElementById(`fill-${id}`);
            if (bar) bar.style.width = workers[id].progress + "%";
        }
    }

    // Salva o dinheiro automaticamente a cada ciclo de produção
    if (mudouAlgo) salvarProgresso();

    requestAnimationFrame(update);
}

// Inicia o jogo carregando o que já existe
carregarProgresso();
update();
