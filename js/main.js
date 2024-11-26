let currentFile = null;

async function fetchDirectoryStructure(path = '') {
    try {
        const username = 'BorjaOteroFerreira';
        const repo = 'Apuntes';
        const branch = 'main';
        const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/resources${path}`;
        console.log(`Fetching: ${apiUrl}`); // Debug        
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!response.ok) throw new Error(`Error al obtener contenido del repositorio: ${response.statusText}`);
        const items = await response.json();
        const structure = {};
        for (const item of items) {
            if (item.type === 'dir') {
                structure[item.name] = await fetchDirectoryStructure(`${path}/${item.name}`);
            } else if (item.name.endsWith('.md')) {
                if (!structure.files) structure.files = [];
                structure.files.push(item.name);
            } else if (item.name.endsWith('.wav')) {
                if (!structure.podcast) structure.podcast = [];
                structure.podcast.push(item.name);
            }
        }
        return structure;
    } catch (error) {
        console.error('Error al obtener la estructura del directorio:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    let sidebarVisible = true;
    toggleSidebarButton.addEventListener('click', () => {
        sidebarVisible = !sidebarVisible;
        if (sidebarVisible) {
            // Mostrar sidebar
            sidebar.classList.remove('hidden');
            content.classList.remove('sidebar-collapsed');
        } else {
            // Ocultar sidebar
            sidebar.classList.add('hidden');
            content.classList.add('sidebar-collapsed');
        }
    });
});

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


async function initializeFileTree() {
    try {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) throw new Error('No se encontró el elemento sidebar');
        
        const dirInfo = sidebar.querySelector('.directory-info');
        dirInfo.textContent = 'I.E.S Chan Do Monte - 2º DAM - 2024/2025';
        
        const fileTree = await fetchDirectoryStructure();
        if (fileTree) {
            createTreeView(fileTree, sidebar);
        } else {
            throw new Error('No se pudo cargar la estructura de archivos');
        }
        
    } catch (error) {
        console.error('Error al cargar el árbol de archivos:', error);
        showError('Error al cargar la estructura de archivos');
    }
}

function createTreeView(tree, parentElement, path = '') {
    for (const [key, value] of Object.entries(tree)) {
        if (key === 'files' || key === 'podcast') continue;

        const item = document.createElement('div');
        const content = document.createElement('div');

        item.style.marginLeft = path ? '20px' : '0';
        content.className = 'tree-item';

        content.innerHTML = `<span class="folder-icon">📁</span> ${key}`;
        content.onclick = (e) => {
            e.target.closest('.tree-item').classList.toggle('expanded');
            const children = item.querySelector('.children');
            if (children) {
                children.style.display = children.style.display === 'none' ? 'block' : 'none';
            }
        };
        item.appendChild(content);

        const children = document.createElement('div');
        children.className = 'children';
        children.style.display = 'none';

        // Mostrar el reproductor del podcast si existe
        if (value.podcast && value.podcast.length > 0) {
            const podcastFile = value.podcast[0]; // Asumimos que solo hay un podcast por carpeta
            const podcastItem = document.createElement('div');
            podcastItem.className = 'tree-item podcast';
            podcastItem.innerHTML = `
                <audio controls class="sidebar-audio-player">
                    <source src="https://raw.githubusercontent.com/BorjaOteroFerreira/Apuntes/main/resources${path}/${key}/${podcastFile}" type="audio/wav">
                    Tu navegador no soporta el elemento de audio.
                </audio>`;
            children.appendChild(podcastItem);
        }

        // Agregar archivos MD si existen
        if (value.files) {
            value.files.sort().forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'tree-item file';
                fileItem.innerHTML = `<span class="file-icon">📄</span> ${file.replace('.md', '')}`;
                fileItem.onclick = (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.tree-item.file').forEach(el => el.classList.remove('active'));
                    fileItem.classList.add('active');
                    loadMarkdownContent(`${path}/${key}/${file}`);
                };
                children.appendChild(fileItem);
            });
        }
        // Procesar subcarpetas recursivamente
        createTreeView(value, children, `${path}/${key}`);
        if (children.children.length > 0) {
            item.appendChild(children);
        }
        parentElement.appendChild(item);
    }
}


async function loadMarkdownContent(filePath) {
    const content = document.getElementById('content');
    content.innerHTML = '<div class="loading">Cargando contenido...</div>';
    try {
        const username = 'BorjaOteroFerreira';
        const repo = 'Apuntes';
        const branch = 'main';
        const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/resources${filePath}`;
        console.log(`Loading Markdown: ${rawUrl}`); // Debug
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error('No se pudo cargar el archivo');
        const text = await response.text();
        const htmlContent = marked.parse(text);
        content.innerHTML = htmlContent;
        Prism.highlightAllUnder(content);
        const codeBlocks = content.querySelectorAll('pre > code.language-bash, pre > code:not([class])');
        codeBlocks.forEach(codeBlock => simulateConsoleOutput(codeBlock));
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        content.innerHTML = `<div class="error">Error al cargar el contenido del archivo</div>`;
    }
}

async function setupAudioPlayer(audioPath) {
    const playerContainer = document.getElementById('audio-player-container');
    const audioTitle = document.getElementById('audio-title');
    const audioPlayer = document.getElementById('audio-player');
    try {
        const username = 'BorjaOteroFerreira';
        const repo = 'Apuntes';
        const branch = 'main';
        const audioUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/resources${audioPath}`;
        console.log(`Setting up audio: ${audioUrl}`); // Debug
        audioTitle.textContent = "Formato Podcast";
        audioPlayer.src = audioUrl;
        playerContainer.style.display = 'block';
    } catch (error) {
        console.error('Error al cargar el archivo de audio:', error);
        playerContainer.style.display = 'none';
    }
}

function showError(message) {
    const sidebar = document.getElementById('sidebar');
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    sidebar.appendChild(error);
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initializeFileTree);
function showError(message) {
    const sidebar = document.getElementById('sidebar');
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    sidebar.appendChild(error);
}
document.addEventListener('DOMContentLoaded', initializeFileTree);
