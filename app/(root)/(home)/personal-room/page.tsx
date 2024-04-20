"use client";
import { useUser } from "@clerk/nextjs";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
      <h1 className="text-base font-medium text-sky-50 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser();
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">PersonalRoom</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.fullName}'s Meeting Room`} />
      </div>
    </section>
  );
};

export default PersonalRoom;
