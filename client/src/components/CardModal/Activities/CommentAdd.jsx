import React, { useCallback, useRef, useState, onChange } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { MentionsInput, Mention } from 'react-mentions';
import { useDidUpdate, useToggle } from '../../../lib/hooks';
import { useClosableForm, useForm } from '../../../hooks';

import styles from './CommentAdd.module.scss';

const DEFAULT_DATA = { text: '' };

const CommentAdd = React.memo(({ onCreate, users }) => {
  const [t] = useTranslation();
  const [selectTextField] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);
  // const [data, handleFieldChange, setData] = useForm(DEFAULT_DATA);

  const [selectTextFieldState] = useToggle();

  const textField = useRef(null);
  const users2 = users.map((user) => ({ ...user, display: user.user.name }));
  // const close = useCallback(() => {
  //   setIsOpened(false);
  // }, []);

  const handleFieldFocus = () => {
    setIsOpened(true);
    console.log(users2);
  };

  const submit = () => {
    onCreate(data);
    setData(DEFAULT_DATA);
    // selectTextField();
  };
  const handleFieldKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      submit();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    submit();
  };
  // const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(close);

  // const users = [
  //   // Add this line
  //   { id: '1', display: 'John Doe' },
  //   { id: '2', display: 'Jane Doe' },
  //   { id: '3', display: 'John Smith' },
  //   { id: '4', display: 'Jane Smith' },
  // ];
  // const handleChange = (event) => {
  //   const value = event.target;
  //   setData(data.text);
  // };

  // const [data, setData] = useState(initialData);

  const handleChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      text: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <MentionsInput
        value={data.text}
        onChange={handleChange}
        onFocus={handleFieldFocus}
        className={styles.field}
      >
        <Mention
          trigger="@"
          data={users2}
          markup="@[__display__](/)"
          className={styles.mentions__mention}
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <div className="">{highlightedDisplay}</div>
          )}
        />
      </MentionsInput>
      {isOpened && (
        <div className={styles.controls}>
          <Button positive content={t('action.addComment')} />
        </div>
      )}
    </form>
  );
});

CommentAdd.propTypes = {
  onCreate: PropTypes.func.isRequired,
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
};

export default CommentAdd;
