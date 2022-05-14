import { Editor } from '@tiptap/react';
import { NextPage } from 'next';
import { ChangeEvent } from 'react';

import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdHorizontalRule,
  MdImage,
  MdRedo,
  MdTitle,
  MdUndo,
} from 'react-icons/md';

interface Props {
  editor: Editor;
}

const RichEditorToolbar: NextPage<Props> = ({ editor }) => {
  const setImage = () => {
    const url = window.prompt('URL');
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex gap-2 border-b p-4 text-2xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? '' : 'opacity-40'}
      >
        <MdFormatBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? '' : 'opacity-40'}
      >
        <MdFormatItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('static') ? '' : 'opacity-40'}
      >
        <MdFormatStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? '' : 'opacity-40'}
      >
        <MdCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderList') ? '' : 'opacity-40'}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={!editor.isActive('bulletList') ? 'opacity-20' : ''}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={!editor.isActive('orderedList') ? 'opacity-20' : ''}
      >
        <MdFormatListNumbered />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          !editor.isActive('heading', { level: 1 }) ? 'opacity-20' : ''
        }
      >
        <MdTitle />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={!editor.isActive('blockquote') ? 'opacity-20' : ''}
      >
        <MdFormatQuote />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <MdHorizontalRule />
      </button>
      <button onClick={setImage}>
        <MdImage />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <MdUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <MdRedo />
      </button>
    </div>
  );
};

export default RichEditorToolbar;
