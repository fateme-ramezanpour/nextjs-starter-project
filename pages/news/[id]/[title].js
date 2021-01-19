import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Title = props => {
  // const [data] = useState(props);
  return(
    <>
    {props &&
      <ul>
        <li>{props.id}</li>
        <li>{props.title}</li>
        <li>{props.abstract}</li>
        <li>{props.body}</li>
      </ul>
    }
    </>
  )
}
Title.getInitialProps = async ctx => {
  const url = `${process.env.NEXT_PUBLIC_URL_HOST}news-test/${ctx.query.id}/${ctx.query.title}`;
  
  try {
    const res = await fetch(url);
    const data = res.ok ? await res.json() : null;
    return data;
  } catch (err) {
    return err;
  }
}

Title.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  abstract: PropTypes.string,
  body: PropTypes.string,
};
export default Title;