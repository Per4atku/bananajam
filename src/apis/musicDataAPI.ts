import axios from "axios";

const apiRoute = process.env.NEXT_PUBLIC_BACKEND_URL;

export const musicDataAPI = {
  getToken: async () => {
    if (apiRoute) {
      const token = await axios.get(apiRoute + "/token");
      return token.data;
    } else {
      throw new Error("No NEXT_PUBLIC_BACKEND_URL provided inside .env file");
    }
  },
};
