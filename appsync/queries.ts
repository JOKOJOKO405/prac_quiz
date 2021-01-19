import { GraphQLResult } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'
import { listQuizs } from '~/src/graphql/queries'

// クイズの取得
// 同じクエリ名だとエラーになる
export const listQuizsGql = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(listQuizs)
  )) as GraphQLResult<listQuizs>
  if (!data) throw new Error('データがありません')
  return data.listQuizs.items
}
