"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";

const MeetingTypeList = () => {

  const [meetingState, setMeetingsState] = useState()
  return (
    <section
      className="grid grid-col-1 gap-5
  md:grid-cols-2 xl:grid-col-4"
    >
      <HomeCard img="/icons/add-meeting.svg" title="New Meeting"
      description="Start an instant meeting" handleClick={}/>
      <HomeCard />
      <HomeCard />
      <HomeCard />
    </section>
  );
};

export default MeetingTypeList;
