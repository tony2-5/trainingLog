import { gql } from "@apollo/client";

// USER QUERIES
export const GET_USER = gql`
query User($userId: ID!) {
  user(id: $userId) {
    email
    name
  }
}
`
// MILEAGE QUERIES
export const GET_USERMILES = gql`
query userMiles($userMilesId: ID!) {
  userMiles(id: $userMilesId) {
    user {
      id
    }
    miles
    date
    completed
  }
}
`
export const GET_USERMILES_DATES = gql`
query UserMilesDates($userMilesDatesId: ID!, $dates: [String!]) {
  userMilesDates(id: $userMilesDatesId, dates: $dates) {
    user {
      id
    }
    miles
    date
    completed
  }
}
`
export const GET_USERMILE = gql`
query userMile($date: String!, $userMileId: ID!) {
  userMile(date: $date, id: $userMileId) {
    user {
      id
    }
    miles
    date
    completed
  }
}
`
