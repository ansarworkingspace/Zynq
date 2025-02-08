"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingsState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstanMeeting" | undefined
  >();

  const createMeeting = () => {

    

  };

  return (
    <section
      className="grid grid-cols-1 gap-5
  md:grid-cols-2 xl:grid-cols-4"
    >
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingsState("isInstanMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingsState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Checkout your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingsState("isJoiningMeeting")}
        className="bg-yellow-1"
      />

      <MeetingModel
        isOpen={meetingState === "isInstanMeeting"}
        onClose={() => setMeetingsState(undefined)}
        title="Start and Instant Meeting"
        className="text-center"
        buttonText="Start meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
