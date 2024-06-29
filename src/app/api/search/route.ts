import { musicDataAPI } from "@/apis/musicDataAPI";
import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const params = new URLSearchParams([
    ["q", url.searchParams.get("q") || ""],
    ["type", url.searchParams.get("type") || ""],
    ["market", "ES"],
    ["limit", url.searchParams.get("limit") || "1"],
    ["offset", url.searchParams.get("offset") || "5"],
  ]);

  const token = await musicDataAPI.getToken();
  const requestUrl = "https://api.spotify.com/v1/search?" + params.toString();

  const searchResponse = await axios.get(requestUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return Response.json(searchResponse.data);
};
