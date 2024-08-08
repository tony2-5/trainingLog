import { gql } from "@apollo/client";

export const GET_USER = gql`
query Query($userId: ID!) {
  user(id: $userId) {
    email
    name
  }
}
`