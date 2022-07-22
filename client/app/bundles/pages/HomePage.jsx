import React from 'react';
import { StateProvider } from 'utilities/store.js';

import MainHeader from 'components/MainHeader/MainHeader';
import MainFooter from 'components/MainFooter/MainFooter';

import * as styled from './_styles';

const HomePage = (props) => {
  const { currentAccount, giftLists } = props;
  console.log(giftLists);

  return (
    <>
      <styled.GlobalStyle />
      <StateProvider currentAccount={currentAccount} >
        <MainHeader />
        <styled.PageContainer id="HomePage">
          {giftLists.map((list) => {
            return (<div>
              <h2>{list.title}</h2>
              <ul>
                {list.members.map((member) => {
                  return (
                    <li>
                      <a href={`/users/${member.id}/giftlist`}>{member.name}</a>
                    </li>
                  )
                })}
              </ul>
            </div>)
          })}
        </styled.PageContainer>
        <MainFooter />
      </StateProvider>
    </>
  );
};

export default HomePage;
