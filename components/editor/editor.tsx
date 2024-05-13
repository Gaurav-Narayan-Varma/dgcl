"use client";

import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./ToolBarPlugin";
import ExampleTheme from "./ExampleTheme";
import "@/styles/editor.css";
import { Button } from "../ui/button";
import { useRef } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";

const theme = {};

function onError(error: any) {
  console.error(error);
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function MyOnChangePlugin(props: {
  onChange: (editorState: any) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;
  useEffect(() => {
    return editor.registerUpdateListener((editorState) => {
      onChange(editorState);
    });
  }, [onChange, editor]);
  return null;
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />

        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyOnChangePlugin
            onChange={(editorState) => {
              const text = editorState?.editorState?._nodeMap?.get("3")?.__text;
              text && console.log(text);
            }}
          />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
