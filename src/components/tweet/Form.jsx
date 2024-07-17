import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts";
import { ProfileImage } from "../user";
import { Transition } from '@headlessui/react';
import { useEffect, useRef, useState } from "react";
import { EmojiIcon, GifIcon, MediaIcon } from "@/icons/FormIcons";
import { CalenderIcon, LocationIcon, GlobeIcon } from "@/icons/FormIcons";

const Form = ({ dialog }) => {
  const submitRef = useRef(null);
  const textAreaRef = useRef(null);
  const { user, newTweet } = useAuth();
  const maxLength = user.verified ? 500 : 300;
  const [formValue, setFormValue] = useState("");
  const remainingWords = maxLength - formValue.length;
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [formValue]);

  const handleSubmit = async () => {
    try {
      submitRef.current.classList.add("bg-accent");
      await newTweet(formValue);
      toast.success("Your tweet has been sent");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again");
    } finally {
      submitRef.current.classList.remove("bg-accent");
      setFormValue("");
    }
  };

  return (
    <>
      <div className="h-1 w-full animate-pulse" ref={submitRef} />
      <div className="border-b-border flex w-full gap-3 border-b p-2 md:px-4">
        <ProfileImage data={user} />
        <div className="w-full">
          <div className="border-b-border relative border-b">
            <textarea id="tweet-form" ref={textAreaRef} value={formValue}
              placeholder="What is happening?!" onChange={(e) => setFormValue(e.target.value)}
              className={`text-17/7 lg:text-20 w-full resize-none bg-transparent pb-9 outline-0 ${dialog && "min-h-36"}`}
            />
            <label htmlFor="tweet-form" className="transition-200 hover:bg-accent/20 absolute bottom-1.5 left-0 flex cursor-pointer items-center rounded-full px-2 py-1 bg-primaryBg">
              <GlobeIcon />
              <span className="text-accent text-13 ml-1.5 font-bold md:text-sm">Everyone can reply</span>
            </label>
          </div>
          <div className="mt-3 flex w-full items-center gap-1">
            <button tooltip="Media" className="form-btn" disabled>
              <MediaIcon />
            </button>
            <button tooltip="Gif" className="form-btn" disabled>
              <GifIcon />
            </button>
            <button tooltip="Emoji" className="form-btn" disabled>
              <EmojiIcon />
            </button>
            <button tooltip="Schedule" className="form-btn" disabled>
              <CalenderIcon />
            </button>
            <button tooltip="Location" className="form-btn" disabled>
              <LocationIcon />
            </button>
            <div className="ml-auto flex items-center gap-3">
              <Transition show={remainingWords <= 20}>
                <div
                  className={cn("transition duration-400 flex-center border-yellow text-yellow size-7 rounded-full border-2",
                    "data-[closed]:scale-50 data-[closed]:opacity-0",
                    {"border-red text-red size-7": remainingWords <= 0},
                    {"border-0": remainingWords < -9}
                  )}>
                  <span className="text-xs pointer-events-none">{remainingWords}</span>
                </div>
              </Transition>
              <button onClick={handleSubmit} className="btn accent-btn disabled" disabled={formValue.length === 0 || remainingWords < 0}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
