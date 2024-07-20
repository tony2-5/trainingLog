'use client'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from 'react'
import { authOptions } from "@/lib/authOptions";
import { gql,useMutation, useQuery } from '@apollo/client';
import ModalOverlay from './DeleteModal';
import { GET_USER } from '@/graphql/queries';

const UPDATE_USERNAME = gql`
mutation Updateuser($updateuserId: ID!, $name: String) {
  updateuser(id: $updateuserId, name: $name) {
    id
    name
  }
}
`
const DELETE_USER = gql`
mutation Deleteaccount($deleteaccountId: ID!) {
  deleteaccount(id: $deleteaccountId) {
    id
  }
}
`
export default function ProfileForm({session}:any) {
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: {userId: session.user.id}
  });
  useEffect(() => { 
    refetch()
    if(data) {
      setUser(data.user.name)
    }
  }, [data])
  const [username, setUser] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [updateUsername, { data: dataUpdateUser, loading: loadingUpdateUser, error: errorUpdateUser, reset: resetUpdateUser }] = useMutation(UPDATE_USERNAME);
  const [deleteUser, { data: dataDeleteUser, loading: loadingDeleteUser, error: errorDeleteUser, reset: resetDeleteUser }] = useMutation(DELETE_USER);
  const onSubmitUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    updateUsername({ variables: { updateuserId: session.user.id, name: username }});
  }
  const onSubmitDeleteUser = (e: React.FormEvent) => {

    e.preventDefault()
    // const response = await signIn('credentials', {
    //   email: email,
    //   password: password,
    //   redirect: false,
    // })

    // if(response?.ok) {
    //   router.push("/dashboard");
    //   router.refresh()
    // } else {
    //   console.log(response?.error)
    //   toast("Credentials do not match!", { type: "error" });
    // }
  }
  return (
    <>
      {errorUpdateUser && toast("Username Update Error!", { type: "error" }) && resetUpdateUser()}
      {dataUpdateUser && toast("Username Update Success!", { type: 'success'}) && resetUpdateUser()}
      {loadingUpdateUser ? <div className="space-y-12 w-full sm:w-[400px] px-8 pb-8 pt-12">Updating Username...</div>:
      <>
      <form onSubmit={onSubmitUpdateUser} className="space-y-12 w-full sm:w-[400px] px-8 pb-8 pt-12">
        <div className="grid w-full items-center gap-1.5">
          {loading ? <Input
            isDisabled
            className="w-full"
            id="username"
            type="text"
            label="Username" 
            placeholder="Loading..."/> : <Input
            className="w-full"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            id="username"
            type="text"
            label="Username" 
            placeholder="Update Username"
          />}
        </div>
        <div className="w-full">
          <Button type='submit' className="w-full" size="md">
            Update Username
          </Button>
        </div>
      </form>
      <form onSubmit={onSubmitDeleteUser} className="space-y-12 w-full sm:w-[400px] px-8 pb-8 pt-12">
        <div className="grid w-full items-center gap-1.5">
          <Input
            className="w-full"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            id="oldPassword"
            type="password"
            label="Old Password" 
          />
          <Input
            className="w-full"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            id="newPassword"
            type="password"
            label="New Password" 
          />
        </div>
        <div className="w-full">
          <Button type='submit' className="w-full" size="md">
            Update Password
          </Button>
        </div>
      </form>
      <div className='px-8 pb-8 pt-12'>
        <ModalOverlay/>
      </div>
      </>
      }
    </>
  )
}