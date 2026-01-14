import axios from "axios";

export const mockAxiosResponseOnce = response =>
  axios.mockResolvedValueOnce(response);

export const mockAxiosErrorOnce = error => axios.mockRejectedValueOnce(error);

export const resetAxiosMocks = () => axios.mockReset();
