import axios from "./axiosConfig";
interface LoginResponse {
  accessToken: string | null;
  message?: string;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post("/auth/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export { login };
