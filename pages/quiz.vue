<template>
  <v-row dense class="mx-auto my-12">
    <v-col cols="12" class="mb-10">
      <v-card class="pa-7">{{ state.question }}</v-card>
    </v-col>
    <v-col cols="12" class="mb-3">
      <v-btn color="primary" block class="text-left">
        {{ state.rightAnswer }}
      </v-btn>
    </v-col>
    <v-col cols="12" class="mb-3">
      <v-btn color="secondary" block class="text-left">{{
        state.wrongAnswer
      }}</v-btn>
    </v-col>
    <v-col cols="12">
      <v-btn color="accent" block class="text-left">{{
        state.wrongAnswer2
      }}</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { API, graphqlOperation } from 'aws-amplify'
import { listQuizs } from '@/src/graphql/queries'

type QandA = {
  question: string
  rightAnswer: string
  wrongAnswers: string[]
}
export default defineComponent({
  setup() {
    const state = reactive({
      question: '',
      rightAnswer: '',
      wrongAnswer: '',
      wrongAnswer2: '',
    })
    const outputQuestions = async () => {
      try {
        // TODO ここ型定義する
        const quiz: any = await API.graphql(graphqlOperation(listQuizs))
        state.question = quiz.question
        state.rightAnswer = quiz.rightAnswer
        state.wrongAnswer = quiz.wrongAnswers[0]
        state.wrongAnswer2 = quiz.wrongAnswers[1]
      } catch (error) {
        console.error(error)
      }
    }
    return {
      outputQuestions,
      state,
    }
  },
})
</script>
