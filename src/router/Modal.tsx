import { Modal } from 'antd'

const info = () =>
  Modal.info({
    title: 'Dear Smart World User',
    content: (
      <p>
        We apologize to those who are Smart world companions, thanks for your
        patience. The interest payment is made monthly for a while and the
        payment cycle will be started soon. During this time for smart world
        support and earning users can focus on other projects including the
        Metaverse lands and games. Best services presentation is our main
        mission. All projects and updates are based on this strategy. We
        appreciate all your support.
      </p>
    ),
    closable: true,
  })

export default info
