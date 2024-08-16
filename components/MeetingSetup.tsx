'use client';

import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = () => {

    const [ isMicCamOn, setIsMicCamOn] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error(
          'useStreamCall must be used within a StreamCall component.',
        );
      }

    useEffect(()=>{

        if(isMicCamOn){
            call?.camera.disable();
            call?.microphone.disable();
        }else{
            call?.camera.enable();
            call?.microphone.enable();
            
        }

    },[isMicCamOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-semibold'>SetUp</h1>
      <VideoPreview />
    </div>
  )
}

export default MeetingSetup
