import { createSelector } from 'reselect'

export const selectProfile = (state: any) => state.profile;

export const selectProfileAuth = createSelector(
    selectProfile,
    (profile: any) => profile.authenticate,
)