import { BsFillChatDotsFill } from "react-icons/bs";

export const SupportTicket = () => {
  return (
    <div
      className="fixed bottom-5 right-4 z-[999] cursor-pointer
     bg-orangetext text-4xl text-white w-16 h-16 flex items-center
      justify-center rounded-full animate-bounce" 
    >
      <BsFillChatDotsFill />
    </div>
  );
};
