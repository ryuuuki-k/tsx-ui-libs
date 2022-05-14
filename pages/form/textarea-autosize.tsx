import { ChangeEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const TextAreaAutoSize = () => {
  const [text, setText] = useState('');

  const textChageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  console.log(text);

  return (
    <div className="m-10 flex">
      <TextareaAutosize
        autoFocus
        minRows={3}
        className="border"
        onChange={textChageHandler}
      />
      <div>{text}</div>
    </div>
  );
};

export default TextAreaAutoSize;
