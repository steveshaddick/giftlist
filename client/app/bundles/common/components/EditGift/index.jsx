import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import { MdAutorenew } from 'react-icons/md';

import 'react-quill/dist/quill.snow.css';
import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const modules = {
  toolbar: [
    ['link', 'bold', 'italic', {'list': 'ordered'}, {'list': 'bullet'}, 'clean'],
  ],
};

function submitButtonValue(isNew) {
  if (isNew) {
    return "Add";
  } else {
    return "Save";
  }
}

const EditGift = (props) => {
  const {
    gift,
    cancelHandler,
    saveHandler,
    apiSave,
  } = props;
  const { id, title, description, priceHigh, priceLow } = gift || {};
  
  const fieldId = id ? id : 'new';
  const fieldName = (name) => {
    return `${name}_${fieldId}`;
  }
  const getDefaultValues = () => {
    let obj = {};
    obj[fieldName('id')] = id || '';
    obj[fieldName('title')] = title || '';
    obj[fieldName('description')] = description || '';
    obj[fieldName('priceLow')] = priceLow || '';
    obj[fieldName('priceHigh')] = priceHigh || '';

    return obj;
  }

  const { register, formState: { errors }, setValue, getValues, handleSubmit } = useForm({
    defaultValues: getDefaultValues()
  });

  const onSubmit = (formData) => {
    if (isSaving) {
      return;
    }

    let giftData = {};
    for (let uniqueKey in formData) {
      const [ key ] = uniqueKey.split('_');
      giftData[key] = formData[uniqueKey];
    }

    apiSave({
      gift: giftData,
    })
      .then(response => {
        setIsSaving(false);
        if (saveHandler) {
          saveHandler(response);
        }
      });

    setIsSaving(true);
  };

  const onDescriptionChange = (data) => {
    setValue(fieldName('description'), data);
  };

  const isNew = typeof gift !== 'object';

  const [ isPriceRange, setIsPriceRange ] = useState(priceLow !== priceHigh);
  const [ isSaving, setIsSaving ] = useState(false);

  const onPriceBlur = (e) => {
    const [ priceLowVal, priceHighVal ] = getValues([fieldName('priceLow'), fieldName('priceHigh')]);
    const priceLow = parseInt(priceLowVal);
    const priceHigh = parseInt(priceHighVal);

    switch (e.target.name) {
      case `priceLow_${fieldId}`:
        if (priceLow > priceHigh) {
          setValue(fieldName('priceHigh'), priceLow);
        }
        break;

      case `priceHigh_${fieldId}`:
        if (priceLow > priceHigh) {
          setValue(fieldName('priceLow'), priceHigh);
        }
        break;
    }
  }

  useEffect(() => {
    if (isPriceRange) {
      if (getValues(fieldName('priceHigh')) == '') {
        setValue(fieldName('priceHigh'), parseInt(getValues(fieldName('priceLow'))) + 10);
      }
    } else {
      setValue(fieldName('priceHigh'), getValues(fieldName('priceLow')));
    }
  }, [isPriceRange]);
  
  return (
    <styled.Component>
      <layout.GridRow>
        <styled.TitleContainer>
          { isNew &&
            <styled.Title>
              Add to list
            </styled.Title>
          }
          { !isNew &&
            <styled.Title>
              Editing gift
            </styled.Title>
          }

          <button onClick={ cancelHandler }>Cancel</button>
        </styled.TitleContainer>

        <styled.EditGiftForm id={ fieldName('EditGiftForm') } onSubmit={handleSubmit(onSubmit)}>

          <input type="hidden" {...register(fieldName('id'))} />

          <styled.FieldContainer>
            <styled.Label htmlFor={ fieldName('title') }>Title</styled.Label>
            <styled.Input placeholder="Gift title" {...register(fieldName('title'), { required: true })} />
            { errors[fieldName('title')]?.type === 'required' &&
              <styled.Error>Title is required</styled.Error>
            }
          </styled.FieldContainer>

          <styled.FieldContainer>
            <styled.Label htmlFor={ fieldName('description') }>Description</styled.Label>
            <ReactQuill
              modules={ modules }
              value={ getValues(fieldName('description')) }
              onChange={ onDescriptionChange }
              />
          </styled.FieldContainer>

          <styled.FieldContainer>
            <styled.Label htmlFor={ fieldName('priceLow') }>Price (optional)</styled.Label>
            <styled.PriceInputContainer>
              <styled.PriceInput type="number" {...register(fieldName('priceLow') , { onBlur: onPriceBlur })} />
              { isPriceRange &&
                <>
                  <span> - </span>
                  <styled.PriceInput type="number" {...register(fieldName('priceHigh') , { onBlur: onPriceBlur })} />
                </>
              }
            </styled.PriceInputContainer>
            
            <styled.PriceRangeContainer>
              <input id={ fieldName('isPriceRange') } type="checkbox" value={ isPriceRange } onChange={() => {
                setIsPriceRange(!isPriceRange);
              }} />
              <styled.Label htmlFor={ fieldName('isPriceRange') }>Range</styled.Label>
            </styled.PriceRangeContainer>
          </styled.FieldContainer>
          
          <styled.SubmitContainer>
            { !isSaving &&
              <styled.SubmitButton type="submit" form={ fieldName('EditGiftForm') }>{ submitButtonValue(isNew) }</styled.SubmitButton>
            }
            { isSaving &&
              <styled.SavingButton disabled={ true }>
                <i><MdAutorenew size={ 25 }/></i>
                <span>Saving ...</span>
              </styled.SavingButton>
            }
          </styled.SubmitContainer>
        </styled.EditGiftForm>
      </layout.GridRow>
    </styled.Component>
  );
};

EditGift.propTypes = {
};

export default EditGift;
