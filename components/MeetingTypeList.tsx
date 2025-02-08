"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingsState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstanMeeting" | undefined
  >();
  return (
    <section
      className="grid grid-col-1 gap-5
  md:grid-cols-2 xl:grid-col-4"
    >
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingsState("isJoiningMeeting")}
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
    </section>
  );
};

export default MeetingTypeList;
