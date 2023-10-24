import { useParams } from 'react-router-dom';

export default function Page() {
  const { id } = useParams();
  return (
    <section>
      <div className='container'>
        <p>{id}</p>
      </div>
    </section>
  );
}
