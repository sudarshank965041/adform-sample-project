// Action Type
export const actionType = {
  ADD_PRODUCTS_START: "ADD_PRODUCTS_START",
  ADD_PRODUCTS_SUCCESS: "ADD_PRODUCTS_SUCCESS",
};

// Actions
export const addCampaignStart = (data) => ({
  type: actionType.ADD_PRODUCTS_START,
  payload: data,
});

export const addCampaignSuccess = (data) => ({
  type: actionType.ADD_PRODUCTS_SUCCESS,
  payload: data,
});

const initialCampaignData = [
  {
    id: 1,
    name: "Divavu",
    startDate: "9/19/2021",
    endDate: "3/9/2023",
    Budget: 88377,
    userId: 3,
  },
  {
    id: 2,
    name: "Jaxspan",
    startDate: "11/21/2023",
    endDate: "2/21/2024",
    Budget: 608715,
    userId: 6,
  },
  {
    id: 3,
    name: "Miboo",
    startDate: "11/1/2022",
    endDate: "6/20/2022",
    Budget: 239507,
    userId: 7,
  },
  {
    id: 4,
    name: "Trilith",
    startDate: "8/25/2022",
    endDate: "11/30/2022",
    Budget: 179838,
    userId: 1,
  },
  {
    id: 5,
    name: "Layo",
    startDate: "11/28/2017",
    endDate: "3/10/2023",
    Budget: 837850,
    userId: 9,
  },
  {
    id: 6,
    name: "Photojam",
    startDate: "7/25/2019",
    endDate: "6/23/2021",
    Budget: 858131,
    userId: 3,
  },
  {
    id: 7,
    name: "Blogtag",
    startDate: "6/27/2019",
    endDate: "1/15/2021",
    Budget: 109078,
    userId: 2,
  },
  {
    id: 8,
    name: "Rhyzio",
    startDate: "10/13/2020",
    endDate: "1/25/2022",
    Budget: 272552,
    userId: 4,
  },
  {
    id: 9,
    name: "Zoomcast",
    startDate: "9/6/2021",
    endDate: "11/10/2023",
    Budget: 301919,
    userId: 8,
  },
  {
    id: 10,
    name: "Realbridge",
    startDate: "3/5/2021",
    endDate: "10/2/2026",
    Budget: 505602,
    userId: 5,
  },
  {
    id: 11,
    name: "Realbridge",
    startDate: "3/5/2021",
    endDate: "10/2/2026",
    Budget: 505602,
    userId: 35,
  },
];

// Reducer
const INIT_STATE = {
  loading: false,
  data: initialCampaignData,
  error: null,
};

export default function campaignReducer(
  state = INIT_STATE,
  action = { type: "", payload: {} }
) {
  switch (action.type) {
    case actionType.ADD_PRODUCTS_START:
      return { ...state, loading: true };
    case actionType.ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
        error: null,
      };
    default:
      return { ...state };
  }
}
