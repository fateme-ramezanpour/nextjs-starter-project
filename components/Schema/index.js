import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

const Schema = ({ post }) => {
    return (
        <>
            {post && (
                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: `${post}` }}
                    />
                </Head>
            )}
        </>
    );
};

Schema.propTypes = {
    post: PropTypes.string
};

export default memo(Schema);
