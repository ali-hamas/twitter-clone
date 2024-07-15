import { format } from "date-fns";

const useDate = ($createdAt, type) => {
  if (type === "short") {
    const currentYear = new Date().getFullYear();
    const tweetYear = parseInt($createdAt.slice(0, 4));
    if (currentYear === tweetYear) {
      return format($createdAt, "dd MMM");
    }
    return format($createdAt, "dd MMM YYYY");
  } else {
    return format($createdAt, "h:mm a · dd MMMM yyyy");
  }
};

export default useDate;
