"use client";

import { useEffect, useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ExampleTheme from "@/components/editor/ExampleTheme";
import ToolbarPlugin from "@/components/editor/ToolBarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { Button } from "@/components/ui/button";
import "@/styles/editor.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { ServiceEditorState } from "@/lib/definitions";
import { useFormState } from "react-dom";
import { updateService } from "@/lib/actions";

function onError(error: any) {
  console.error(error);
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function EditService({
  params,
}: {
  params: { "service-name": string };
}) {
  const initialState = { message: "null", errors: {} };
  const [html, setHtml] = useState("");
  const [editorStateJSONString, setEditorStateJSONString] =
    useState<ServiceEditorState | null>(null);
  const [isEditorStateLoaded, setIsEditorStateLoaded] = useState(false);
  const [state, dispatch] = useFormState(updateService, initialState);
  const [editorStateInJSON, setEditorStateInJSON] = useState<any>("");

  const serviceName = params["service-name"];

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/service-editor-state/${serviceName}`, {
        method: "GET",
        headers: {},
      });

      if (response.ok) {
        const result = await response.json();
        setEditorStateJSONString(result);
        setIsEditorStateLoaded(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function SetEditorStatePlugin(): any {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      if (editorStateJSONString && isEditorStateLoaded) {
        const editorState = editor.parseEditorState(
          editorStateJSONString[0].editor_state
        );
        editor.setEditorState(editorState);
        setIsEditorStateLoaded(false); // Reset the flag after setting the state
      }
    }, [editor, editorStateJSONString, isEditorStateLoaded]);
  }

  function MyOnChangePlugin(props: { onChange: (html: any) => void }): any {
    const [editor] = useLexicalComposerContext();
    const { onChange } = props;
    useEffect(() => {
      const unregister = editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          setEditorStateInJSON(JSON.stringify(editor.getEditorState()));
          onChange(htmlString);
        });
      });
      return () => {
        unregister();
      };
    }, [editor, onChange]);
  }

  const initialConfig = {
    namespace: "MyEditor",
    theme: ExampleTheme,
    onError,
    nodes: [HeadingNode],
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tagline", serviceName);
    formData.append("content", html);
    formData.append("editor_state", editorStateInJSON);

    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Edit the {decodeURIComponent(serviceName)} page:</div>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="mt-6 mb-4 rounded-md text-black relative leading-20 font-normal text-left">
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
            <AutoFocusPlugin />
            <SetEditorStatePlugin />
          </div>
        </div>
      </LexicalComposer>

      {/* Submission */}
      <section className="flex items-center gap-3">
        <label>Step 3. Update the service page:</label>
        <Button type="submit" className="text-center w-1/6 self-center">
          Update page
        </Button>
      </section>
    </form>
  );
}
