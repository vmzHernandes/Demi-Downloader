const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

function download() {
    const url = "https://www.youtube.com/watch?v=LBbdyF16qKc";

    // Caminho para a área de trabalho do usuário
    const desktopPath = path.join(process.env.USERPROFILE || process.env.HOME, "Desktop");
    const outputPath = path.join(desktopPath, "video.mp4");

    try {
        const stream = ytdl(url).pipe(fs.createWriteStream(outputPath));

        // Mensagem de sucesso ao finalizar
        stream.on("finish", () => {
            console.log("Download finalizado com sucesso! O vídeo foi salvo na área de trabalho como:", outputPath);
        });

        // Mensagem de erro durante o processo
        stream.on("error", (err) => {
            console.error("Ocorreu um erro durante o download:", err.message);
        });
    } catch (err) {
        console.error("Erro ao iniciar o download:", err.message);
    }
}

download();