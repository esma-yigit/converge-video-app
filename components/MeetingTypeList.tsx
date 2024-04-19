"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeting" | "isInstantMeeting" | undefined
  >();
  const createMeeting = () => {
    console.log("create meeting");
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start and instant meeting"
        handleClick={() => router.push("/recordings")}
        className="bg-green-1"
      />
      <HomeCard
        img="/icons/add-personal.svg"
        title="Join Meeting"
        description="Join a meeting with a code"
        handleClick={() => setMeetingState("isJoiningMeting")}
        className="bg-yellow-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Schedule a meeting for later"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="Meeting History"
        description="View your past and upcoming meetings"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-yellow-2"
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        img={""}
        buttonIcon={""}
      />
    </section>
  );
};
export default MeetingTypeList;
