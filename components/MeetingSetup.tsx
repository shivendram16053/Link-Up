"use client";

import { CallingState, DeviceSettings, useCall, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

const MeetingSetup = ({setIsSetUpComplete}:{setIsSetUpComplete:(value:boolean)=>void}) => {
  const [isMicCamOn, setIsMicCamOn] = useState(false);
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.LEFT || callingState === CallingState.OFFLINE) {
      setIsMicCamOn(false)
    }
  }, [callingState]);

  useEffect(() => {
    if (!call) {
      console.error("Call object is not initialized");
      return;
    }

    const camera = call.camera;
    const microphone = call.microphone;

    if (!camera || !microphone) {
      console.error("Camera or Microphone not available");
      return;
    }

    if (isMicCamOn) {
      camera
        .disable()
        .catch((err) => console.error("Failed to disable camera:", err));
      microphone
        .disable()
        .catch((err) => console.error("Failed to disable microphone:", err));
    } else {
      camera
        .enable()
        .catch((err) => console.error("Failed to enable camera:", err));
      microphone
        .enable()
        .catch((err) => console.error("Failed to enable microphone:", err));
    }
  }, [isMicCamOn, call]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-semibold">SetUp</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamOn}
            onChange={(e) => setIsMicCamOn(e.target.checked)}
          />
          Join with Mic and Camera OFF
        </label>
        <DeviceSettings/>
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={()=>{call?.join(); setIsSetUpComplete(true)}}>
       Join The meet
      </Button>
    </div>
  );
};

export default MeetingSetup;
