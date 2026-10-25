import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  onResponseError({ response, error }) {
    const backendMessage = response._data?.message;
    if (backendMessage && error) {
      error.message = backendMessage;
    }
  },
});
