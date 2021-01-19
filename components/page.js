import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { useSelector } from 'react-redux';

import Counter from './counter';
import Clock from './clock';
import styles from 'components/page.module.scss';
function Page({ linkTo, NavigateTo, title }) {
    const placeholderData = useSelector((state) => state.clock.placeholderData);
    const error = useSelector((state) => state.clock.error);
    const light = useSelector((state) => state.clock.light);
    const lastUpdate = useSelector((state) => state.clock.lastUpdate);
    return (
        <div>
            <h1 className={styles.titleColor}>{title}</h1>
            <Clock lastUpdate={lastUpdate} light={light} />
            <Counter />
            <nav>
                <Link href={linkTo}>
                    <a>Navigate: {NavigateTo}</a>
                </Link>
            </nav>
            <nav>
                <Link href={'/news/10/news-title'}>
                    <a>Navigate: news page</a>
                </Link>
            </nav>
            {placeholderData && (
                <pre>
                    <code>{JSON.stringify(placeholderData, null, 2)}</code>
                </pre>
            )}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    );
}

Page.propTypes = {
    linkTo: PropTypes.string,
    NavigateTo: PropTypes.string,
    title: PropTypes.string
};

export default Page;
