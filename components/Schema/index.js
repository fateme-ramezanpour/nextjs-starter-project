import React, { memo } from "react";
import Head from "next/head";

const Schema = ({ post }) => {
  return (
    <>
      {post && (
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${post}` }} />
        </Head>
      )}
    </>
  );
};
export default memo(Schema);
