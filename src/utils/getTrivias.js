import { useState } from "react";
import axios from "axios";
import { decodeHtml } from "./htmlEntities";

const getTrivias = async () => {
  let res = await axios.get("https://opentdb.com/api.php?amount=10");

  let trivias = res?.data?.results ?? [];
  trivias = trivias.map((trivia) => ({
    ...trivia,
    question: decodeHtml(trivia.question),
  }));

  return trivias;
};

export const useTrivias = () => {
  const [trivias, setTrivias] = useState([]);

  return [
    trivias,
    () => {
      getTrivias().then((res) => setTrivias(res));
    },
  ];
};
