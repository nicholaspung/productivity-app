export const GET_AUTH_FROM_LOCAL_STORAGE = "GET_AUTH_FROM_LOCAL_STORAGE";
export const REMOVE_AUTH_FROM_LOCAL_STORAGE = "REMOVE_AUTH_FROM_LOCAL_STORAGE";

export const getAuthFromLocalStorage = () => ({
  type: GET_AUTH_FROM_LOCAL_STORAGE,
  payload: JSON.parse(localStorage.getItem("authUser")),
});

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem("authUser");
  return {
    type: REMOVE_AUTH_FROM_LOCAL_STORAGE,
    payload: null,
  };
};
