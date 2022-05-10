import { useDispatch } from "react-redux";
import { DispatchType } from "store";

const useTypedDispatch = () => useDispatch<DispatchType>();

export default useTypedDispatch;