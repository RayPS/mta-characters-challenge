import { computed, reactive, toRefs, watch } from 'vue'
import { Store, Mode } from '@/types.d'
import characters from '@/assets/characters'
import shuffle from 'lodash.shuffle'
import * as Tone from 'tone'

const vol = new Tone.Volume(-14).toDestination()
const synth = new Tone.Synth().connect(vol)

const store: Store = reactive({
  characters: characters.map(({ name, image }) => ({
    name,
    image,
    player: NaN,
    done: false,
    selected: false,
  })),
  settingsOpened: false,
  settings: {
    mode: Mode.Doubles,
  },
})

watch(() => store.settings.mode, () => {
  store.characters.forEach(c => { c.selected = false })
})

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export function useStore () {
  return {
    store: toRefs(store),
    actions: {
      toggleCharacter (name: string) {
        const character = store.characters.find(c => c.name === name)
        if (character) {
          character.done = !character.done
        }
      },
      async pick () {
        const pickableCharacters = store.characters.filter(c => !c.done)
        const amount = store.settings.mode === Mode.Doubles ? 2 : 1
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of new Array(pickableCharacters.length)) {
          synth.triggerAttackRelease('F4', 0.1)
          store.characters.forEach(c => { c.selected = false })
          shuffle(pickableCharacters).slice(0, amount).forEach((c, i) => {
            c.selected = true
            c.player = i + 1
          })
          await delay(100)
        }
      },
      reset () {
        store.settingsOpened = false
        setTimeout(() => {
          store.characters.forEach(c => {
            c.done = false
            c.selected = false
          })
        }, 100)
      },
    },
    getters: {
      isResettable: computed(() => store.characters.some(({ done }) => done)),
      isAllDone: computed(() => store.characters.every(({ done }) => done)),
    },
  }
}
