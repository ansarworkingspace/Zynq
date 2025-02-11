"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { Copy, Link2, Users, Video } from "lucide-react";

const InfoCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-lg transition-all hover:shadow-xl">
    <div className="mb-4 flex items-center gap-3">
      <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-dark-2 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            Welcome to Your Personal Room
          </h1>
          <p className="text-lg text-gray-400">
            Start a meeting or share your room details with others
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            title="Room Owner"
            description={`${user?.username}'s Personal Meeting Space`}
            icon={<Users className="h-6 w-6" />}
          />
          <InfoCard
            title="Meeting ID"
            description={meetingId || "Loading..."}
            icon={<Link2 className="h-6 w-6" />}
          />
          <InfoCard
            title="Quick Join"
            description="Share the meeting link with your participants"
            icon={<Video className="h-6 w-6" />}
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-xl rounded-lg bg-gray-800/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Meeting Link</span>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`https://${meetingLink}`);
                  toast({
                    title: "Link copied to clipboard",
                    description: "You can now share it with others",
                  });
                }}
                variant="ghost"
                className="hover:bg-gray-700 text-white"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
            <p className="mt-2 truncate rounded bg-gray-900 p-2 text-sm text-gray-300">
              https://{meetingLink}
            </p>
          </div>

          <Button
            onClick={startRoom}
            className="group relative h-12 overflow-hidden rounded-lg bg-blue-1 px-8 py-2 transition-all hover:bg-blue-700"
          >
            <span className="relative flex items-center gap-2 text-lg font-medium text-white">
              <Video className="h-5 w-5" />
              Start Meeting Now
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalRoom;
