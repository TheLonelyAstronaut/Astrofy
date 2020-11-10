import { createAction } from 'typesafe-redux-helpers';
import { ItemType } from "../../types/types";

export const FETCH_CATEGORIES = {
	TRIGGER: createAction('[Auth Login] Trigger'),
	STARTED: createAction('[Auth Login] Started'),
	COMPLETED: createAction('[Auth Login] Completed', (payload: ItemType[]) => payload),
}
