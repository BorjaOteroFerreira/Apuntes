let currentDirectory = null;
let fileHandles = new Map();
let audioHandle = null;

marked.setOptions({
    highlight: function(code, lang) {
        if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
    }
});

async function initializeDirectoryPicker() {
    const button = document.getElementById('selectDir');
    button.addEventListener('click', async () => {
        try {
            const dirHandle = await window.showDirectoryPicker();
            await loadDirectory(dirHandle);
        } catch (error) {
            console.error('Error al seleccionar directorio:', error);
        }
    });
}

async function loadDirectory(dirHandle) {
    currentDirectory = dirHandle;
    fileHandles.clear();
    
    const sidebar = document.getElementById('sidebar');
    const dirInfo = sidebar.querySelector('.directory-info');
    dirInfo.textContent = `Apuntes de ${dirHandle.name}`;
    
    const existingFiles = sidebar.querySelectorAll('.md-title');
    existingFiles.forEach(el => el.remove());

    const playerContainer = document.getElementById('audio-player-container');
    playerContainer.style.display = 'none';

    for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
            if (entry.name.endsWith('.md')) {
                const div = document.createElement('div');
                div.className = 'md-title';
                div.textContent = entry.name.replace('.md', '');
                div.onclick = () => loadMarkdownContent(entry);
                sidebar.appendChild(div);
                fileHandles.set(entry.name, entry);
            } else if (entry.name.endsWith('.wav')) {
                audioHandle = entry;
                await setupAudioPlayer(entry);
            }
        }
    }

    if (fileHandles.size === 0) {
        const noFiles = document.createElement('div');
        noFiles.className = 'error';
        noFiles.textContent = 'No se encontraron archivos .md en este directorio';
        sidebar.appendChild(noFiles);
    }
}

async function loadMarkdownContent(fileHandle) {
    const content = document.getElementById('content');
    content.innerHTML = '<div class="loading">Cargando contenido...</div>';

    try {
        document.querySelectorAll('.md-title').forEach(el => el.classList.remove('active'));
        [...document.querySelectorAll('.md-title')]
            .find(el => el.textContent === fileHandle.name.replace('.md', ''))
            ?.classList.add('active');

        const file = await fileHandle.getFile();
        const text = await file.text();
        const htmlContent = marked.parse(text);

        content.innerHTML = htmlContent;

        Prism.highlightAllUnder(content);

        const codeBlocks = content.querySelectorAll('pre > code.language-bash, pre > code:not([class])');
        codeBlocks.forEach(codeBlock => simulateConsoleOutput(codeBlock));
    } catch (error) {
        content.innerHTML = `<div class="error">Error al cargar el contenido del archivo</div>`;
        console.error('Error al cargar el archivo:', error);
    }
}

function simulateConsoleOutput(codeBlock) {
    const lines = codeBlock.textContent.split('\n');
    const parent = codeBlock.parentElement;
    const lineHeight = 20;
    const maxLines = 15;
    parent.innerHTML = '';
    parent.classList.add('console-container');

    parent.style.height = `${lineHeight * maxLines}px`;
    parent.style.overflowY = 'auto';

    let index = 0;

    function writeLine() {
        if (index < lines.length) {
            const line = document.createElement('div');
            line.textContent = lines[index];
            parent.appendChild(line);
            parent.scrollTop = parent.scrollHeight;
            index++;
            setTimeout(writeLine, 200);
        } else {
            setTimeout(() => {
                parent.innerHTML = '';
                index = 0;
                writeLine();
            }, 1000);
        }
    }

    writeLine();
}

async function setupAudioPlayer(audioFileHandle) {
    const playerContainer = document.getElementById('audio-player-container');
    const audioTitle = document.getElementById('audio-title');
    const audioPlayer = document.getElementById('audio-player');

    try {
        const file = await audioFileHandle.getFile();
        const audioUrl = URL.createObjectURL(file);
        
        audioTitle.textContent = "Formato Podcast";
        audioPlayer.src = audioUrl;
        playerContainer.style.display = 'block';

        audioPlayer.onload = () => URL.revokeObjectURL(audioUrl);
    } catch (error) {
        console.error('Error al cargar el archivo de audio:', error);
        playerContainer.style.display = 'none';
    }
}

if (!('showDirectoryPicker' in window)) {
    document.body.innerHTML = `
        <div class="error" style="margin: 20px;">
            Tu navegador no soporta la API de acceso a archivos. 
            Por favor, usa un navegador más reciente como Arc, Safari, Opera o Chrome.
        </div>
    `;
} else {
    initializeDirectoryPicker();
}
