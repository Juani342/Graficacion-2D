import { Tank } from './Tank.js';
import { Bullet } from './Bullet.js';
import { Cloud } from './Cloud.js';
import { Structure } from './Structure.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const angleInput = document.getElementById('angleInput');
const powerInput = document.getElementById('powerInput');
const valAngle = document.getElementById('valAngle');
const valPower = document.getElementById('valPower');
const fireBtn = document.getElementById('fireBtn');
const turnIndicator = document.getElementById('turnIndicator');
const hp1Badge = document.getElementById('hp1');
const hp2Badge = document.getElementById('hp2');

// Modal Elements
const victoryModal = document.getElementById('victoryModal');
const victoryMessage = document.getElementById('victoryMessage');
const restartBtn = document.getElementById('restartBtn');

// --- SISTEMA DE CARGA DE ASSETS ---
const backgroundImg = new Image();
backgroundImg.src = './assets/img/background.jpg';

// El juego solo arranca cuando la imagen carga o da error
backgroundImg.onload = () => { startSystem(); };
backgroundImg.onerror = () => { 
    console.warn("Fondo no encontrado, usando respaldo color sólido.");
    startSystem(); 
};

// Game State
let player1, player2, currentPlayer, bullets, clouds, structures, isAnimating;

function startSystem() {
    player1 = new Tank(100, 375, '#0000FF', true);
    player2 = new Tank(820, 375, '#FF0000', false);
    currentPlayer = player1;
    bullets = [];
    clouds = [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
    structures = [];
    isAnimating = false;

    generateLevel();
    update(); // Inicia el bucle de dibujo
}

function generateLevel() {
    structures = [];
    const centerX = 480;
    const groundY = 370;

    // Columna Central
    for(let i = 0; i < 4; i++) {
        structures.push(new Structure(centerX, groundY - (i * 40), 'stone'));
        structures.push(new Structure(centerX + 40, groundY - (i * 40), 'stone'));
    }
    // Brazos de la T
    for(let j = -2; j <= 3; j++) {
        structures.push(new Structure(centerX + (j * 40), groundY - (4 * 40), 'wood'));
    }
    // Techos flotantes
    for(let k = 0; k < 3; k++) structures.push(new Structure(80 + (k * 40), 250, 'wood'));
    for(let l = 0; l < 3; l++) structures.push(new Structure(800 + (l * 40), 250, 'stone'));
}

// --- EVENTOS ---
angleInput.addEventListener('input', () => {
    let val = parseInt(angleInput.value);
    if (currentPlayer.isPlayer1 && val > 90) val = 90;
    if (!currentPlayer.isPlayer1 && val < 90) val = 90;
    angleInput.value = val;
    valAngle.textContent = val;
    currentPlayer.updateAngle(val);
});

powerInput.addEventListener('input', () => valPower.textContent = powerInput.value);

fireBtn.addEventListener('click', () => {
    if (isAnimating) return;
    bullets.push(new Bullet(currentPlayer.x + 40, currentPlayer.y + 5, currentPlayer.currentAngle, parseInt(powerInput.value)));
    isAnimating = true;
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    clouds.forEach((c, i) => { if(c.isClicked(mx, my)) clouds.splice(i, 1); });
});

restartBtn.addEventListener('click', () => {
    player1.hp = 100; player2.hp = 100;
    generateLevel();
    victoryModal.style.display = 'none';
    isAnimating = false;
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujo de fondo con validación
    if (backgroundImg.complete && backgroundImg.naturalWidth !== 0) {
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#1a1a1a"; // Respaldo oscuro neón
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clouds.forEach(c => { c.update(); c.draw(ctx); });
    structures.forEach(s => s.draw(ctx));
    player1.draw(ctx);
    player2.draw(ctx);

    hp1Badge.textContent = `${player1.hp}%`;
    hp2Badge.textContent = `${player2.hp}%`;

    bullets.forEach((b, i) => {
        b.update(); b.draw(ctx);
        let target = (currentPlayer === player1) ? player2 : player1;
        
        structures.forEach(s => {
            if(s.active && !b.isExploding && b.x > s.x && b.x < s.x + 40 && b.y > s.y && b.y < s.y + 40) {
                s.hp -= 20; if(s.hp <= 0) s.active = false;
                b.isExploding = true;
            }
        });

        if(!b.isExploding && b.x > target.x && b.x < target.x + 80 && b.y > target.y && b.y < target.y + 35) {
            target.hp -= 20; b.isExploding = true;
        }

        if (!b.active) {
            bullets.splice(i, 1);
            isAnimating = false;
            
            if (player1.hp <= 0 || player2.hp <= 0) {
                victoryMessage.textContent = `¡EL ${player1.hp > 0 ? 'JUGADOR 1' : 'JUGADOR 2'} HA DOMINADO EL CAMPO!`;
                victoryModal.style.display = 'flex';
                isAnimating = true; 
                return;
            }

            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            turnIndicator.textContent = `TURNO: JUGADOR ${currentPlayer.isPlayer1 ? '1' : '2'}`;
            turnIndicator.className = currentPlayer.isPlayer1 ? "text-info fw-bold" : "text-danger fw-bold";
        }
    });

    requestAnimationFrame(update);
}