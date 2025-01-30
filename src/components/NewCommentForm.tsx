import React, { Dispatch, useState } from 'react';
import { createComments } from '../api/api';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null;
  setComments: Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({ selectedPost, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorBody, setHasErrorBody] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasErrorName(false);
  }

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasErrorEmail(false);
  }

  const handleInputBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasErrorBody(false);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedPost === null) {
      return;
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      if (!name.trim()) {
        setHasErrorName(true);
      }

      if (!email.trim()) {
        setHasErrorName(true);
      }

      if (!body.trim()) {
        setHasErrorName(true);
      }

      return;
    }

    if (!hasErrorName && !hasErrorEmail && !hasErrorBody) {
      setAddLoading(true);
    }

    const newComment = {
      id: 0,
      name: name,
      email: email,
      body: body,
      postId: selectedPost?.id ?? 0,
    };


    createComments(newComment)
    .then(comment => {
      setComments((prevComments) => [...prevComments, comment as Comment]);
      setAddLoading(false);
      setBody('');
    });
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorBody(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className="input is-danger"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className="input is-danger"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className="textarea is-danger"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link" onClick={addComment}>
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
