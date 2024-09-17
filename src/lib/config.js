export const server =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://113.212.109.147:5000";

export const authTokenKey = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY;
export const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY;
export const authRoleKey = process.env.NEXT_PUBLIC_AUTH_ROLE_KEY;
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const constants = {
  PAGE_SIZES: [10, 20, 30, 40],
};
