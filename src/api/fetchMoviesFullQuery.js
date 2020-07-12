// query builder:
const bySearch = {
  s: "",
  type: {
    val: "",
    options: ["movie", "series", "episode"],
  },
  y: "",
  r: {
    val: "json",
    options: ["json", "xml"],
  },
  callback: "",
  v: 1,
  page: {
    val: 1,
    options: [1, 100],
  },
};

const byTitleOrId = {
  i: "",
  t: "",
  type: {
    val: "",
    options: ["movie", "series", "episode"],
  },
  y: "",
  plot: {
    value: "short",
    options: ["short", "full"],
  },
  r: {
    val: "json",
    options: ["json", "xml"],
  },
  callback: "",
  v: 1,
};

const API_KEY = "";
const url = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

const fetchMoviesFullQuery = (queryParams) => {
  let paramsSection = Object.keys(queryParams)
    .map((q) =>
      queryParams[q] ? `${q}=${encodeURIComponent(queryParams[q])}&` : ""
    )
    .join("");
  paramsSection = /&$/.test(paramsSection)
    ? paramsSection.slice(0, -1)
    : paramsSection;
  const URL = url + paramsSection;
  return fetch(URL).then((response) => response.json());
};

export default fetchMoviesFullQuery;
