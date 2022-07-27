import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';

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
    currentUser,
  } = props;

  const { register, formState: { errors }, setValue, handleSubmit } = useForm({
    defaultValues: {
      id: id,
      title: title,
      description: description,
      priceLow: priceLow,
      priceHigh: priceHigh,
    }
  });

  const onSubmit = (data) => {
    const submitCall = isNew ? apiAddAskingGift : apiUpdateGift;

    submitCall({
      currentUser,
      gift: data,
    })
      .then(response => {
        console.log("save response", response);
        saveHandler(data);
      });
    console.log("saving", data);
  };

  const onDescriptionChange = (data) => {
    setValue("description", data);
  };

  const [ descriptionText, setDescriptionText ] = useState(description);

  return (
    <styled.Component>
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
      <styled.EditGiftForm onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" {...register("id")} />

        <styled.FieldContainer>
          <styled.Label htmlFor="title">Title</styled.Label>
          <styled.Input placeholder="Gift title" {...register("title", { required: true })} />
          { errors.title?.type === 'required' && "Title is required" }
        </styled.FieldContainer>

        <styled.FieldContainer>
          <styled.Label htmlFor="description">Description</styled.Label>
          <ReactQuill modules={modules} value={ descriptionText } onChange={onDescriptionChange} />
        </styled.FieldContainer>

        <styled.FieldContainer>
          <styled.Label htmlFor="priceLow">Price (low)</styled.Label>
          <styled.Input type="text" {...register("priceLow")} />
        </styled.FieldContainer>

        <styled.FieldContainer>
          <styled.Label htmlFor="priceHigh">Price (high)</styled.Label>
          <styled.Input type="text" {...register("priceHigh")} />
        </styled.FieldContainer>

        <input type="submit" value={ submitButtonValue(isNew) } />
        <button onClick={ cancelHandler }>Cancel</button>
      </styled.EditGiftForm>
    </styled.Component>
  );
};

EditGift.propTypes = {
};

export default EditGift;
