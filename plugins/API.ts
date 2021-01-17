import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { getlistQuizs } from '@/appsync/queries'

// 各インスタンスにタイプを定義
// TODO これなに？
declare module 'vue/types/vue' {
  interface Vue {
    $API: Apis
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $API: Apis
  }
}

// Apisの型
interface Apis {
  listQuizs: typeof getlistQuizs
}

export default defineNuxtPlugin((_, inject) => {
  const client = async (func: (arg?: any) => Promise<any>, arg?: any) => {
    try {
      const data = arg ? await func(arg) : await func()
      return data
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  inject('API', {
    listQuizs: () => client(getlistQuizs),
  })
})
