import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';

import { IconContext } from 'react-icons';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import * as styled from './_styles';

const iconContextValue = {
  size: '25px',
};

const ClaimListItem = (props) => {
  const { index, gift, gotHandler, unClaimHandler } = props;
  const { title, priceLow, priceHigh, description, isGot } = gift;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showIsGot, setShowIsGot] = useState(isGot);

  const gotClickHandler = () => {
    setShowIsGot(gotHandler(index));
  };

  return (
    <styled.Component data-item-index={index} isGot={isGot}>
      <layout.GridRow>
        <styled.SummaryRow>
          <styled.CheckboxContainer>
            <IconContext.Provider value={iconContextValue}>
              {!showIsGot && (
                <styled.CheckboxButton onClick={gotClickHandler}>
                  <MdCheckBoxOutlineBlank focusable="false" />
                </styled.CheckboxButton>
              )}
              {showIsGot && (
                <styled.CheckboxButton onClick={gotClickHandler}>
                  <MdOutlineCheckBox focusable="false" />
                </styled.CheckboxButton>
              )}
            </IconContext.Provider>
          </styled.CheckboxContainer>

          <styled.TitleContainer className="title-container">
            <styled.Title
              role="button"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              {title}
            </styled.Title>
            <styled.PriceContainer>
              {priceLow === priceHigh && <styled.Price>{priceLow}</styled.Price>}
              {priceLow !== priceHigh && (
                <>
                  <styled.Price>{priceLow}</styled.Price> - <styled.Price>{priceHigh}</styled.Price>
                </>
              )}
            </styled.PriceContainer>
          </styled.TitleContainer>
        </styled.SummaryRow>

        {isExpanded && (
          <styled.Description>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <styled.ActionRow>
              <styled.UnclaimButton data-item-index={index} onClick={unClaimHandler}>
                Unclaim
              </styled.UnclaimButton>
            </styled.ActionRow>
          </styled.Description>
        )}
      </layout.GridRow>
    </styled.Component>
  );
};

ClaimListItem.propTypes = {
  index: PropTypes.number.isRequired,
  gift: PropTypes.object.isRequired,
  gotHandler: PropTypes.func,
  unClaimHandler: PropTypes.func,
};

ClaimListItem.defaultProps = {
  gotHandler: () => {},
  unClaimHandler: () => {},
};

export default ClaimListItem;
