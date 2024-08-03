import { cookies } from "next/headers";
import { apiBaseUrl, authTokenKey, authUserKey } from "./config";

const MAX_RETRIES = 3;
const TIMEOUT = 5000; // Timeout in milliseconds

// Function to set the Bearer Token in fetch options
const setAuthToken = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Function to check if the user is authenticated
export const checkIsAuthenticated = async () => {
  const cookieStore = cookies();
  let token = cookieStore.get(authTokenKey);
  let user = cookieStore.get(authUserKey);

  if (!token?.value || !user?.value) {
    return false;
  } else {
    const authOptions = setAuthToken(token?.value);
    try {
      const response = await fetch(
        `${apiBaseUrl}/employee/${user?.value}/`,
        authOptions
      );
      const checkToken = await response.json();
      if (checkToken?.employee_id === user.value) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// Global function to fetch data with retries
export const fetchData = async (url, retries = MAX_RETRIES, options = {}) => {
  const cookieStore = cookies();
  let token = cookieStore.get(authTokenKey);
  // let user = cookieStore.get(authUserKey);

  try {
    // console.log(token);

    const authOptions = setAuthToken(token?.value);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
    const response = await fetch(apiBaseUrl + url, {
      ...authOptions,
      ...options,
      signal: controller.signal,
      // next: { revalidate: 2000 },
    });
    clearTimeout(timeoutId);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data");
    // }

    if (!response?.status === "success") {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    if (retries > 0) {
      return fetchData(apiBaseUrl + url, retries - 1, options);
    } else {
      throw new Error("Failed to fetch data after multiple retries");
    }
  }
};

export default fetchData;
