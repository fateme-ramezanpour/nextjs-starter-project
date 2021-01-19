import React, {useState} from 'react';

const Title = props => {
  const [data] = useState(props.data);

  return(
  <div>{data}</div>
  )
}
Title.getInitialProps = async ctx => {
  const url = `https://341d0465-d208-4b63-86d6-021ff1e8bf8a.mock.pstmn.io/news-test/10/news-title`;
  try {
    const res = await fetch(url);
    // if(res.ok){
    // }
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",res)
    const data = res.ok ? await res.json() : null;
    return { data };
  } catch (err) {
    return err;
  }
}

export default Title;