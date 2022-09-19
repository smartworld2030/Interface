import { Modal } from 'antd'

const info = () =>
  Modal.info({
    title: `Smart world Metaverse`,
    content: (
      <div>
        <b>The attractive, momentous and moneymaker Metaverse world</b>
        <hr />
        <p>
          Metaverse is a virtual world which creates from the AR and VR
          technologies composition Shortly, Metaverse means a platform or 3D
          space where the people appear as the avatar (Avatar is your character
          which can be an animal, human, or other different appearances in the
          Metaverse platform and the game space.)  This presence can be for
          social connections, purchasing from the available markets, meeting or
          concert attendance on a platform
        </p>
      </div>
    ),
    closable: true,
  })

export default info
