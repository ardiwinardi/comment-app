type Props = {
  message?: string;
};
export default function ErrorMessage(props: Props) {
  if (!props.message) return <></>;
  return (
    <div style={{ fontSize: 12, color: "red", paddingTop: 5 }}>
      {props.message}
    </div>
  );
}
