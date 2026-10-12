const imgs = {};

document.querySelectorAll('#loadImg img').forEach((el) => {
    if (el.dataset.id) {
        imgs[el.dataset.id] = el;
    }
});

function imgsReady() {
    const pendientes = [];
    document.querySelectorAll('#loadImg img').forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
            pendientes.push(img.decode ? img.decode().catch(() => {}) : Promise.resolve());
            return;
        }
        pendientes.push(new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        }));
    });
    return Promise.all(pendientes);
}

export { imgs, imgsReady };
