const initialState = {
  collections: {},
  bullets: {}
};

// Source: https://medium.com/@ArolDev/a-redux-state-organization-proposal-a93f3d79a6d2
export default function entitiesReducer(state = initialState, action) {
  if (!action.entities) return state;

  return {
    ...state,
    collections: { ...state.collections, ...action.entities.collections },
    bullets: { ...state.bullets, ...action.entities.bullets }
  };
}
