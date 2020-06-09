import * as actions from '../actions/clients';

const initialState = {
  loaded: false,
  inited: false,
  error: false,
  items: [],
};

export default function clients(state = initialState, action = {}) {
  
  switch (action.type) {
    case actions.REQUEST_CLIENTS:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_CLIENTS: {
      const items = action.payload || {};
      return {
        ...state,
        items: items,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_CLIENTS:
      return {
        ...state,
        loaded: true,
        error: true,
      };

    case actions.REQUEST_SAVE_CLIENT:
      return {
        ...state,
        loaded: false,
        error: false,
      };

    case actions.SUCCESS_SAVE_CLIENT: {
      const actionItem = action.payload || {};
      const newItems = [];
      let itemFounded = false;
      state.items.forEach((item) => {
        
        if (item.id === actionItem.id) {
          newItems.push(actionItem);
          itemFounded = true;
        } else newItems.push(item);
      });
      if (!itemFounded) newItems.push(actionItem);
      
      return {
        ...state,
        items: newItems,
        loaded: true,
        inited: true,
        error: false,
      };
    }

    case actions.FAILURE_SAVE_CLIENT:
      return {
        ...state,
        loaded: true,
        error: true,
      };
  
    default:
      return state;
  }
};
