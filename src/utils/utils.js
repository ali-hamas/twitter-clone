import toast from "react-hot-toast";

export const copyLink = (link) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`http://localhost:5173${link}`).then(() => toast.success("Copied to clipboard"));
  } else {
    toast.error("No clipboard supported");
  }
};
