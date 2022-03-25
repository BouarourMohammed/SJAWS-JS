import { useSelector } from "react-redux";

const useAppSelector = useSelector;

export const useProfile = () => {
  const user = useAppSelector((state) => state?.profileSlice?.user);
  return { user };
};
