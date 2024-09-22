import { gql } from "@apollo/client"

// USER MUTATIONS
export const UPDATE_USERNAME = gql`
mutation Updateuser($updateuserId: ID!, $name: String) {
  updateuser(id: $updateuserId, name: $name) {
    id
    name
  }
}
`
export const UPDATE_PASS = gql`
mutation Mutation($updatepasswordId: ID!, $passwordOld: String, $passwordNew: String) {
  updatepassword(id: $updatepasswordId, passwordOld: $passwordOld, passwordNew: $passwordNew) {
    id
  }
}
`
export const DELETE_USER = gql`
mutation Deleteaccount($deleteaccountId: ID!) {
  deleteaccount(id: $deleteaccountId) {
    id
  }
}
`
// MILEAGE MUTATIONS
export const ADD_MILEAGE = gql`
mutation Mutation($date: String!, $miles: String!, $addmileagegoalId: ID!) {
  addmileagegoal(date: $date, miles: $miles, id: $addmileagegoalId) {
    user {
      id
    }
    miles
    date
  }
}
`
export const DELETE_MILEAGE = gql`
mutation Deletemileagegoal($date: String!, $deletemileagegoalId: ID!) {
  deletemileagegoal(date: $date, id: $deletemileagegoalId) {
    user {
      id
    }
  }
}
`
export const UPDATE_MILEAGE = gql`
mutation Updatemileagegoal($date: String!, $updatemileagegoalId: ID!, $miles: String!) {
  updatemileagegoal(date: $date, id: $updatemileagegoalId, miles: $miles) {
    user {
      id
    }
    miles
    date
  }
}
`
export const UPDATE_COMPLETED = gql`
mutation Mutation($date: String!, $setgoalcompleteId: ID!, $completed: Boolean!) {
  setgoalcomplete(date: $date, id: $setgoalcompleteId, completed: $completed) {
    user {
      id
    }
    date
    completed
  }
}
`
export const DELETE_USERMILEAGE = gql`
mutation Deleteusermileage($deleteusermileageId: ID!) {
  deleteusermileage(id: $deleteusermileageId) {
    count
  }
}
`