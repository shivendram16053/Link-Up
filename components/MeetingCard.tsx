"use client";

import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { useToast } from "@/components/ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title = "No Title",
  date = "No Date",
  isPreviousMeeting = false,
  buttonIcon1,
  handleClick,
  link = "#",
  buttonText = "Click",
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[150px] w-full justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[530px]">
      <article className="flex flex-col gap-2">
        <Image src={icon} alt="icon" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("relative", {})}>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="copy"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
