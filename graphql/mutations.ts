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
/*
{
  "date": selectInfo.start.toISOString(),
  "addmileagegoalId": get users id,
  "miles": "1"
}
*/
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
/*
{
  "date": "2024-08-22T04:00:00.000Z",
  "deletemileagegoalId": "cm05pbd1m0000k1bqb3dzuif3"
}
 */
export const DELETE_MILEAGE = gql`
mutation Deletemileagegoal($date: String!, $deletemileagegoalId: ID!) {
  deletemileagegoal(date: $date, id: $deletemileagegoalId) {
    user {
      id
    }
  }
}
`
/* 
{
  "date": "2024-08-23T00:00:00.000Z",
  "updatemileagegoalId": "cm05pbd1m0000k1bqb3dzuif3",
  "miles": "3"
}
*/
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