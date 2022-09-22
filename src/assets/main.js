const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCEwl20VxZ3AwOgiKMZtI1GQ&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2edec95dd1mshc3a6a0a56996da9p12d247jsnddfea8d1eb36',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();

    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <a aria-hidden="true" class="absolute inset-0" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank"></a>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).join('')}
            
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
        content.innerHTML = "<p>Error al cargar lo vídeos, recarga la página...</p>";
    }
})();