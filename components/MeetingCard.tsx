import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { AVATAR_IMAGES } from "@/constants";

interface MeetingCardProps {
  icon: string;
  primaryButtonText?: string;
  primaryClassname?: string;
  secondaryButtonText: string;
  handleClick: () => void;
  isPreviousMeeting: boolean;
  title: string;
  date: string;
  buttonIcon1?: string;
  link?: string;
}
const MeetingCard = ({
  icon,
  primaryButtonText,
  secondaryButtonText,
  handleClick,
  title,
  date,
  primaryClassname,
  isPreviousMeeting,
  buttonIcon1,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[254px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        {
          <Image
            src={icon}
            className="aspect-square text-white"
            alt={title}
            width={28}
            height={28}
          />
        }
        <div className="flex w-full relative">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl font-bold tracking-tighter text-ellipsis text-slate-50 max-md:max-w-full">
              {title}
            </h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-between relative ", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {AVATAR_IMAGES.map((image, index) => (
            <div key={image}>
              <Image
                src={image}
                alt="avatar"
                width={28}
                height={28}
                className={cn("rounded-full", { absolute: index > 0 })}
                style={{ top: 0, left: index * 28 }}
              />
            </div>
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className={cn(
                "focus-visible:ring-0 focus-visible:ring-offset-0 bg-blue-1",
                primaryClassname
              )}
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp;
              {primaryButtonText}
            </Button>

            <Button
              onClick={handleClick}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-blue-1"
            >
              {secondaryButtonText}
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
