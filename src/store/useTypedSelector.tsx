import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from 'store/index'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;