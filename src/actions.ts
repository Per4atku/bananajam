"use server";

import { revalidateTag } from "next/cache";

export const AddToLibrary = async () => {
  await fetch(`http://localhost:31299/api/artists`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
    },
  });

  revalidateTag("form-progress");
};
