// Конвертация YouTube ссылок
function convertYouTubeUrl(url) {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    
    if (videoIdMatch) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    
    // Для прямых ссылок на трансляции (например, Twitch)
    if (url.includes('twitch.tv')) {
        const channelMatch = url.match(/twitch\.tv\/([^\/\s]+)/);
        if (channelMatch) {
            return `https://player.twitch.tv/?channel=${channelMatch[1]}&parent=${window.location.hostname}`;
        }
    }
    
    return url;
}

// Функция для генерации ссылки на плеер
function generatePlayerLink(videoUrl) {
    const embeddedUrl = convertYouTubeUrl(videoUrl);
    const playerUrl = `${window.location.origin}${window.location.pathname}?stream=${encodeURIComponent(embeddedUrl)}`;
    return playerUrl;
}

// Отображение плеера
function displayPlayer(videoUrl) {
    const playerDiv = document.getElementById('player');
    const embeddedUrl = convertYouTubeUrl(videoUrl);
    
    playerDiv.innerHTML = `<iframe src="${embeddedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    document.getElementById('playerContainer').classList.remove('hidden');
}

// Обработка кнопки генерации
document.getElementById('generateBtn').addEventListener('click', () => {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    
    if (!videoUrl) {
        alert('Пожалуйста, введите ссылку на видео или трансляцию');
        return;
    }
    
    // Отображаем плеер
    displayPlayer(videoUrl);
    
    // Генерируем ссылку
    const playerLink = generatePlayerLink(videoUrl);
    document.getElementById('linkOutput').value = playerLink;
    document.getElementById('generatedLink').classList.remove('hidden');
});

// Копирование ссылки
document.getElementById('copyLinkBtn').addEventListener('click', () => {
    const linkOutput = document.getElementById('linkOutput');
    linkOutput.select();
    document.execCommand('copy');
    alert('Ссылка скопирована в буфер обмена!');
});

// Открыть в новой вкладке
document.getElementById('openPlayerBtn').addEventListener('click', () => {
    const linkOutput = document.getElementById('linkOutput').value;
    window.open(linkOutput, '_blank');
});

// При загрузке страницы проверяем параметры URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const streamUrl = urlParams.get('stream');
    
    if (streamUrl) {
        // Режим просмотра - только плеер
        document.body.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; justify-content: center; align-items: center;">
                <iframe src="${streamUrl}" 
                        style="width: 100%; height: 100%;" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen></iframe>
            </div>
        `;
    }
});
