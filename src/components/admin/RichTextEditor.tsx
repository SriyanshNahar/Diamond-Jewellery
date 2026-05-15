import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Heading1, Heading2, Link as LinkIcon
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const btnStyle = (active: boolean) => ({
    padding: '0.4rem',
    borderRadius: '4px',
    border: 'none',
    background: active ? '#e5e7eb' : 'transparent',
    color: active ? '#111827' : '#4b5563',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', padding: '0.5rem', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive('bold'))} title="Bold"><Bold size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive('italic'))} title="Italic"><Italic size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive('underline'))} title="Underline"><UnderlineIcon size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={btnStyle(editor.isActive('strike'))} title="Strikethrough"><Strikethrough size={16} /></button>
      
      <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.5rem' }} />
      
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={btnStyle(editor.isActive('heading', { level: 1 }))} title="Heading 1"><Heading1 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={btnStyle(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive('bulletList'))} title="Bullet List"><List size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive('orderedList'))} title="Numbered List"><ListOrdered size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btnStyle(editor.isActive('blockquote'))} title="Quote"><Quote size={16} /></button>
      
      <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.5rem' }} />

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} style={btnStyle(editor.isActive({ textAlign: 'left' }))} title="Align Left"><AlignLeft size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} style={btnStyle(editor.isActive({ textAlign: 'center' }))} title="Align Center"><AlignCenter size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} style={btnStyle(editor.isActive({ textAlign: 'right' }))} title="Align Right"><AlignRight size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} style={btnStyle(editor.isActive({ textAlign: 'justify' }))} title="Justify"><AlignJustify size={16} /></button>
      
      <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.5rem' }} />
      
      <button type="button" onClick={setLink} style={btnStyle(editor.isActive('link'))} title="Insert Link"><LinkIcon size={16} /></button>
    </div>
  );
};

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setCharCount(editor.getText().length);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 bg-white',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      setCharCount(editor.getText().length);
    }
  }, [value, editor]);

  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <MenuBar editor={editor} />
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <EditorContent editor={editor} />
      </div>
      <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', background: '#f9fafb', textAlign: 'right' }}>
        {charCount} characters
      </div>
      <style>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: '${placeholder || "Start typing..."}';
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror p { margin-top: 0; margin-bottom: 0.5em; line-height: 1.5; }
        .ProseMirror h1 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
        .ProseMirror h2 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; }
        .ProseMirror ul { padding-left: 1.5em; list-style-type: disc; margin-bottom: 0.5em; }
        .ProseMirror ol { padding-left: 1.5em; list-style-type: decimal; margin-bottom: 0.5em; }
        .ProseMirror blockquote { border-left: 3px solid #d1d5db; padding-left: 1em; color: #4b5563; margin-left: 0; margin-bottom: 0.5em; }
        .ProseMirror a { color: #3b82f6; text-decoration: underline; }
      `}</style>
    </div>
  );
}
