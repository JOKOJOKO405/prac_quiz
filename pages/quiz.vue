<template>
  <v-container v-if="!$fetchState.pending">
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, useFetch } from '@nuxtjs/composition-api'

type QandA = {
  question: string
  rightAnswer: string
  allAnswers: string[]
  colors: string[]
  judgement: string
  isCorrect: boolean
}
export default defineComponent({
  setup(_, { root }) {
    const state = reactive<QandA>({
      question: '',
      rightAnswer: '',
      allAnswers: [],
      colors: ['primary', 'secondary', 'accent'],
      judgement: '',
      isCorrect: false,
    })

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

    // シャッフルするためのインデックス番号取得
    // TODO anyの型定義
    const shuffleQuestion = (data: any) => {
      const randIndex = Math.floor(Math.random() * data.length)
      return randIndex
    }

    const outputQuestions = async () => {
      try {
        const quiz = await root.$API.listQuizs()
        console.debug(quiz)
        const index = shuffleQuestion(quiz)
        state.question = quiz[index].question
        state.rightAnswer = quiz[index].rightAnswer
        state.allAnswers.push(state.rightAnswer, ...quiz[index].wrongAnswers)
        console.debug('こたえ' + state.allAnswers)

        for (let i = state.allAnswers.length - 1; i >= 0; i--) {
          const randomNumber = Math.floor(Math.random() * (i + 1))
          ;[state.allAnswers[i], state.allAnswers[randomNumber]] = [
            state.allAnswers[randomNumber],
            state.allAnswers[i],
          ]
        }
      } catch (e) {
        console.error(e)
      }
    }

    const { fetch } = useFetch(async () => {
      await outputQuestions()
    })

    return {
      outputQuestions,
      checkAnswer,
      state,
    }
  },
})
</script>
