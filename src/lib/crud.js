import Cookies from "js-cookie";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "./config";

const api = axios.create({
  baseURL: apiBaseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const fetcher = async (route) => {
  try {
    let token = Cookies.get(authTokenKey);

    const response = await fetch(apiBaseUrl + route, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export const read = async (url) => {
  try {
    let token = Cookies.get(authTokenKey);
    setAuthToken(token);

    const response = await api.get(url);

    // if (!response.ok) {
    //   console.error("Error");
    //   return {
    //     error: true,
    //     message: "Failed to get data",
    //   };
    // }

    return response;
  } catch (error) {
    console.error("Failed: ", error);
    // throw error;
    return {
      error: true,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const create = async (route, data, hasFile = false) => {
  try {
    let token = Cookies.get(authTokenKey);
    // console.log(token);
    // console.log(data);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    // return data;

    const headers = {
      Authorization: `Bearer ${token ? token : ""}`,
    };

    if (!hasFile) {
      headers["Content-Type"] = "application/json";
    }
    // else {
    //   headers["Content-Type"] = "multipart/form-data";
    // }

    const response = await fetch(apiBaseUrl + route, {
      method: "POST",
      headers: headers,
      body: hasFile ? data : JSON.stringify(data),
    });

    // console.log(response);

    if (!response.ok) {
      console.error("Error");
      // throw new Error("Failed to submit data");

      return {
        error: true,
        message: "Failed to submit data",
      };
    }

    // console.log("Successful");
    // console.log(response.json());

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    // throw error;
    return {
      error: true,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const update = async (route, data, hasFile = false) => {
  try {
    let token = Cookies.get(authTokenKey);
    // console.log(token);
    // console.log(data);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    // return data;

    const headers = {
      Authorization: `Bearer ${token ? token : ""}`,
    };

    if (!hasFile) {
      headers["Content-Type"] = "application/json";
    }
    // else {
    //   headers["Content-Type"] = "multipart/form-data";
    // }

    const response = await fetch(apiBaseUrl + route, {
      method: "PUT",
      headers: headers,
      body: hasFile ? data : JSON.stringify(data),
    });

    // console.log(response);

    if (!response.ok) {
      console.error("Error");
      // throw new Error("Failed to submit data");

      return {
        error: true,
        message: "Failed to submit data",
      };
    }

    // console.log("Successful");
    // console.log(response.json());

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    // throw error;
    return {
      error: true,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const remove = async (route) => {
  let token = Cookies.get(authTokenKey);

  try {
    const response = await fetch(apiBaseUrl + route, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    // console.log(response);

    // if (!response.ok) {
    //   return {
    //     error: true,
    //     message: "Failed to delete",
    //   };
    // }

    // console.log("Successful");
    console.log(response);
    // const responseData = await response.json();

    return response;
  } catch (error) {
    console.error("Failed: ", error);
    return {
      error: true,
      message: error.response?.data || error?.message || "Something went wrong",
    };
  }
};
