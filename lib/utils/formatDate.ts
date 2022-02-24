import { siteMetadata } from "../../data/siteMetadata";

const formatDate = (date: string | number) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);

  return now;
};

export default formatDate;
