const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

function download() {
    let userInput = document.getElementById("user-input");
    let url = userInput.value;

    let desktopPath = path.join(process.env.USERPROFILE || process.env.HOME, "Desktop");
    let outputPath = path.join(desktopPath, "video.mp4");

    try {
        let stream = ytdl(url).pipe(fs.createWriteStream(outputPath));

        stream.on("finish", () => {
            console.log("Download finalizado com sucesso! O vídeo foi salvo na área de trabalho como:", outputPath);
        });

        stream.on("error", (err) => {
            console.error("Ocorreu um erro durante o download:", err.message);
        });
    } catch (err) {
        console.error("Erro ao iniciar o download:", err.message);
    }
}

download();