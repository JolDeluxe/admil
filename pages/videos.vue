<template>
  <v-container fluid>
    <!-- Título con margen grande -->
    <v-row class="mb-6">
      <v-col cols="40">
        <h1 class="text-center">VIDEOS</h1>
      </v-col>
    </v-row>
    <!-- Lista de videos -->
    <v-row>
      <v-col v-for="video in videos" :key="video.id.videoId" cols="12" md="4">
        <v-card class="mb-4">
          <!-- Enlace al video en YouTube -->
          <a :href="`https://www.youtube.com/watch?v=${video.id.videoId}`" target="_blank">
            <!-- Acceso correcto a la URL de la miniatura -->
            <v-img :src="video.snippet.thumbnails.high.url" height="200px"></v-img>
            <v-card-title>{{ video.snippet.title }}</v-card-title>
          </a>
          <!-- Botón para marcar como favorito -->
          <v-card-actions>
            <v-btn
              @click="toggleFavorite(video.id.videoId)"
              :color="isFavorite(video.id.videoId) ? 'red' : 'grey'"
              icon
            >
              <v-icon>{{ isFavorite(video.id.videoId) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import { useVideosStore } from "@/stores/videos";

const { videos, error, getVideos } = useVideosStore();

const favoriteVideos = ref<string[]>([]);

onMounted(async () => {
  await getData();
});

async function getData() {
  await getVideos();
}

function toggleFavorite(videoId: string) {
  if (favoriteVideos.value.includes(videoId)) {
    favoriteVideos.value = favoriteVideos.value.filter(id => id !== videoId);
  } else {
    favoriteVideos.value.push(videoId);
  }
}

function isFavorite(videoId: string) {
  return favoriteVideos.value.includes(videoId);
}
</script>
