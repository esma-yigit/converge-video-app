"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallByIds";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  if (isCallLoading || !isLoaded) return <Loader />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup setSetupComplete={setSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
