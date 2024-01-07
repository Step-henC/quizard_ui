import { gql } from "@apollo/client";

export const GET_AUTH = gql`
  query {
    getAuth
  }
`;

export const GET_QUIZZES = gql`
  query Quizzes($email: String!) {
    quizzes(email: $email) {
      userId
      id
      name
      responses {
        correct
        notes
      }
    }
  }
`;

export const UPSERT_QUIZ = gql`
  mutation CreateQuiz($input: SavedQuizInput!) {
    createQuiz(input: $input) {
      userId
      id
      name
      id
      responses {
        correct
        notes
      }
    }
  }
`;

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz($input: SavedQuizInput!) {
    deleteQuiz(input: $input) {
      userId
      id
      name
      id
      responses {
        correct
        notes
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      email
      password
    }
  }
`;
