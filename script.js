// --- SUA LÓGICA ORIGINAL MANTIDA ---
let money = 0;
let progress = 0;
const speed = 2; // quanto maior, mais rápido

function update() {
    progress += speed;
    
    if (progress >= 100) {
        progress = 0;
        money += 10; // Ganha 10 moedas cada vez que a barra enche
        document.getElementById('money-display').innerText = money;
    }
    
    document.getElementById('fill-1').style.width = progress + "%";
    requestAnimationFrame(update);
}

update(); // Inicia o loop do jogo
