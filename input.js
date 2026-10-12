// Entrada unificada: teclado + botones táctiles del HTML.
// Mantiene un Set de teclas pulsadas y dispara callbacks de flanco (press).

const GAME_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'Escape', 'ShiftLeft']);

const pressed = new Set();
const pressHandlers = new Map();

export function isDown(key) {
    return pressed.has(key);
}

export function onPress(key, fn) {
    if (!pressHandlers.has(key)) pressHandlers.set(key, []);
    pressHandlers.get(key).push(fn);
}

function press(key) {
    if (pressed.has(key)) return;
    pressed.add(key);
    const handlers = pressHandlers.get(key);
    if (handlers) handlers.forEach((fn) => fn());
}

function release(key) {
    pressed.delete(key);
}

export function initInput() {
    window.addEventListener('keydown', (e) => {
        if (!GAME_KEYS.has(e.code)) return;
        e.preventDefault();
        press(e.code);
    });

    window.addEventListener('keyup', (e) => {
        if (!GAME_KEYS.has(e.code)) return;
        e.preventDefault();
        release(e.code);
    });

    document.querySelectorAll('#controles button').forEach((btn) => {
        const key = btn.id;
        const down = (e) => { e.preventDefault(); press(key); };
        const up = (e) => { e.preventDefault(); release(key); };

        btn.addEventListener('pointerdown', down);
        btn.addEventListener('pointerup', up);
        btn.addEventListener('pointercancel', up);
        btn.addEventListener('pointerleave', up);
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
    });
}
