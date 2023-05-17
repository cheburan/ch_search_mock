<script setup lang="ts">
import { ref } from "vue";
import {
  getPinyin,
  getMetaphone,
  getSimilarity,
  getSoundex,
  searchClosestLevinsteinDistance,
  indexedVocabluaryResolved,
} from "../utils/search.ts";

defineProps<{ msg: string }>();

const count = ref(0);
const searchTerm = ref("");
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <input v-model="searchTerm" placeholder="type text" />
  </div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  <div class="card">
    <p>
      <span class="output-label">search term:</span>
      <span class="output-result" v-if="searchTerm.length > 1">{{
        searchTerm
      }}</span>
    </p>
    <p>
      <span class="output-label">search term Pinyin:</span>
      <span class="output-result" v-if="searchTerm.length > 1">{{
        getPinyin(searchTerm)
      }}</span>
    </p>
    <p>
      <span class="output-label">search term Metaphone:</span>
      <span class="output-result" v-if="searchTerm.length > 1">{{
        getMetaphone(searchTerm)
      }}</span>
    </p>
    <p>
      <span class="output-label">search term Similarity with itself:</span>
      <span class="output-result" v-if="searchTerm.length > 1">{{
        getSimilarity(searchTerm, searchTerm)
      }}</span>
    </p>
    <p>
      <span class="output-label">search term Soundex:</span>
      <span class="output-result" v-if="searchTerm.length > 1">{{
        getSoundex(searchTerm)
      }}</span>
    </p>
    <p>
      <span class="output-label">Closest Levinstein Distance:</span>
      <span class="output-result" v-if="searchTerm.length > 1">{{
        searchClosestLevinsteinDistance(searchTerm, indexedVocabluaryResolved)
      }}</span>
    </p>
  </div>

  <div class="card">
    <h2 class="">Indexed Vocabluary Available:</h2>
    <p
      v-for="word in indexedVocabluaryResolved"
      :key="word.metaphone"
    >
    <span>
      <b>{{ word.original }}</b> - {{ word.pinyin }} - {{ word.metaphone }} -
      {{ word.translation }}
    </span>
    </p>
  </div>
</template>

<style scoped>
.card {
  padding: 1em;
}

input {
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 300px;
  line-height: 1.5em;
  padding: 0.5em;
  margin: 0.5em;
  font-size: large;
}
.output-label {
  font-weight: bold;
}
.output-result {
  font-weight: normal;
}

button {
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 300px;
  line-height: 1.5em;
  padding: 0.5em;
  margin: 0.5em;
  font-size: large;
  background-color: #03370e;
}

input:hover {
  border-color: #03370e;
}

body {
  font-family: sans-serif;
  color: #333;
}
</style>
