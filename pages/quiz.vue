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
      <v-btn
        class="pa-6 text-capitalize font-weight-bold"
        :color="state.colors[index]"
        block
        @click.prevent="checkAnswer($event)"
      >
        {{ answer }}
      </v-btn>
    </v-col>
    <v-col v-if="state.isCorrect">
      {{ state.judgement }}
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
  judgement: string
  isCorrect: boolean
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
      judgement: '',
      isCorrect: false,
    })
    const outputQuestions = async () => {
      try {
        // TODO ここ型定義する
        const quiz: any = await API.graphql(graphqlOperation(listQuizs))
        const data = quiz.data.listQuizs.items
        console.debug(data)

        const index = shuffleQuestion(data)
        state.question = data[index].question
        // TODO アンサーを配列に詰め直してシャッフルする
        state.rightAnswer = data[index].rightAnswer
        state.wrongAnswer = data[index].wrongAnswers[0]
        state.wrongAnswer2 = data[index].wrongAnswers[1]
        // TODO これをシャッフルしたい
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

    const checkAnswer = (event: any) => {
      state.isCorrect = true
      console.debug(state.rightAnswer)
      const data = event.target.innerText
      console.debug(data)
      if (data === state.rightAnswer) {
        state.judgement = '正解'
      } else {
        state.judgement = '不正解'
      }

      setTimeout(() => {
        refresh()
        outputQuestions()
      }, 1000)
    }

    const refresh = () => {
      state.allAnswers = []
      state.question = ''
      state.isCorrect = false
    }

    // TODO anyの型定義
    const shuffleQuestion = (data: any) => {
      const randIndex = Math.floor(Math.random() * data.length)
      return randIndex
    }

    onMounted(() => {
      outputQuestions()
    })
    return {
      outputQuestions,
      checkAnswer,
      state,
    }
  },
})
</script>
