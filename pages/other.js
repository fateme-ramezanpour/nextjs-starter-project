import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from 'posts/store';
import { startClock, tickClock } from 'posts/actions/clock';
import Page from 'components/page';

const Other = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startClock());
    }, [dispatch]);

    return <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    store.dispatch(tickClock(false));
});

export default Other;
