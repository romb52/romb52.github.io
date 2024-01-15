export default function Image({ isOpen, src, changeActiveCard }) {

  return <div onClick={()=>changeActiveCard(src)}>
    <img src={isOpen ? src : './images/default.jpg'}  alt="" width="300" />
  </div>
}