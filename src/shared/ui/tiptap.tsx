
'use client'

import { Button } from '@/shared/ui/button'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AlignCenterIcon, AlignHorizontalJustifyCenter, AlignLeftIcon, AlignRightIcon, Bold, HighlighterIcon, ImageIcon, Italic, Strikethrough } from 'lucide-react'

const MenuBar = ({ editor }: { editor: Editor }) => {
    if (!editor) {
        return null
    }

    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }


    return (
        <div className="flex gap-3">

            <Button
                variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                H1
            </Button>

            <Button
                variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                H2
            </Button>

            <Button
                variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                H3
            </Button>

            <Button
                variant={editor.isActive('paragraph') ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().setParagraph().run()}
            >
                Paragraph
            </Button>

            <Button
                variant={editor.isActive('bold') ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold />
            </Button>

            <Button
                variant={editor.isActive('italic') ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic />
            </Button>

            <Button
                variant={editor.isActive('strike') ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough />
            </Button>

            <Button
                variant={editor.isActive('highlight') ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
                <HighlighterIcon />
            </Button>

            <Button
                variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeftIcon />
            </Button>

            <Button
                variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenterIcon />
            </Button>

            <Button
                variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRightIcon />
            </Button>

            <Button
                variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'outline'}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            >
                <AlignHorizontalJustifyCenter />
            </Button>
            <Button variant={'outline'} onClick={addImage}><ImageIcon /></Button>
        </div>
    )
}

interface TiptapProps {
    value: string
    onChange: (value: string) => void
}
export const Tiptap = ({ value, onChange }: TiptapProps) => {

    const editor = useEditor({
        extensions: [StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Image
        ],
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        content: value,
    })
    if (!editor) return;

    return <div className='flex flex-col gap-3'>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className='rounded-lg min-h-12 lg bg-slate-100' />
    </div>
}

