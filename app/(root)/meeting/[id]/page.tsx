'use client';

import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import MeetingSetup from '../../../../components/MeetingSetup';
import MeetingRoom from '../../../../components/MeetingRoom';
import { useGetCallbyId } from '../../../../hooks/useGetCallbyId';
import Loader from '../../../../components/Loader';

const Meeting = ({params:{id}}:{params:{id:string}}) => {

  const {user,isLoaded} = useUser();

  const {call,isCallLoading} = useGetCallbyId(id);

  if(!isLoaded || !isCallLoading) return <Loader/>


  const [isSetUpComplete,setIsSetUpComplete] = useState(false);
  return (
    <main className='w-full h-screen'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetUpComplete?(
              <MeetingSetup/>
            ):(
              <MeetingRoom/>
            )
          }

        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
