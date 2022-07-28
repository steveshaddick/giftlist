import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import { MdAutorenew } from 'react-icons/md';

import {
  updateGift as apiUpdateGift,
  addAskingGift as apiAddAskingGift
} from 'utilities/api';

import 'react-quill/dist/quill.snow.css';
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
    isNew,
    id,
    title,
    priceLow,
    priceHigh,
    description,
    cancelHandler,
    saveHandler,
    apiSave,
  } = props;

  const { register, formState: { errors }, setValue, getValues, handleSubmit } = useForm({
    defaultValues: {
      id: id,
      title: title,
      description: description,
      priceLow: priceLow,
      priceHigh: priceHigh,
    }
  });

  const onSubmit = (data) => {
    if (isSaving) {
      return;
    }

    apiSave({
      gift: data,
    })
      .then(response => {
        setIsSaving(false);
        saveHandler(response);
      });

    setIsSaving(true);
  };

  const onDescriptionChange = (data) => {
    setValue("description", data);
  };

  const [ descriptionText, setDescriptionText ] = useState(description);
  const [ isPriceRange, setIsPriceRange ] = useState(priceLow !== priceHigh);
  const [ isSaving, setIsSaving ] = useState(false);

  const onPriceBlur = (e) => {
    const [ priceLowVal, priceHighVal ] = getValues(['priceLow', 'priceHigh']);
    const priceLow = parseInt(priceLowVal);
    const priceHigh = parseInt(priceHighVal);

    switch (e.target.name) {
      case 'priceLow':
        if (priceLow > priceHigh) {
          setValue('priceHigh', priceLow);
        }
        break;

      case 'priceHigh':
        if (priceLow > priceHigh) {
          setValue('priceLow', priceHigh);
        }
        break;
    }
  }

  useEffect(() => {
    if (isPriceRange) {
      if (getValues("priceHigh") == '') {
        setValue("priceHigh", parseInt(getValues("priceLow")) + 10);
      }
    } else {
      setValue("priceHigh", getValues("priceLow"));
    }
  }, [isPriceRange]);

  return (
    <styled.Component>
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

      <styled.EditGiftForm id="EditGiftForm" onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" {...register("id")} />

        <styled.FieldContainer>
          <styled.Label htmlFor="title">Title</styled.Label>
          <styled.Input placeholder="Gift title" {...register("title", { required: true })} />
          <styled.Error>
            { errors.title?.type === 'required' && "Title is required" }
          </styled.Error>
        </styled.FieldContainer>

        <styled.FieldContainer>
          <styled.Label htmlFor="description">Description</styled.Label>
          <ReactQuill
            modules={modules}
            value={ descriptionText }
            onChange={onDescriptionChange}
            />
        </styled.FieldContainer>

        <styled.FieldContainer>
          <styled.Label htmlFor="priceLow">Price (optional)</styled.Label>
          <styled.PriceInputContainer>
            <styled.PriceInput type="number" {...register("priceLow", { onBlur: onPriceBlur })} />
            { isPriceRange &&
              <>
                <span> - </span>
                <styled.PriceInput type="number" {...register("priceHigh", { onBlur: onPriceBlur })} />
              </>
            }
          </styled.PriceInputContainer>
          
          <styled.PriceRangeContainer>
            <input id="isPriceRange" type="checkbox" value={ isPriceRange } onChange={() => {
              setIsPriceRange(!isPriceRange);
            }} />
            <styled.Label htmlFor="isPriceRange">Range</styled.Label>
          </styled.PriceRangeContainer>
        </styled.FieldContainer>
        
        <styled.SubmitContainer>
          { !isSaving &&
            <styled.SubmitButton type="submit" form="EditGiftForm">{ submitButtonValue(isNew) }</styled.SubmitButton>
          }
          { isSaving &&
            <styled.SavingButton disabled={ true }>
              <i><MdAutorenew size={ 25 }/></i>
              <span>Saving ...</span>
            </styled.SavingButton>
          }
        </styled.SubmitContainer>
      </styled.EditGiftForm>
    </styled.Component>
  );
};

EditGift.propTypes = {
};

export default EditGift;
