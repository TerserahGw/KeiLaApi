import axios from "axios";

const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  // Implement shortener logic if needed
  return url;
}

export const tiktok = async (query) => {
  try {
    let response = await axios.post("https://lovetik.com/api/ajax/search", { query });

    const result = {
      creator: "YNTKTS",
      title: clean(response.data.desc),
      author: clean(response.data.author),
      nowm: await shortener(response.data.links[0]?.a?.replace("https", "http") || ""),
      watermark: await shortener(response.data.links[1]?.a?.replace("https", "http") || ""),
      audio: await shortener(response.data.links[2]?.a?.replace("https", "http") || ""),
      thumbnail: await shortener(response.data.cover),
    };

    return result;
  } catch (error) {
    throw new Error("Error fetching TikTok data");
  }
};
