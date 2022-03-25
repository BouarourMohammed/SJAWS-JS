import { useSelector } from "react-redux";

const useAppSelector = useSelector;

export const useNavState = () => {
  const nav = useAppSelector((state) => state?.alertSlice?.navigation);
  return { nav };
};
