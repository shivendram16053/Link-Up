"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import MeetingSetup from "../../../../components/MeetingSetup";
import MeetingRoom from "../../../../components/MeetingRoom";
import { useGetCallbyId } from "../../../../hooks/useGetCallbyId";
import Loader from "../../../../components/Loader";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { call, isCallLoading } = useGetCallbyId(id);

  const [isSetUpComplete, setIsSetUpComplete] = useState(false);

  // Ensure user and call are both loaded and valid
  if (!isUserLoaded || isCallLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Error: User is not authenticated.</div>;
  }

  return (
    <main className="w-full h-screen">
      {call ? (
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetUpComplete ? <MeetingSetup setIsSetUpComplete = {setIsSetUpComplete} /> : <MeetingRoom />}
          </StreamTheme>
        </StreamCall>
      ) : (
        <div>Error: Call not found.</div>
      )}
    </main>
  );
};

export default Meeting;
