/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { getCurrentUser } from 'utilities/CurrentUserContext';
import * as api from 'utilities/api';

import 'react-quill/dist/quill.snow.css';
import * as layout from 'common/_styles/layout';
import { MdAutorenew } from 'react-icons/md';
import * as styled from './_styles';

const modules = {
  toolbar: [
    [
      'link',
      'bold',
      'italic',
      { list: 'ordered' },
      { list: 'bullet' },
      'clean',
    ],
  ],
};

function titleText(isNew, isPrivate, isGroup) {
  if (isNew) {
    if (isPrivate) {
      return 'Add private gift';
    }
    if (isGroup) {
      return 'Add group gift';
    }
  }
  return 'Editing gift';
}

function helpMessage(isNew, isPrivate, isGroup) {
  if (isNew) {
    if (isPrivate) {
      return <p>You are adding a private gift, only you can see this gift.</p>;
    }
    if (isGroup) {
      return (
        <p>
          You are adding a group gift, only group members will see it (the person won&apos;t see it
          on their list).
        </p>
      );
    }
  }
  return null;
}

function submitButtonText(isNew) {
  if (isNew) {
    return 'Add';
  }
  return 'Save';
}

const EditGift = (props) => {
  const { gift, cancelHandler, saveHandler, askerId, isPrivate, isGroup } = props;
  const { id, title, description, priceHigh, priceLow } = gift || {};

  const fieldId = id || 'new';
  const isNew = typeof gift !== 'object';
  const currentUser = getCurrentUser();

  const [isPriceRange, setIsPriceRange] = useState(priceLow !== priceHigh);
  const [isSaving, setIsSaving] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  const fieldName = (name) => `${name}_${fieldId}`;
  const getDefaultValues = () => {
    const obj = {};
    obj[fieldName('id')] = id || '';
    obj[fieldName('title')] = title || '';
    obj[fieldName('description')] = description || '';
    obj[fieldName('priceLow')] = priceLow || '';
    obj[fieldName('priceHigh')] = priceHigh || '';
    obj[fieldName('isPriceRange')] = priceHigh || '';
    obj[fieldName('askerId')] = askerId || '';
    obj[fieldName('groupOwnerId')] = isGroup ? currentUser.group.id : '';

    return obj;
  };

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (formData) => {
    if (isSaving) {
      return;
    }

    const apiCall = isNew ? api.addGift : api.updateGift;

    const giftData = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const uniqueKey of Object.keys(formData)) {
      const [key] = uniqueKey.split('_');
      giftData[key] = formData[uniqueKey];
    }

    apiCall({
      gift: giftData,
    }).then((response) => {
      const { success, data } = response;
      setIsSaving(false);
      if (success && saveHandler) {
        saveHandler(data);
      }
    });

    setIsSaving(true);
  };

  const onDescriptionChange = (data) => {
    setValue(fieldName('description'), data);
  };

  const onPriceBlur = (e) => {
    const [priceLowVal, priceHighVal] = getValues([fieldName('priceLow'), fieldName('priceHigh')]);
    const priceLowInt = parseInt(priceLowVal, 10);
    const priceHighInt = parseInt(priceHighVal, 10);

    if (isPriceRange) {
      // eslint-disable-next-line default-case
      switch (e.target.name) {
        case `priceLow_${fieldId}`:
          if (priceLowInt > priceHighInt) {
            setValue(fieldName('priceHigh'), priceLowInt);
          }
          break;

        case `priceHigh_${fieldId}`:
          if (priceLowInt > priceHighInt) {
            setValue(fieldName('priceLow'), priceHighInt);
          }
          break;
      }
    } else {
      setValue(fieldName('priceHigh'), priceLowInt);
    }
  };

  useEffect(() => {
    const [priceLowVal, priceHighVal] = getValues([fieldName('priceLow'), fieldName('priceHigh')]);
    if (isPriceRange) {
      if (priceHighVal === '' || priceLowVal === priceHighVal) {
        setValue(fieldName('priceHigh'), parseInt(priceLowVal * 1.1, 10));
      }
    } else {
      setValue(fieldName('priceHigh'), priceLowVal);
    }
  }, [isPriceRange]);

  useEffect(() => {
    if (isPrivate) {
      api.getGroups().then((response) => {
        const { data } = response;
        let allMembers = [];
        for (let i = 0; i < data.length; i += 1) {
          const members = data[i].members.filter((member) => member.id !== currentUser.id);
          allMembers = allMembers.concat(members);
        }
        setGroupMembers(allMembers);
      });
    }
  }, [isPrivate]);

  return (
    <styled.Component>
      <layout.GridRow>
        <styled.TitleContainer>
          <styled.Title>{titleText(isNew, isPrivate, isGroup)}</styled.Title>

          <button onClick={cancelHandler} type="button">
            Cancel
          </button>
        </styled.TitleContainer>

        {helpMessage(isNew, isPrivate, isGroup)}

        <styled.EditGiftForm id={fieldName('EditGiftForm')} onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register(fieldName('id'))} />

          {!isPrivate && <input type="hidden" {...register(fieldName('askerId'))} />}

          {isGroup && <input type="hidden" {...register(fieldName('groupOwnerId'))} />}

          {isPrivate && (
            <styled.FieldContainer>
              <styled.Label>Person</styled.Label>
              <select {...register(fieldName('askerId'), { required: true })}>
                <option value=""> -- select -- </option>
                {groupMembers.map((member) => {
                  const { id: memberId, name } = member;
                  return (
                    <option key={memberId} value={memberId}>
                      {name}
                    </option>
                  );
                })}
              </select>
              {errors[fieldName('askerId')]?.type === 'required' && (
                <styled.Error>Choose who it&apos;s for</styled.Error>
              )}
            </styled.FieldContainer>
          )}

          <styled.FieldContainer>
            <styled.Label htmlFor={fieldName('title')}>Title</styled.Label>
            <styled.Input
              placeholder="Gift title"
              {...register(fieldName('title'), { required: true })}
            />
            {errors[fieldName('title')]?.type === 'required' && (
              <styled.Error>Title is required</styled.Error>
            )}
          </styled.FieldContainer>

          <styled.FieldContainer>
            <styled.Label htmlFor={fieldName('description')}>Description</styled.Label>
            <ReactQuill
              modules={modules}
              value={getValues(fieldName('description'))}
              onChange={onDescriptionChange}
            />
          </styled.FieldContainer>

          <styled.FieldContainer>
            <styled.Label htmlFor={fieldName('priceLow')}>Price (optional)</styled.Label>
            <styled.PriceInputContainer>
              <styled.PriceInput
                type="number"
                {...register(fieldName('priceLow'), { onBlur: onPriceBlur })}
              />
              {isPriceRange && (
                <>
                  <span> - </span>
                  <styled.PriceInput
                    type="number"
                    {...register(fieldName('priceHigh'), { onBlur: onPriceBlur })}
                  />
                </>
              )}
            </styled.PriceInputContainer>

            <styled.PriceRangeContainer>
              <input
                name={fieldName('isPriceRange')}
                type="checkbox"
                checked={isPriceRange}
                onChange={() => {
                  setIsPriceRange(!isPriceRange);
                }}
              />
              <styled.Label htmlFor={fieldName('isPriceRange')}>Range</styled.Label>
            </styled.PriceRangeContainer>
          </styled.FieldContainer>

          <styled.SubmitContainer>
            {!isSaving && (
              <styled.SubmitButton type="submit" form={fieldName('EditGiftForm')}>
                {submitButtonText(isNew)}
              </styled.SubmitButton>
            )}
            {isSaving && (
              <styled.SavingButton disabled={true}>
                <i>
                  <MdAutorenew size={25} />
                </i>
                <span>Saving ...</span>
              </styled.SavingButton>
            )}
          </styled.SubmitContainer>
        </styled.EditGiftForm>
      </layout.GridRow>
    </styled.Component>
  );
};

EditGift.propTypes = {
  gift: PropTypes.object.isRequired,
  askerId: PropTypes.number.isRequired,
  isPrivate: PropTypes.bool,
  isGroup: PropTypes.bool,
  cancelHandler: PropTypes.func,
  saveHandler: PropTypes.func,
};

EditGift.defaultProps = {
  isPrivate: false,
  isGroup: false,
  cancelHandler: () => {},
  saveHandler: () => {},
};

export default EditGift;
