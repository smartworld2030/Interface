import React from 'react'
import { Col, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { AppState } from '../../../_types'

interface IProps {
  isMobile: boolean
}

type InfoProps = IProps & ReturnType<typeof mapStateToProps>

const Land: React.FC<InfoProps> = () => {
  return (
    <Row justify="around" align="center" direction="column">
      <Row
        justify="around"
        align="center"
        style={{ minHeight: 100, margin: '0 10px' }}
      >
        <Col>
          The previous year flew by for all cryptocurrency supporters, and the
          current climate should be remembered as another winter in
          cryptocurrencies. Smart World endeavors to adapt to the current
          circumstances. During a year, some presented modifications and
          updates, like any other shifts, were acceptable to some people and
          have led them to progress, but have been envenomed to others. Some
          great companies, pronounced labs, and popular exchanges in this
          territory were compelled to declare bankruptcy. The great DEFI world
          platforms like Compound or AAVE had to switch their performance and
          profit with their monthly updates to keep body and soul together in
          the bear market. We appreciate those who help with the Smart World
          promotion. The Smart World team was not kicking their heels throughout
          this nightmare and has gone the extra mile to accomplish the new
          spectrum of services and projects. Let’s review the smart world ahead
          plans Metaverse Smart World The attractive, momentous, and Moneymaker
          Metaverse world metaverse is a virtual world which creates from the AR
          and VR technologies composition. Shortly, Metaverse means a platform
          or 3D space where people appear as their avatars (an avatar is your
          character, which can be an animal, human, or other different
          appearances in the Metaverse platform and the game space). This
          presence can be for social connections, purchasing from the available
          markets, or attending meetings or concerts on a platform. Consider
          having multiple avatars in the street where you own land, which is the
          same as having a shop on a busy street. The Smart World Metaverse has
          been based on some essential elements such as entertainment,
          communications, user interaction, and play to earn. The smart world
          Metaverse is inspired by the great "Minecraft" game, which includes 10
          thousand unique Metaverse land pieces. Each land piece will be sold at
          a fixed price on the initial auction. Afterward, the rest of the land
          prices will be different depending on their features. The users who
          buy the lands beforehand will be the most precious ones with low
          prices. You will be entitled to 25% of the sold land cost if you
          introduce a new buyer. The lands include some attributes like seasons,
          the construction sector, and promotional banners. They may also be
          gold, diamond, or coal mines or have timber export potential. The
          landlords can sell their assets (coal, gold, wood) to those who need
          construction on their land. Some lands have a promotional banner.
          Their holders can either propagandize their own business, rent out the
          banner or their plot to applicants, and BNB charges the rent fee.
          After 25 percent of the land is sold, the selling process will be
          started in the Smart World exclusive marketplace and the Pancake Swap
          NFT market. The Smart World Metaverse game is based on the land user’s
          construction for purposes such as presentation services offices,
          publicity, and selling products agencies. Growing the construction on
          the land will increase the Smart World visitors, so naturally t, the
          land price will be increased a thousandfold. We have overcome all
          challenges and we will make an effort to appreciate our obligated
          users with our new plans. We have had success consistently for our
          entourage. Unfortunately, the smart world does not require upset,
          angry, and irritated users. Generally, the DEFI and its platforms are
          a new and adventurous concept and we should consider the blockchain
          limitations. The stopped users paying profit in the investment section
          have received interest on more than their initial investment amount,
          and according to the Smart World market conditions, there will be no
          more interest payments to them. The users who have not reached the
          full profit will be able to get the rest of their profit. Smart World
          has started to work with the globalization mindset. It supports its
          community for this aimed achievement.
        </Col>
      </Row>
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { tokens, error, address } = state.account
  const { chainId } = state.wallet
  return {
    chainId,
    address,
    tokens,
    error,
  }
}

export default connect(mapStateToProps)(Land)
