<template>
  <v-form>
    <v-text-field v-model="state.user" label="ニックネーム"></v-text-field>
    <v-btn color="info" depressed class="font-weight-bold" @click="startQuiz">
      はじめる
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
export default defineComponent({
  setup(_, { root }) {
    const state = reactive({
      user: '',
    })
    const startQuiz = () => {
      if (state.user !== '') {
        root.$router.push('/quiz')
      }
    }
    return {
      startQuiz,
      state,
    }
  },
})
</script>
