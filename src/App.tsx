import React from 'react';
import { withLayout } from './components/Layout/Layout';


function App(): JSX.Element {
 
  return (
    <div className='container'>
      <h1>Hello</h1>
    </div>
  );
}

export default withLayout(App);
