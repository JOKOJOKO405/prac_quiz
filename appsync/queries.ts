import { GraphQLResult } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'
import { listQuizs } from '~/src/graphql/queries'

// クイズの取得
export const listQuizs = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(listQuizs)
  )) as GraphQLResult<items>
  if (!data) throw new Error('データがありません')
  return data.items
}
