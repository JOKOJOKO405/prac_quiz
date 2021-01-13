<template>
  <v-form ref="form" lazy-validation cols="12">
    <v-text-field v-model="state.question" label="問題" required></v-text-field>
    <v-text-field
      v-model="state.rightAnswer"
      label="正解"
      required
    ></v-text-field>
    <v-text-field
      v-model="state.wrongAnswer"
      label="不正解1"
      required
    ></v-text-field>
    <v-text-field
      v-model="state.wrongAnswer2"
      label="不正解2"
      required
    ></v-text-field>
    <v-btn depressed color="info" @click.prevent="registQuiz">登録する</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { API, graphqlOperation } from 'aws-amplify'
import { createQuiz } from '@/src/graphql/mutations'

type QandA = {
  user: any
  question: string
  rightAnswer: string
  wrongAnswer: string
  wrongAnswer2: string
}

export default defineComponent({
  setup() {
    const state = reactive<QandA>({
      user: '',
      question: '',
      rightAnswer: '',
      wrongAnswer: '',
      wrongAnswer2: '',
    })
    const registQuiz = async () => {
      console.debug('run')
      const questions = {
        question: state.question,
        rightAnswer: state.rightAnswer,
        wrongAnswers: [state.wrongAnswer, state.wrongAnswer2],
      }
      try {
        const data = await API.graphql(
          graphqlOperation(createQuiz, { input: questions })
        )
        console.debug(data)
      } catch (e) {
        console.error(e)
      }
      state.question = ''
      state.rightAnswer = ''
      state.wrongAnswer = ''
      state.wrongAnswer2 = ''
    }

    return {
      registQuiz,
      state,
    }
  },
})
</script>
