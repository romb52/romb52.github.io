export default function Footer({ isAqua }) {
  const bg = isAqua ? 'aqua' : 'lightgreen';
  const styleFooter = {
    backgroundColor: bg,
    color: 'darkblue',
    fontWeight: 'bold',
    fontSize: '20px',
  };
  return (
    <footer style={styleFooter}>
      <div className='container'>
        <h3>Footer</h3>
      </div>
    </footer>
  );
}
