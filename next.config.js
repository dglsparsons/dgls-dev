module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: "/img/remote/:pic",
        destination: "/img/:pic",
        permanent: true,
      },
    ];
  },
};
