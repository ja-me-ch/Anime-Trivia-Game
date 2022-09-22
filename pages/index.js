import React from 'react';
import Profile from '../components/Profile';
import GetUserByName from '../graphql/getUserByName';
import MakeRequest from '../graphql/makeRequest';

export default function Home(props) {
  // const { data } = props;
  return (
    <div>
      <Profile name={'melody'}/>
      <Profile name={'sterben'}/>
      <Profile name={'???'}/>
    </div>
  )
}

// export async function getStaticProps() {
//   const params = GetUserByName('melody');
//   const data = await MakeRequest(params);

//   return {
//     props: {
//       data: data.data
//     }
//   }
// }
