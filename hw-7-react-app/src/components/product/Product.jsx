import { useParams } from "react-router-dom";

export default function Product(){
    const { id } = useParams();
    return <section>
        <div className="container">
            <h2> Product {id}</h2>
        </div>
    </section>
}