interface IChildComponent {
  changeFunc: (a: number) => void;
  count: number;
}
export default function ChildComponent({
  changeFunc,
  count,
}: IChildComponent): JSX.Element {
  return <button onClick={(): void => changeFunc(count)}>Add</button>;
}
