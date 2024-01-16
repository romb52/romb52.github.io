export default function Image({ isOpen, src, changeActiveCard }) {

  return <div onClick={()=>changeActiveCard(src)}>
    <img src={isOpen ? src : './images/present.png'}  alt="" width="300"  style={{
        transition: 'transform 0.5s ease',
        transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}/>
  </div>
}