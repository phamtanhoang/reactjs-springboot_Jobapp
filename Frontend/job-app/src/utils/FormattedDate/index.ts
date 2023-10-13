const formattedDate = (dateString: string) => {
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = parsedDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default formattedDate;
