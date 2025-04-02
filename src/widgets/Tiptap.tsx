
'use client'

import { Button } from '@/shared/ui/button'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
    })

    return <div><EditorContent editor={editor} />
        <Button onClick={() => console.log(editor?.getHTML())}>save</Button>

        <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() as string }} />
    </div>
}

