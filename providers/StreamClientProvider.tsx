"use client";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API key not found");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setClient(client);
  }, [user, isLoaded]);
  if (!client) return <Loader />;

  return <StreamVideo client={client}>{children}</StreamVideo>;
};
export default StreamClientProvider;
