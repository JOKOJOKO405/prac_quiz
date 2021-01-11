<template>
  <v-row dense class="mx-auto my-12">
    <v-col cols="12" class="mb-10">
      <v-card class="pa-7">{{ state.question }}</v-card>
    </v-col>
    <v-col
      v-for="(answer, index) in state.allAnswers"
      :key="index"
      cols="12"
      class="mb-3"
    >
      <v-btn :color="state.colors[index]" block class="pa-6">
        {{ answer }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { API, graphqlOperation } from 'aws-amplify'
import { listQuizs } from '@/src/graphql/queries'

type QandA = {
  question: string
  rightAnswer: string
  wrongAnswer: string
  wrongAnswer2: string
  allAnswers: string[]
  colors: string[]
}
export default defineComponent({
  setup() {
    const state = reactive<QandA>({
      question: '',
      rightAnswer: '',
      wrongAnswer: '',
      wrongAnswer2: '',
      allAnswers: [],
      colors: ['primary', 'secondary', 'accent'],
    })
    const outputQuestions = async () => {
      try {
        // TODO ここ型定義する
        const quiz: any = await API.graphql(graphqlOperation(listQuizs))
        const data = quiz.data.listQuizs.items
        console.debug(data)
        state.question = data[0].question
        // TODO アンサーを配列に詰め直してシャッフルする
        state.rightAnswer = data[0].rightAnswer
        state.wrongAnswer = data[0].wrongAnswers[0]
        state.wrongAnswer2 = data[0].wrongAnswers[1]
        state.allAnswers.push(
          state.rightAnswer,
          state.wrongAnswer,
          state.wrongAnswer2
        )
        console.debug(state.allAnswers)
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(() => {
      outputQuestions()
    })
    return {
      outputQuestions,
      state,
    }
  },
})
</script>
