// import axios from "axios";
import { cookies } from "next/headers";
import { apiBaseUrl, authTokenKey, authUserKey } from "./config";

// const MAX_RETRIES = 3;
// const TIMEOUT = 5000; // Timeout in milliseconds

// const api = axios.create({
//   baseURL: apiBaseUrl,
//   // timeout: TIMEOUT,
// });

// Function to set the Bearer Token
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

const setAuthToken = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const checkIsAuthenticated = async () => {
  const cookieStore = cookies();
  let token = cookieStore.get(authTokenKey);
  let user = cookieStore.get(authUserKey);
  // console.log(user, token);

  if (!token?.value || !user?.value) {
    return {
      status: false,
      user: null,
    };
  } else {
    const options = setAuthToken(token?.value);
    // console.log("check user", `/api/user/get-profiledetails/${user?.value}`);
    try {
      // console.log(`${apiBaseUrl}/api/user/get-profiledetails/${user?.value}`);
      // const checkToken = await api.get(
      //   `/api/user/get-profiledetails/${user?.value}/`
      // );
      const checkToken = await fetch(
        `${apiBaseUrl}/api/user/get-profiledetails/${user.value}`,
        options
      );

      const res = await checkToken.json();

      if (res?.data && res?.data?.id == user.value) {
        return {
          status: true,
          user: { ...res?.data, role: res?.data?.role || "admin" },
        };
      } else {
        return {
          status: false,
          user: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        user: null,
      };
    }
  }
};

// export default api;
