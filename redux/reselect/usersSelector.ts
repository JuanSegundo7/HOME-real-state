import { createSelector } from "reselect";
import { RootState } from "../stores";

const selectUsers = (state: RootState) => state.users;

export const selectUsersData = createSelector(
    [selectUsers],
    (users) => users
);