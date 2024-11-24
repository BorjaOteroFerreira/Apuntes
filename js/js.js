let currentFile = null;

async function fetchDirectoryStructure(path = '') {
    try {
        const username = 'BorjaOteroFerreira'; // Tu usuario
        const repo = 'Apuntes'; // Tu repositorio
        const branch = 'main';
        
        const response = await fetch(
            `https://api.github.com/repos/${username}/${repo}/contents/resources${path}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        if (!response.ok) throw new Error('Error al obtener contenido del repositorio');
        
        const items = await response.json();
        const structure = {};
        
        for (const item of items) {
            if (item.type === 'dir') {
                structure[item.name] = await fetchDirectoryStructure(`/${item.name}`);
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

async function initializeFileTree() {
    try {
        const sidebar = document.getElementById('sidebar');
        const dirInfo = sidebar.querySelector('.directory-info');
        dirInfo.textContent = 'Apuntes';
        
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
        
        // Agregar podcast si existe
        if (value.podcast) {
            value.podcast.forEach(podcastFile => {
                const podcastItem = document.createElement('div');
                podcastItem.className = 'tree-item podcast';
                podcastItem.innerHTML = `<span class="podcast-icon">🎧</span> ${podcastFile}`;
                podcastItem.onclick = (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.tree-item.podcast').forEach(el => el.classList.remove('active'));
                    podcastItem.classList.add('active');
                    setupAudioPlayer(`${path}/${key}/${podcastFile}`);
                };
                children.appendChild(podcastItem);
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
        
        const response = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo}/${branch}/resources${filePath}`
        );
        
        if (!response.ok) throw new Error('No se pudo cargar el archivo');
        
        const text = await response.text();
        const htmlContent = marked.parse(text);
        
        content.innerHTML = htmlContent;
        
        // Resaltar la sintaxis del código
        Prism.highlightAllUnder(content);
        
        // Simular salida de consola para bloques de código bash
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
        
        audioTitle.textContent = "Formato Podcast";
        audioPlayer.src = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/resources${audioPath}`;
        playerContainer.style.display = 'block';
    } catch (error) {
        console.error('Error al cargar el archivo de audio:', error);
        playerContainer.style.display = 'none';
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

function showError(message) {
    const sidebar = document.getElementById('sidebar');
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    sidebar.appendChild(error);
}

// Estilos CSS
const styles = `
    .tree-item {
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: background-color 0.2s;
    }
    
    .tree-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    .tree-item.active {
        background-color: rgba(255, 255, 255, 0.15);
    }
    
    .file-icon, .folder-icon, .podcast-icon {
        margin-right: 8px;
    }
    
    .children {
        margin-left: 20px;
        display: none;
    }
    
    .expanded > .folder-icon {
        transform: rotate(90deg);
    }
    
    .file {
        color: #d4d4d4;
    }
    
    .podcast {
        color: #89d4ff;
    }

    .loading {
        padding: 20px;
        text-align: center;
        color: #666;
    }

    .error {
        padding: 20px;
        color: #ff6b6b;
        background-color: rgba(255, 107, 107, 0.1);
        border-left: 3px solid #ff6b6b;
        margin: 10px;
    }

    .console-container {
        background-color: #1e1e1e;
        padding: 10px;
        font-family: monospace;
        border-radius: 4px;
    }
`;

// Agregar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initializeFileTree);