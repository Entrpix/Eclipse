import { Helmet } from "react-helmet";

const Cloaker = () => {
  const title = localStorage.getItem("title") || "Eclipse";
  const favicon = localStorage.getItem("favicon") || "/favicon.ico";

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" href={favicon} />
    </Helmet>
  );
};

export default Cloaker;