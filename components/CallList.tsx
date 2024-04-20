//@ts-ignore

"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import MeetingCard from "./MeetingCard";
import { useEffect, useState } from "react";
import { toast, useToast } from "./ui/use-toast";
import Loader from "./Loader";

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { callRecordings, endedCalls, upcomingCalls, loading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "upcoming":
        return "No upcoming calls";
      case "ended":
        return "No ended calls";
      case "recordings":
        return "No recordings";
      default:
        return "";
    }
  };
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        toast({
          title: "Try again later",
        });
      }
    };
    if (type === "recordings") {
      fetchRecordings();
    }
  }, [callRecordings, toast, type]);
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <div key={(meeting as Call).id}>
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              primaryButtonText={type === "recordings" ? "Play" : "Start"}
              secondaryButtonText="Copy Invitation"
              handleClick={() => {
                if (type === "recordings" && "url" in meeting) {
                  router.push(`${meeting.url}`);
                } else if ("id" in meeting) {
                  router.push(`/meeting/${meeting.id}`);
                }
              }}
              title={
                (meeting as Call).state?.custom.description.substring(0, 26) ||
                "No description"
              }
              date={
                (meeting as Call)?.state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time.toLocaleString()
              }
              isPreviousMeeting={type === "ended"}
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              link={
                type == "recordings"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
            />
          </div>
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
