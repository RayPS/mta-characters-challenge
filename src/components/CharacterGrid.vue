<script setup lang="ts">
import { useStore } from '@/store'

const {
  store: { characters, isShuffling },
  getters: { isAllDone },
  actions: { toggleCharacter, pick, reset },
} = useStore()

</script>

<template>
  <ul class="character-grid">
    <li v-for="({name, image, player, done, selected}) in characters" :key="name" :class="{done, selected}" @click="toggleCharacter(name)">
      <span class="player">{{ player }}</span>
      <img src="@/assets/checkmark.png" class="checkmark">
      <img :src="image" class="image">
    </li>
    <button v-if="!isAllDone" :disabled="isShuffling" @click="pick">
      <img src="@/assets/dice.png">Pick
    </button>
    <button v-else @click="reset">
      Reset
    </button>
  </ul>
</template>

<style lang="scss" scoped>

$cell-size: 80px;
$gap-size: 10px;
$blue: hsl(210, 100%, 45%);
$red: hsl(0, 100%, 45%);

ul.character-grid {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-grid;
  grid-template-columns: repeat(4, $cell-size);
  grid-template-rows: repeat(8, $cell-size);
  gap: $gap-size;
  justify-items: center;
  background-color: hsl(0, 0%, 10%);
  padding: $gap-size;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .checkmark {
      z-index: 1;
      opacity: 0;
      transform: scale(0.2);
      pointer-events: none;
      width: 60%;
      height: 60%;
      position: absolute;
      transition: all 250ms ease;
    }
    .image {
      cursor: pointer;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      transition: filter 100ms ease;
    }
    .player {
      opacity: 0;
      position: absolute;
      color: white;
      left: -0.2em;
      top: -0.5em;
      font-weight: bold;
      font-size: 1.5em;
    }
  }
  li.done {
    .checkmark {
      opacity: 1;
      transform: scale(1);
    }
    .image{
      filter: grayscale(100%) brightness(30%);
    }
  }
  li.selected {
    .image {
      border-radius: 0% 50% 50% 50%;
      background-color: $red;
      animation: selected 0.25s ease-out infinite alternate-reverse;
    }
    .player {
      opacity: 1;
    }
  }
  button {
    grid-column: -3 / -1;
    grid-row: -2 / -1;
    height: 60%;
    width: 80%;
    border-radius: 32px;
    border: none;
    align-self: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.75em;
    background-color: $blue;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 100ms ease;
    &:hover {
      background-color: lighten($blue, 10);
    }
    &:active {
      transform: scale(0.95);
      background-color: darken($blue, 10);
    }
    &:disabled {
      pointer-events: none;
      filter: grayscale(100%);
    }
    img {
      height: 1em;
      margin-right: 0.5em;
    }
  }
}

@keyframes selected {
  from { box-shadow: 0 0 0 4px $red; }
  to { box-shadow: 0 0 0 8px $red; }
}
</style>
