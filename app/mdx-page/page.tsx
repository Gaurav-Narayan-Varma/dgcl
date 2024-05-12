import Welcome from "@/markdown/welcome.mdx";

interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

function CustomH1({ children }: Props) {
  return <h1 style={{ color: "blue", fontSize: "100px" }}>{children}</h1>;
}

const overrideComponents = {
  h1: CustomH1,
};

export default function Page() {
  return <Welcome components={overrideComponents} />;
}
