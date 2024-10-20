window.onload = () => {
    document.getElementById('birthDayaudio').play();

    // Launch fireworks
    launchFireworks();
};

document.addEventListener('click', function () {
    const audio = document.getElementById('birthDayaudio');
    audio.play();
});

// Fireworks logic using canvas
function launchFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    // Example fireworks code, you can integrate any fireworks library
    // Placeholder effect
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(50, 50, 200, 200);
}
