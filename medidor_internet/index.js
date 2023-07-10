let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// Obter imagem aleatória de unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

// Quando a imagem carrega
image.onload = async function () {
    endTime = new Date().getTime();

    // Obter tamanho da imagem
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// Função para calcular a velocidade
function calculateSpeed() {
    // tempo gasto em segundos
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // Se todos os testes forem concluídos (obtemos 5 imagens e calculamos a média)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // Exibir velocidades médias
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Teste Completo!";
    } else {
        // Execute o próximo teste
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Função para iniciar os testes
const init = async () => {
    info.innerHTML = "Testando...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Executar testes quando a janela é carregada
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};