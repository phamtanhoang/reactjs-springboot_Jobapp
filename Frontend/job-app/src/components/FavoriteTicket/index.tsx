import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const FavoriteTicket = () => {
  return (
    <Link
      to={"/home/favorite"}
      className="fixed bottom-6 right-4 z-[999] cursor-pointer
     bg-orangetext text-4xl text-white w-16 h-16 flex items-center
      justify-center rounded-full animate-bounce"
    >
      <AiFillHeart />
    </Link>
  );
};
export default FavoriteTicket;
