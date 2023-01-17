import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { RootState, AppDispatch} from '../../utils/types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch: () => AppDispatch = dispatchHook;
