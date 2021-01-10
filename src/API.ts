/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuizInput = {
  id?: string | null,
  question: string,
  rightAnswer?: string | null,
  wrongAnswers?: Array< string | null > | null,
};

export type ModelQuizConditionInput = {
  question?: ModelStringInput | null,
  rightAnswer?: ModelStringInput | null,
  wrongAnswers?: ModelStringInput | null,
  and?: Array< ModelQuizConditionInput | null > | null,
  or?: Array< ModelQuizConditionInput | null > | null,
  not?: ModelQuizConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateQuizInput = {
  id: string,
  question?: string | null,
  rightAnswer?: string | null,
  wrongAnswers?: Array< string | null > | null,
};

export type DeleteQuizInput = {
  id?: string | null,
};

export type ModelQuizFilterInput = {
  id?: ModelIDInput | null,
  question?: ModelStringInput | null,
  rightAnswer?: ModelStringInput | null,
  wrongAnswers?: ModelStringInput | null,
  and?: Array< ModelQuizFilterInput | null > | null,
  or?: Array< ModelQuizFilterInput | null > | null,
  not?: ModelQuizFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateQuizMutationVariables = {
  input: CreateQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type CreateQuizMutation = {
  createQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuizMutationVariables = {
  input: UpdateQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type UpdateQuizMutation = {
  updateQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuizMutationVariables = {
  input: DeleteQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type DeleteQuizMutation = {
  deleteQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetQuizQueryVariables = {
  id: string,
};

export type GetQuizQuery = {
  getQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuizsQueryVariables = {
  filter?: ModelQuizFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizsQuery = {
  listQuizs:  {
    __typename: "ModelQuizConnection",
    items:  Array< {
      __typename: "Quiz",
      id: string,
      question: string,
      rightAnswer: string | null,
      wrongAnswers: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateQuizSubscription = {
  onCreateQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuizSubscription = {
  onUpdateQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuizSubscription = {
  onDeleteQuiz:  {
    __typename: "Quiz",
    id: string,
    question: string,
    rightAnswer: string | null,
    wrongAnswers: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
