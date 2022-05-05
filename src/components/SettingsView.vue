<script setup lang="ts">
import { useStore } from '@/store'

const {
  store: { settings, settingsOpened },
  actions: { reset },
  getters: { isResettable },
} = useStore()

function getAppDimension () {
  const { clientWidth, clientHeight } = document.querySelector('main') as HTMLElement
  return 'Width: ' + clientWidth + 'px\nHeight: ' + clientHeight + 'px'
}

</script>

<template>
  <div class="settings-view">
    <div class="modal">
      <h3>Settings</h3>
      <form>
        <p>Mode</p>
        <input id="singles" v-model="settings.mode" type="radio" value="Singles">
        <label for="singles">Singles</label>
        <input id="doubles" v-model="settings.mode" type="radio" value="Doubles">
        <label for="doubles">Doubles</label>
      </form>
      <button v-if="isResettable" class="clear" @click="reset">
        Reset
      </button>
      <button class="ok" @click="settingsOpened = false">
        OK
      </button>
    </div>
    <div class="dimension">
      {{ getAppDimension() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

$modal-bg: hsl(0, 0%, 25%);
$text: hsl(0, 0%, 80%);

.settings-view {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.2);
  backdrop-filter: brightness(0.5) blur(20px);
  -webkit-backdrop-filter: brightness(0.5) blur(20px); // Safari
  display: flex;
  place-content: center;
  place-items: center;
  font-size: 1.5em;

  h3 {
    text-align: center;
  }
  .modal {
    border-radius: 1em;
    padding: 1em;
    color: $text;
    background-color: $modal-bg;
    width: 80%;
    display: flex;
    flex-direction: column;
    form {
      margin: 1em 0;
      font-size: 1.25em;

      p {
        grid-column: 1 / -1;
        grid-row: 1 / 2;
      }
      input[type="radio"] {
        display: none;
      }
      input[type="radio"] + label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      input[type="radio"] + label:before {
        content: '';
        display: block;
        width: 0.75em;
        height: 0.75em;
        margin-right: 0.5em;
        border-radius: 50%;
        border: 4px solid $modal-bg;
        box-shadow: 0 0 0 2px $text;
      }
      input[type="radio"]:checked + label:before {
        background-color: $text;
      }
    }
    button {
      border: none;
      border-radius: 0.5em;
      margin-top: 1em;
      font-weight: bold;
      cursor: pointer;
    }
    button.clear {
      background-color: transparent;
      border: 2px solid transparentize($text, 0.5);
      color: $text
    }
    button.ok {
      background-color: hsl(0, 0%, 90%);
      color: hsl(0, 0%, 20%)
    }
  }
  .dimension {
    position: absolute;
    white-space: pre;
    color: darken($text, 20%);
    font-family: monospace;
    font-size: 0.9em;
    left: 2em;
    bottom: 2em;
  }
}
</style>
