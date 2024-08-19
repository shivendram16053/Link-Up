"use client";

import React, { useState } from "react";
import HomeCards from "./HomeCards";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker"
import { Input } from "@/components/ui/input";
import { link } from "fs";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduling" | "isJoining" | "isNew" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const [values, setValues] = useState({
    dateTime: new Date(),
    Description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeet = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select date and time" });
      }
      const id = crypto.randomUUID();

      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create Call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.Description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.Description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: "meeting created " });
    } catch (err) {
      toast({
        title: "Failed to create",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCards
        title="New Meeting"
        description="Start a Meeting"
        img="/icons/add-meeting.svg"
        handleClick={() => setMeetingState("isNew")}
        className="bg-orange-1"
      />
      <HomeCards
        title="Join Meeting"
        description="Join Via Link"
        img="/icons/join-meeting.svg"
        handleClick={() => setMeetingState("isJoining")}
        className="bg-purple-1"
      />
      <HomeCards
        title="Schedule Meeting"
        description="Schedule a Meet"
        img="/icons/schedule.svg"
        handleClick={() => setMeetingState("isScheduling")}
        className="bg-blue-1"
      />
      <HomeCards
        title="View Recordings"
        description="CheckOut your meet records"
        img="/icons/recordings.svg"
        handleClick={() => router.push("/recordings")}
        className="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduling"}
          onClose={() => setMeetingState(undefined)}
          title="Create a Meet"
          handleClick={createMeet}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] test-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, Description: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5 ">
            <label className="text-base text-normal leading-[22px] test-sky-2">
              Select Date and Time
            </label>

            <ReactDatePicker
            selected={values.dateTime}
            onChange={(date)=>{
              setValues({...values,dateTime:date!})
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded bg-dark-2 p-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduling"}
          onClose={() => setMeetingState(undefined)}
          title="Meet Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({title:'Meeting Scheduled and Link Copied'})
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isNew"}
        onClose={() => setMeetingState(undefined)}
        title="Start a New Meet"
        className="text-center"
        buttonText="Start Meet"
        handleClick={createMeet}
      />
      <MeetingModal
        isOpen={meetingState === "isJoining"}
        onClose={() => setMeetingState(undefined)}
        title="Type The Link Here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=>{router.push(values.link)}}
      >
        <Input placeholder="Meeting Link" className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e)=>{
          setValues({...values,link: e.target.value})
        }}/>
      </MeetingModal>

    </section>
  );
};

export default MeetingTypeList;
