//@ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useGetCalls } from "../hooks/useGetCall";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recording, setRecording] = useState<CallRecording[]>([]);
  const router = useRouter();
  const {toast} = useToast();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recording;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCalls = () => {
    switch (type) {
      case "ended":
        return "No previous meetings";
      case "recordings":
        return "No recordings";
      case "upcoming":
        return "No upcoming meetings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        for (const meeting of callRecordings) {
          await new Promise((resolve) => setTimeout(resolve, 10));
          const callData = await meeting.queryRecordings();
          if (callData.recordings.length > 0) {
            setRecording((prev) => [...prev, ...callData.recordings]);
          }
        }
      } catch (error) {
        toast({title:"Try again later"})
      }
    };
  
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCalls = getNoCalls();

  if (isLoading) return <Loader/>;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording)?.filename?.substring(0, 15) ||
              "Personal Meeting"
            }
            date={
              (meeting as Call)?.state?.startsAt?.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }) ||
              new Date((meeting as CallRecording)?.start_time).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) + ' ' +
              new Date((meeting as CallRecording)?.start_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })
            }
            
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${(meeting as Call)?.id}`)
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call)?.id}`
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
          />
        ))
      ) : (
        <h1>{noCalls}</h1>
      )}
    </div>
  );
};

export default CallList;
