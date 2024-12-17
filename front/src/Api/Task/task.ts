import axios from "../axios";

export const GetTaskRequest = async () => {
  const response = await axios.get('/task');
  return response;
}
