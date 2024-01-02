import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <section>
        <div className='container'>
          <h1>Home page</h1>
          <Button variant="primary" onClick={handleShow}>
            Launch
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements you
              have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </section>
    </>
  );
}

export default App;

