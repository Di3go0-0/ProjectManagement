import axios from "../axios.ts";


export const GetProjectsRequest = async () => {
  const response = await axios.get('/project');
  return response;
}
