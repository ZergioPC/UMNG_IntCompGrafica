## Plan: Reescribir el motor del minijuego

### 1. Qué NO cambia
- `index.html` (secciones `#inicio`, `#movil`, `#pc`, `#game`, `#loadImg` con las `<img>` de assets — siguen resolviendo el problema de GitHub Pages).
- Imágenes de `img/`, `dialogos.js`, `estilos.css` y los `Semana_X/index.html`.
- Mecánicas: caminar, correr, dialogar con NPCs, alertas de stands → navegar a cada semana.

### 2. Arquitectura nueva de módulos

```
assets.js   → loader de imágenes (se mantiene casi igual)
input.js    → teclado + botones táctiles unificados, Set de teclas pulsadas
level.js    → datos del nivel: tiles sólidos (Set "x,y"), stands, árboles, fuente, NPCs
sprite.js   → clase Sprite genérica (img, cellW/H, filas, columnas, animación)
player.js   → jugador: posición (px), dirección, animación, colisión con deslizamiento
npc.js      → NPC: sprite, diálogo, avatar, facción
camera.js   → cámara con clamp a los bordes del mundo
ui.js       → diálogos y alertas con overlay explícito
main.js     → bootstrap, secciones, loop (fixed timestep), máquina de estados
```

Se eliminan `script.js` (navegación pasa a `main.js`) y `world.js`/`entidades`/`colisiones.js` actuales.

### 3. Modelo de datos del nivel (`level.js`)
- Mundo 50×25 tiles de 80px → 4000×2000px.
- Un `Set<string>` con celdas sólidas construido a partir de la config (fronteras, lago, árboles 1 celda, stands 4×2, fuente 4×4, celdas de NPC), O(1) por consulta.
- Listas de entidades animadas/interactivas con sus sprites y celdas de interacción (`actZone`) en front del objeto.

### 4. Cámara y movimiento (`camera.js`, `player.js`)
- **Se elimina el sistema de 4 coordenadas** (`pos_mapa`/`pos_player`/`pos_global`/`coords`).
- El jugador vive en coords de mundo (px); la cámara = `clamp(jugador - 360/240, 0, mundo-720/480)`. Eso replica el "centrado salvo cerca de bordes" sin los booleanos `limite/desfase`.
- Colisión con **deslizamiento por eje** (movimiento X y Y por separado contra el `Set` sólido): ajusta tiles medio-pixeleados y permite avanzar pegado a paredes (arregla el bug del +320 vs +360).
- Diagonales soportadas (normalizando el vector), velocidad establecida (caminar 8px/tick, correr 16px/tick).

### 5. Sprites (`sprite.js`, `ui.js`)
- Clase `Sprite` para jugador/NPC/árbol/fuente con las celdas documentadas (26px, 47px, 80px), eliminando la magia numérica dispersa.
- Mapa: en `main.js` se encapsula el recorte del `mapa.png` (`source px / 10`, frame ×200) en una función documentada; se conserva la animación de 6 frames.
- **Depth sorting** (orden por Y del suelo) para jugador, NPCs, árboles, fuente y stands.
- Diálogos/alertas con overlay **`rgba(0,0,0,0.55)` explícito** (arregla el `fillRect` sin `fillStyle`), avatar 130×130, caja de diálogo, nombre, 2 líneas de texto e iconos de teclas. Sustituir `ctx.reset()` por `clearRect` + `imageSmoothingEnabled=false`.

### 6. Entrada e interacción (`input.js`, `main.js`)
- Map y Set de teclas activas (`KeyW/A/S/D`, `Space`, `Escape`, `ShiftLeft`) + botones táctiles del HTML enlazados.
- Máquina de estados: `PLAY → TALK` (diálogo NPC), `PLAY → PROMPT` (stand), con **Escape cerrando también diálogos** (mejora frente al diseño actual).
- Interacción = celda al frente del jugador según `facing`, espacios de diálogo con `Space`, navegación del stand con confirmación.

### 7. Correcciones heredadas incorporadas
- Eliminar `KeyQ` + console.log de debug.
- Cargar dialog correcto al abrir (reset de línea).
- Prevenir doble avance de línea con un pequeño gate de `ready`.
- `imgsReady()` también cae en `img.decode()` para evitar parpadeos.

### 8. Orden de implementación
1. `assets.js` + `input.js`
2. `level.js` (datos sólidos desde las zonas actuales)
3. `sprite.js` + `player.js` + `camera.js` (movimiento + colisión + cámara)
4. `ui.js` (diálogos/alertas) + estado de interacción en `main.js`
5. `npc.js`, depth sorting y render completo del mapa
6. Bootstrap de secciones (billboard `#inicio/#movil/#pc/#game`) y limpieza de archivos viejos
7. QA manual

### 9. Verificación
- `node --check` en todos los módulos.
- Servidor local (`python3 -m http.server`) + checklist manual: movimiento, esquinas/bordes del mapa, correr, colisión con árboles/fuente/stands, diálogos de los 3 NPCs (multi-línea y cierre con Space y Escape), alertas de los 9 stands → navegación a `Semana_X/index.html`, y flujo móvil/PC con la nueva entrada táctil.