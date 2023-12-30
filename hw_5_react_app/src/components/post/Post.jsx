import { useParams } from "react-router-dom"

export default function Post() {
    const { id } = useParams();
    return <section>
        <div className="container">{ id }</div>
    </section>

}