"use client";

import { useEffect, useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./ToolBarPlugin";
import ExampleTheme from "./ExampleTheme";
import "@/styles/editor.css";
import { Button } from "../ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createPost } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { HeadingNode } from "@lexical/rich-text";
import { $generateHtmlFromNodes } from "@lexical/html";

function onError(error: any) {
  console.error(error);
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Editor() {
  const initialState = { message: "null", errors: {} };
  const [serviceName, setServiceName] = useState("");
  const [editorStateInJSON, setEditorStateInJSON] = useState<any>("");
  const [html, setHtml] = useState("");
  const [state, dispatch] = useFormState(createPost, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  function MyOnChangePlugin(props: { onChange: (html: any) => void }): any {
    const { onChange } = props;
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          setEditorStateInJSON(JSON.stringify(editor.getEditorState()));
          onChange(htmlString);
        });
      });
    }, [editor, onChange]);
  }

  const handleServiceNameChange = (e: any) => {
    setServiceName(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tagline", serviceName);
    formData.append("content", html);
    formData.append("editor_state", editorStateInJSON);
    dispatch(formData);
  };

  const initialConfig = {
    namespace: "MyEditor",
    theme: ExampleTheme,
    onError,
    nodes: [HeadingNode],
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col self-center w-4/5">
      {/* Tagline */}
      <div className="flex gap-3 mt-3">
        <label className={`self-center`}>Step 1. Enter the service name:</label>
        <div className="flex flex-col">
          <Input
            className="border border-slate-300 self-center w-full"
            onChange={handleServiceNameChange}
            ref={inputRef}
          />
          {state.errors?.tagline &&
            state.errors.tagline.map((error: string) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Content */}
      <section className="mt-3 flex flex-col  w-full">
        <label className="-mb-3">Step 2. Enter in your content:</label>
        <LexicalComposer initialConfig={initialConfig}>
          <div className="mt-6 rounded-md text-black relative leading-20 font-normal text-left">
            <ToolbarPlugin />

            <div className="bg-white relative border border-[#808080]">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <MyOnChangePlugin
                onChange={(htmlString: any): any => {
                  setHtml(htmlString);
                }}
              />
            </div>
          </div>
        </LexicalComposer>
        {state.errors?.editor_state &&
          state.errors.editor_state.map((error: string) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </section>

      {/* Submission */}
      <section className="flex items-center gap-3 mt-3">
        <label>Step 3. Publish the service:</label>
        <Button type="submit" className="text-center min-w-1/6 self-center">
          Create Service
        </Button>
      </section>
    </form>
  );
}
