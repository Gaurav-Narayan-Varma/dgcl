export type PostForm = {
  id: string;
  tagline: string;
  content: string;
};

export type ServiceMetaData = {
  name: string;
  slug: string;
}[];

export type ServiceEditorState = {
  editor_state: string;
}[];
