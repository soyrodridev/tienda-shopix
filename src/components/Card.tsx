import Image from "next/image"
import cardstyle from "@/styles/cardstyle.module.css"
 function Card() {
  return (
    <>
    <div className={cardstyle.card}>
      <div className="">
        <Image src="/images/joystick-principal.webp"
        alt="Img Joys"
        width={100}
        height={100}
        className={cardstyle.cardimage}
        />
        <p className={cardstyle.title}>Console and joystick</p>
      </div>
    </div>
  </>
  )
}
export default Card