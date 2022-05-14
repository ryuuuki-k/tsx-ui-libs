import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import RichEditorToolbar from '../../components/RichEditorToolbar';

const RichEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: 'Initialize',
    editorProps: {
      attributes: {
        class: 'prose prose-xl focus:outline-none border p-4 prose',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="m-10 justify-center rounded-xl border-2 bg-teal-100">
      <RichEditorToolbar editor={editor} />
      <div className="p-4"></div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;
