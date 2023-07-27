import { HtmlHTMLAttributes, PropsWithChildren } from "react";
type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>;

export default function Box(props: Props) {
  return <div {...props}>{props.children}</div>;
}
