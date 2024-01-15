export default function Image({ isOpen, src, changeActiveCard }) {
  console.log(isOpen)
  return <div onClick={()=>changeActiveCard(src)}>
    <img src={isOpen ? src : './images/default.jpg'}  alt="" width="300" />
  </div>
}