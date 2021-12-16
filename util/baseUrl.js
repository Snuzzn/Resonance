// const baseUrl = ;
// const baseUrl = ;

const baseUrl = () => {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  else return "https://resonance-bookmarks.vercel.app";
};

export default baseUrl;
