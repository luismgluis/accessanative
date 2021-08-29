export type HomeConfigRedux = {
  pageSelected: number;
};

type InitialState = {
  totalHeight: number;
  theme: number;
  alertsViewRef: any | null;
  language: string;
  homeConfig: HomeConfigRedux;
};
const INITIAL_STATE: InitialState = {
  totalHeight: 0,
  theme: 0,
  alertsViewRef: null,
  language: "",
  homeConfig: {
    pageSelected: 0,
  },
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "getTotalHeight":
      return {
        ...state,
        totalHeight: action.payload,
      };
    case "setTotalHeight":
      action = {
        ...state,
        totalHeight: action.payload,
      };
      return action;
    case "setTheme":
      action = {
        ...state,
        theme: action.payload,
      };
      return action;
    case "setLanguage":
      action = {
        ...state,
        language: action.payload,
      };
      return action;
    case "setAlertsViewRef":
      action = {
        ...state,
        alertsViewRef: action.payload,
      };
      return action;

    case "setHomeConfig":
      action = {
        ...state,
        homeConfig: action.payload,
      };
      return action;
    default:
      return state;
  }
};
