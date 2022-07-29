import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

import { IconContext } from "react-icons";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';

const ClaimListItem = (props) => {
  const {
    index,
    title,
    priceLow,
    priceHigh,
    description,
    isGot,
    gotHandler,
    unClaimHandler,
   } = props;

   const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <styled.Component data-item-index={ index } isGot={ isGot }>
      <layout.GridRow>
        <styled.SummaryRow>
          <styled.CheckboxContainer>
            <IconContext.Provider value={{ size: "25px" }}>
              {!isGot && 
                <styled.CheckboxButton onClick={ gotHandler }>
                  <MdCheckBoxOutlineBlank />
                </styled.CheckboxButton>
              }
              {isGot && 
                <styled.CheckboxButton onClick={ gotHandler }>
                  <MdOutlineCheckBox />
                </styled.CheckboxButton>
              }
            </IconContext.Provider>
          </styled.CheckboxContainer>
          
          <styled.TitleContainer className="title-container">
            <styled.Title role="button" onClick={()=> {
              setIsExpanded(!isExpanded)
            }}>
              { title }
            </styled.Title>
            <styled.PriceContainer>
              { priceLow === priceHigh &&
                <styled.Price>{ priceLow }</styled.Price>
              }
              { priceLow !== priceHigh &&
                <>
                  <styled.Price>{ priceLow }</styled.Price> - <styled.Price>{ priceHigh }</styled.Price>
                </>
              }
            </styled.PriceContainer>
          </styled.TitleContainer>
          
        </styled.SummaryRow>

        {isExpanded && 
          <styled.Description>
            <div dangerouslySetInnerHTML={{__html: description}} />
            <styled.ActionRow>
              <styled.UnclaimButton data-item-index={ index } onClick={ unClaimHandler }>Unclaim</styled.UnclaimButton>
            </styled.ActionRow>
          </styled.Description>
        }
      </layout.GridRow>
    </styled.Component>
  );
};

ClaimListItem.propTypes = {
};

export default ClaimListItem;
