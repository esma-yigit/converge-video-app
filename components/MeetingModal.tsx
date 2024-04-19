import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  handleClick: () => void;
  children?: React.ReactNode;
  img: string;
  buttonIcon: string;
  className: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  handleClick,
  children,
  className,
  img,
  buttonIcon,
  buttonText,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6 ">
          {img && (
            <div>
              <Image src={img} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-2xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            onClick={handleClick}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-blue-1"
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                className="mr-2"
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
