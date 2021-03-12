import { createSelector } from 'reselect'

export const selectSnack = (state: any) => state.error;

export const selectSnackMessage = createSelector(
    selectSnack,
    (error: any) => error.message,
)