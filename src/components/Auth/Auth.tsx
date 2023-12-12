import { withLayout } from '../Layout/Layout';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormAuth from '../FormAuth/FormAuth';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../share/hooks.redux';
import { useEffect } from 'react';

function Auth(): JSX.Element {
  const navigate = useNavigate();
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => { 
    if (token !== '') {
      navigate("/");
    }
  }, [navigate, token])
  return (
    <div className='container my-5'>
      <Tabs defaultActiveKey='login' className='mb-3 w-25'>
        <Tab eventKey='login' title='Login'>
          <FormAuth isReg={false} id={1} />
        </Tab>
        <Tab eventKey='signup' title='Sign Up'>
          <FormAuth isReg={true} id={2}/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default withLayout(Auth);
