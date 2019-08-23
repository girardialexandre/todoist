const initialState = {
    activities: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestActivities: () => async (dispatch, getState) => {

        const url = 'api/Activity/Activities';
        const response = await fetch(url);
        const activities = await response.json();
        dispatch({ type: 'FETCH_ACTIVITIES', activities });
    },
    saveActivity: activity => async (dispatch, getState) => {

        const url = 'api/Activity/SaveActivity';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(activity)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_ACTIVITY', activity });
    },
    deleteActivity: activityId => async (dispatch, getState) => {
        const url = 'api/Activity/DeleteActivity/' + activityId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_ACTIVITY', activityId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_ACTIVITIES': {
            return {
                ...state,
                activities: action.activities,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_ACTIVITY': {
            return {
                ...state,
                activities: Object.assign({}, action.activity),
                forceReload: true
            }
        }
        case 'DELETE_ACTIVITY': {
            return {
                ...state,
                activityId: action.activityId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};