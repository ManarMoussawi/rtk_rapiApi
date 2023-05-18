const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
  headers: {
    "X-RapidAPI-Key": "525b73502emsh98305612ffd5258p14438bjsn9ddc574aacca",
    "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
};

export const articleApi = createApi({
  reducerPath: "rapidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey),
        headers.set(
          "X-RapidAPI-Host",
          "article-extractor-and-summarizer.p.rapidapi.com"
        );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
