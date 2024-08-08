'use client'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USERNAME, UPDATE_PASS } from '@/graphql/mutations'
import ModalOverlay from './DeleteModal';
import { GET_USER } from '@/graphql/queries';

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
  const [updatePass, { data: dataUpdatePass, loading: loadingUpdatePass, error: errorUpdatePass, reset: resetUpdatePass }] = useMutation(UPDATE_PASS);
  const onSubmitUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    updateUsername({ variables: { updateuserId: session.user.id, name: username }});
  }
  
  const onSubmitUpdatePass = (e: React.FormEvent) => {
    e.preventDefault()
    updatePass({ variables: { updatepasswordId: session.user.id, passwordOld: oldPass, passwordNew: newPass }});
    setOldPass('')
    setNewPass('')
  }
  // TODO: possibly add case when username is being updated to what it already is
  return (
    <>
      {errorUpdateUser && toast("Username Update Error!", { type: "error" }) && resetUpdateUser()}
      {dataUpdateUser && toast("Username Update Success!", { type: 'success'}) && resetUpdateUser()}
      {errorUpdatePass && toast("Password Update Error!", { type: "error" }) && resetUpdatePass()}
      {dataUpdatePass && toast("Password Update Success!", { type: 'success'}) && resetUpdatePass()}
      <>
      <form onSubmit={onSubmitUpdateUser} className="space-y-12 w-full sm:w-[400px] px-8 pb-8 pt-12">
        <div className="grid w-full items-center gap-1.5">
          { /* loading for waiting for use query to go through after update username mutation */ 
          loading || loadingUpdateUser ?
            <Input
            isDisabled
            className="w-full"
            id="username"
            type="text"
            label="Username" 
            placeholder="Loading..."
            />
            :
            <Input
            isDisabled={loadingUpdatePass ? true: false}
            className="w-full"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            id="username"
            type="text"
            label="Username" 
            placeholder="Update Username"
            />
          }
        </div>
        <div className="w-full">
          <Button 
          isDisabled={loading || loadingUpdatePass || loadingUpdateUser ? true:false} 
          type='submit' 
          className="w-full" 
          size="md">
            Update Username
          </Button>
        </div>
      </form>
      <form onSubmit={onSubmitUpdatePass} className="space-y-12 w-full sm:w-[400px] px-8 pb-8 pt-12">
        <div className="grid w-full items-center gap-1.5">
          <Input
            isDisabled={loadingUpdatePass ? true:false}
            className="w-full"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            id="oldPassword"
            type="password"
            label="Old Password" 
          />
          <Input
            isDisabled={loadingUpdatePass ? true:false}
            className="w-full"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            id="newPassword"
            type="password"
            label="New Password" 
          />
        </div>
        <div className="w-full">
        <Button 
        isDisabled={loading || loadingUpdatePass || loadingUpdateUser ? true:false} 
        type='submit' 
        className="w-full" 
        size="md">
            Update Password
        </Button>
        </div>
      </form>
      <div className='px-8 pb-8 pt-12'>
        <ModalOverlay session={session} disabled={loading || loadingUpdatePass || loadingUpdateUser ? true:false} />
      </div>
      </>
    </>
  )
}