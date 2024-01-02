import { Button} from "react-bootstrap";

export default function LoginPage(){
    return (
        <>      
          <section>
            <div className='container'>
             <Button onClick={()=> localStorage.setItem('token', '1111')}>login</Button>
            </div>
          </section>      
        </>
      );
}

