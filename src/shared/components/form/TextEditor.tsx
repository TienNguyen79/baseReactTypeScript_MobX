import {Editor} from "@tinymce/tinymce-react";

interface EditorProps {
    textLabel?:string
    content?:string
    onChange?: (value: string) => void;
}

const TextEditor: React.FC<EditorProps> = ({textLabel,content,onChange}) => {
    return (
        <>
             <label htmlFor="short_description">{textLabel}</label>
            <Editor
                value={content}
                onEditorChange={(newValue) => onChange?.(newValue)}
                init={{
                    height: 300,
                    menubar: true,
                    script_url: 'https://cdn.ommani.net/tinymce/tinymce.min.js',
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'wordcount',
                        'emoticons', 'template', 'print', 'hr', 'paste', 'importcss',
                        'autosave', 'directionality', 'visualchars', 'codesample',
                        'quickbars', 'nonbreaking', 'toc', 'imagetools', 'textpattern'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic strikethrough forecolor backcolor | link image media | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | removeformat | ' +
                        'code fullscreen | preview | searchreplace | ' +
                        'visualblocks visualchars | emoticons template | ' +
                        'insertdatetime hr nonbreaking toc | ' +
                        'help',
                    statusbar: false,
                    promotion: false,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
};

export default TextEditor;
