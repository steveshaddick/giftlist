import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const GiftItem = (props) => {
  const {
    title,
    priceLow,
    priceHigh,
    description,
   } = props;

   const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <styled.Component>
      <styled.SummaryRow>
        <styled.Title onClick={()=> {
          setIsExpanded(!isExpanded)
        }}>
          { title }
        </styled.Title>
        
        { priceLow === priceHigh &&
          <styled.PriceContainer>
            <styled.Price>{ priceLow }</styled.Price>
          </styled.PriceContainer>
        }
        { priceLow !== priceHigh &&
          <styled.PriceContainer>
            <styled.Price>{ priceLow }</styled.Price> - <styled.Price>{ priceHigh }</styled.Price>
          </styled.PriceContainer>
        }
      </styled.SummaryRow>

      {isExpanded && 
        <styled.Description>
          { description }
        </styled.Description>
      }
    
    <styled.ActionRow>
    
    </styled.ActionRow>
      <button>I'll get it</button>
    </styled.Component>
  );
};

GiftItem.propTypes = {
};

export default GiftItem;
