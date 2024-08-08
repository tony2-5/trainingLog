import { gql } from "@apollo/client"

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