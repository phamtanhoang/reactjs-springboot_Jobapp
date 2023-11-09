import { format } from "date-fns";

const formattedDate = (dateString: string) => {
  const parsedDate = new Date(dateString);
  return format(parsedDate, "yyyy-MM-dd");
};

export default formattedDate;
