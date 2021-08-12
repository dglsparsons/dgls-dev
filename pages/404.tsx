import Head from "next/head";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center text-center">
      <Head>
        <title>404: This page could not be found</title>
      </Head>
      <h1 className="text-xl font-medium pr-4 border-r-2 border-gray-500 mr-4">
        404
      </h1>
      <h2>This page could not be found</h2>
    </div>
  );
}
