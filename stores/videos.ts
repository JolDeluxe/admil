import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVideosStore = defineStore("videos", () => {

    const videos = ref<any[]>([]);
    const error = ref<string | null>(null);

    const getVideos = async () => {
        error.value = null;
        try {
            const url = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '99f51eda6dmsh7fefa551b069c30p1ca2c1jsn2057e07737de', 
                    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Error al obtener los videos');
            }
            const data = await response.json(); 
            videos.value = data.items;
        } catch (err: any) {
            error.value = err?.message || 'Error al cargar los videos.';
            console.error('Error al cargar los videos:', err);
        }
    };

    return {
        videos,
        error,
        getVideos,
    };
});
