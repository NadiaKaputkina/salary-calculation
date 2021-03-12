import { createSelector } from 'reselect';
import { SnackInterface } from "./snackReducer";

export const selectSnack = (state: any): SnackInterface => state.snack;

export const selectOpen = createSelector(
    selectSnack,
    (snack: SnackInterface): boolean => snack.open,
)