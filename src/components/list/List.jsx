import ListItem from '../listItem/ListItem';

export default function List({ arr, objArr }) {
  const sum = objArr.reduce((acc, item) => acc + item.price, 0);
  const discount = 20;
  const finishSum = ((sum * (100 - discount)) / 100).toFixed(2);
  const del = sum - finishSum;
  return (
    <>
      <ul>
        {arr.map((item, i) => (
          <li key={`${i + 1}-${item}`}>{item}</li>
        ))}
      </ul>
      <ol>
        {objArr.map((item) => {
          const newPrice = ((item.price * (100 - discount)) / 100).toFixed(2);
          return <ListItem key={item.id} item={item} newPrice={newPrice} />;
        })}
      </ol>

      <h3>Sum: {sum} $</h3>
      <h3>FinishSum: {finishSum} $</h3>
      <h3>Economy: {del} $</h3>
    </>
  );
}
