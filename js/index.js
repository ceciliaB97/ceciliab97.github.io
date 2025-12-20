document.getElementById('surpriseBtn').addEventListener('click', () => {
    // 1. Disparar el confeti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#58a6ff', '#2ea043', '#8957e5', '#f1c40f'] // Los colores de tu paleta
    });

    // 2. Cambiar el texto del botón temporalmente
    const btn = document.getElementById('surpriseBtn');
    const originalText = btn.innerText;
    
    btn.innerText = "Thank you for visiting my portfolio! ❤️";
    btn.style.backgroundColor = "#2ea043"; // Cambia a verde éxito
    btn.style.borderColor = "#3fb950";

    // 3. (Opcional) Volver al texto original después de unos segundos
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = ""; // Vuelve al CSS original
        btn.style.borderColor = "";
    }, 4000);
});