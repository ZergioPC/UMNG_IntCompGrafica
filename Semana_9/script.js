const $code = document.getElementById('codigo');

(async function(){
    const res = await fetch('./sergiod.palacios.py');
    const codigo = await res.text();
    $code.style.whiteSpace = 'pre';
    $code.innerHTML = codigo;
})();

