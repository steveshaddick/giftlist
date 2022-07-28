import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';


const AskListItem = (props) => {
  const {
    index,
    title,
    priceLow,
    priceHigh,
    description,
    deleteHandler,
    editHandler,
   } = props;

  return (
    <styled.Component data-item-index={ index }>
      <styled.SummaryRow>
        
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

      <styled.Description dangerouslySetInnerHTML={{__html: description}} />
      
      <styled.ActionRow>
        <styled.EditButton onClick={ editHandler }>Edit</styled.EditButton>
        <styled.DeleteButton onClick={ deleteHandler }>Delete</styled.DeleteButton>
      </styled.ActionRow>


    </styled.Component>
  );
};

AskListItem.propTypes = {
};

export default AskListItem;
