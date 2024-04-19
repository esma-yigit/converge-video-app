import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call | undefined>(undefined);
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      // Ensure id is always an array
      const ids = Array.isArray(id) ? id : [id];
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id: {
            $in: ids, // Use the array of IDs here
          },
        },
      });
      if (calls.length > 0) setCall(calls[0]);
      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]); 

  return { call, isCallLoading };
};
