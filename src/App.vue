<script setup lang="ts">
import CharacterGrid from '@/components/CharacterGrid.vue'
import SettingsView from '@/components/SettingsView.vue'
import { useStore } from '@/store'

const {
  store: { settingsOpened },
} = useStore()

</script>

<template>
  <main>
    <SettingsView v-if="settingsOpened" />
    <CharacterGrid />
    <img src="@/assets/settings.png" class="gear" @click="settingsOpened = true">
  </main>
</template>

<style lang="scss">
@import '@/assets/reset.css';

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  font-size: 16px;
}

main {
  display: inline-block;
  position: relative;
}

.gear {
  position: absolute;
  bottom: 0.3em;
  right:  0.3em;
  width:  1.75em;
  height: 1.75em;
  opacity: 0.25;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>
