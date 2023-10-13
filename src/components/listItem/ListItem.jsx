export default function ListItem({ item, newPrice }) {
  return (
    <li>
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
      <h5>{newPrice} $</h5>
    </li>
  );
}
