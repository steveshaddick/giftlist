import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { updateGift } from 'utilities/api';

import EditGift from 'common/components/EditGift';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';


const AskListItem = (props) => {
  const {
    index,
    gift,
    deleteHandler,
    editHandler,
  } = props;
  const { title, description, priceHigh, priceLow } = gift;

  const [ isEditing, setIsEditing ] = useState(false);

  const editClickHandler = () => {
    setIsEditing(true);
  }

  const saveEditingHandler = (giftData) => {
    setIsEditing(false);
    if (editHandler) {
      editHandler(giftData);
    }
  }

  const cancelEditingHandler = () => {
    setIsEditing(false);
  }

  return (
    <styled.Component data-item-index={ index } isEditing={ isEditing }>
      <layout.GridRow>
        { !isEditing &&
          <>
            <styled.SummaryRow>
              <styled.TitleContainer className="title-container">
                <styled.Title>
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
              <styled.EditButton onClick={ editClickHandler }>Edit</styled.EditButton>
              <styled.DeleteButton onClick={ deleteHandler }>Delete</styled.DeleteButton>
            </styled.ActionRow>
          </>
        }
        { isEditing &&
          <EditGift
            gift={ gift }
            apiSave={ updateGift }
            saveHandler={ saveEditingHandler }
            cancelHandler={ cancelEditingHandler }
          />
        }
      </layout.GridRow>
    </styled.Component>
  );
};

AskListItem.propTypes = {
};

export default AskListItem;
