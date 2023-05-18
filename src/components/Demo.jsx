import React from "react";
import { linkIcon, loader, copy, tick } from "../assets";
import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState({});
  const [sure, setSure] = useState(false);
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("articles"));
    console.log("saved article", savedArticles);
    if (savedArticles) {
      setAllArticles(savedArticles);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
    });
    console.log("dataaaaaa", data);
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      console.log("new article", newArticle);
      const updatedArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      console.log("article", article);

      console.log(allArticles);
    }
  };

  const deleteHistory = () => {
    setAllArticles([]);
    setArticle({ url: "", summary: "" });
    localStorage.clear("articles");
  };
  return (
    <div className="w-full">
      <div className="flex flex-col w-full p-2 ">
        <form className=" relative" onSubmit={onSubmit}>
          <img
            src={linkIcon}
            alt="linkIcon"
            className="h-[25px] w-[25px] absolute  top-[4px] left-2 object-contain"
          />
          <input
            type="text"
            className="w-full shadow-md p-2 pl-10 rounded-md text-sm outline-none "
            placeholder="Enter a URL"
            required
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button type="submit" className="absolute top-[4px] right-2">
            <img src={tick} alt="tick" className="w-[25px] object-contain" />
          </button>
        </form>
      </div>

      <div className="relative flex flex-col bg-slate-200 shadow-md m-5 max-h-[150px] overflow-auto w-full ">
        <div className=" sticky top-0 left-0 bg-slate-200">
          <p className="px-4 pb-1 text-lg text-red-500 ">Summary</p>
        </div>

        <div
          className={
            isFetching ? "flex items-center justify-center" : " text-left"
          }
        >
          {isFetching ? (
            <img src={loader} alt="loader" className="w-50px object-contain" />
          ) : error ? (
            <p className="text-red text-lg font-bold capitalize ">
              error in fetching
            </p>
          ) : (
            <p className="px-4">{article.summary}</p>
          )}
        </div>
      </div>
      <div className="my-6 bg-gray-300 shadow-sm flex flex-col gap-2 h-[150px] overflow-y-auto p-2 rounded-sm">
        {allArticles.map((article, index) => (
          <div
            key={`key${index}`}
            className="flex flex-row items-center justify-between bg-white p-2 rounded-md"
          >
            <div className="flex flex-row justify-start">
              <div className="copy-btn">
                <img
                  src={copied === article ? tick : copy}
                  alt="copy"
                  className="w-[20px] h-[20px] object-contain mr-6 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(article.url);
                    setCopied(article);
                    setTimeout(() => {
                      setCopied("");
                    }, 2000);
                  }}
                />
              </div>
              <div
                onClick={() => setArticle(article)}
                className="cursor-pointer"
              >
                <p className="text-blue-700 truncate">{article.url}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const remainingArticles = [...allArticles];
                remainingArticles.splice(index, 1);
                setArticle(remainingArticles[0]);
                setAllArticles(remainingArticles);
                localStorage.setItem(
                  "articles",
                  JSON.stringify(remainingArticles)
                );
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="text-red-500 font-bold mb-6 flex flex-col items-center justify-center">
        <button
          onClick={() => {
            setSure(true);
          }}
          className="px-4 py-2 bg-slate-400 shadow-md rounded-[10px]"
        >
          clear all search
        </button>
        <div className="flex justify-center items-center mt-2 ">
          <button
            onClick={deleteHistory}
            className={`${
              sure ? "block" : "hidden"
            }  text-slate-400 font-medium py-1 px-4 rounded bg-red-500 shadow-md mx-2 capitalize `}
          >
            yes
          </button>
          <button
            className={`${
              sure ? "block" : "hidden"
            }  text-slate-400 font-bold py-1 px-4 rounded bg-red-500 shadow-md mx-2 capitalize `}
            onClick={() => setSure(false)}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
