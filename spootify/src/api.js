import axios from "axios";
import config from "./config";

// axios wrapper helper
const axiosFetcher = (url, token) => {
  return axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);
};

export const getNewReleases = (token) =>
  axiosFetcher(`https://api.spotify.com/v1/browse/new-releases`, token);

export const getCategories = (token) =>
  axiosFetcher(`https://api.spotify.com/v1/browse/categories`, token);

export const getClientToken = async () => {
  const { clientId, clientSecret } = config.api;
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const authKey = `${clientId}:${clientSecret}`;
  const authKeyBase64 = btoa(authKey);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authKeyBase64}`,
    },
  };

  return axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    axiosConfig
  );
};

export const getFeaturedPlaylists = (token) =>
  axiosFetcher("https://api.spotify.com/v1/browse/featured-playlists", token);
