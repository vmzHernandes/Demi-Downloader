const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

function download() {
    let url = "https://www.youtube.com/watch?v=eKAhu7DyZN8"

    let desktopPath = path.join(process.env.USERPROFILE || process.env.HOME, "Desktop");
    let outputPath = path.join(desktopPath, "video.mp4");

    try {
        let stream = ytdl(url).pipe(fs.createWriteStream(outputPath));
        stream.on("open", () => {
            console.log("Iniciando download...")
        });

        stream.on("data", () => {
            console.log("Baixando...")
        });

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