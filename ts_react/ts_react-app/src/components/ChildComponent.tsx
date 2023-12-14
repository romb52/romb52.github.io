interface IchangeFunc{
    changeFunc:(a:number)=> void;
    count: number;
}

export default function ChildComponent({changeFunc,count}:IchangeFunc): JSX.Element{
    return <> <button onClick={():void=> changeFunc(count)}>add</button></>;
}