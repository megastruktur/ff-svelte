import { writable } from "svelte/store"
import { Collections, type CharactersResponse } from "./pocketbase-types.d";
import type { Field } from "./types";
import { addCharacterField, removeCharacterField, updateCharacterField, updateCharacterFieldValue } from "$lib/characterFieldsOperations";


function createCharacterStore() {

  const { subscribe, set, update } = writable<CharactersResponse>();

  function setFieldValue(fieldId: string, fieldValue: string) {
    update((character) => {
      return updateCharacterFieldValue(character, fieldId, fieldValue)
    })
  }

  function setField(field: Field) {
    update((character) => {
      return updateCharacterField(character, field)
    })
  }

  function rename(name: string) {
    update((character) => {
      character.name = name
      return character
    })
  }

  function addField(field: Field) {
    update((character) => {
      console.log(`Adding field ${field.name} to character ${character.name}`)
      return addCharacterField(character, field)
    })
  }

  function removeField(field: Field) {
    update((character) => {
      console.log(`Removing field ${field.name} from character ${character.name}`)
      return removeCharacterField(character, field)
    })
  }

  function setAvatar(avatar: string) {
    update((character) => {
      character.avatar = avatar
      return character
    })
  }

  return {
    subscribe,
    setFieldValue,
    rename,
    setField,
    addField,
    removeField,
    setAvatar,
    set: (character: CharactersResponse) => set(character),
    reset: () => set({
      name: "",
      rpgSystem: "",
      campaign: "",
      avatar: "",
      creator: "",
      fields: [],
      hash: "",
      id: "",
      created: "",
      updated: "",
      collectionId: "",
      collectionName: Collections.Characters,
      expand: {
        rpgSystem: undefined
      }
    })
  };
}

export const characterStore = createCharacterStore();

export const editMode = writable(false);
