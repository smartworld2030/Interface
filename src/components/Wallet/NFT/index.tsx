import { Typography } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import Colors from 'Theme/Colors'
import { pushTile } from '_actions/land.actions'
import land from '_contracts/land'
import { AppActions, AppState } from '_types'
interface NFTProps {
  isMobile: boolean
}

type IProps = NFTProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

let controllers: { [key: string]: AbortController } = {}

const NFT: React.FC<IProps> = ({ isMobile, loading, ownedLands, pushTile }) => {
  const [urlLoading, setUrlLoading] = useState(false)
  const [urls, setUrl] = useState([])

  const fetchData = useCallback(async (URL: string, id: number) => {
    controllers[id] = new AbortController()
    const res = await axios.get(URL, {
      signal: controllers[id].signal,
    })
    return res.data
  }, [])

  useEffect(() => {
    const async = async () => {
      setUrlLoading(true)

      Promise.all(
        ownedLands.map((id) => fetchData(`${land.ipfs}/${id}.json`, id))
      ).then((res) => {
        setUrl(res)
        setUrlLoading(false)
      })
    }

    async()

    return () => {
      Object.values(controllers).forEach((controller) => {
        controller.abort()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownedLands])

  return (
    <Row
      justify="around"
      align="center"
      direction={isMobile ? 'column' : 'row'}
      style={{ marginTop: '2rem' }}
    >
      {!urls.length && (urlLoading || loading) ? (
        <Typography.Text>Loading...</Typography.Text>
      ) : urls.length ? (
        urls.map(({ name, image, description }, i) => (
          <div
            key={name}
            onClick={() => pushTile(ownedLands[i])}
            style={{
              cursor: 'pointer',
              display: 'flex',
              width: '300px',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              margin: '1rem',
            }}
          >
            <Typography.Title level={4}>{name}</Typography.Title>
            <img
              alt={name}
              src={`${land.prefix}/${image.replace(':/', '')}`}
              onError={(e) => {
                // refetch
                const id = ownedLands[i]
                controllers[id] = new AbortController()
                console.log('refetching')
                fetchData(`${land.ipfs}/${id}.json`, id).then((res) => {
                  setUrl((prev) => {
                    const newUrls = [...prev]
                    newUrls[i] = res.data
                    return newUrls
                  })
                })
              }}
              style={{
                width: 100,
                height: 100,
                margin: 10,
                borderRadius: '50%',
                border: '3px solid',
                padding: 5,
                borderColor: Colors.green,
                textAlign: 'center',
                objectFit: 'cover',
              }}
            />
            {description}
          </div>
        ))
      ) : (
        <Typography.Text>No NFTs found</Typography.Text>
      )}
    </Row>
  )
}

const mapStateToProps = (state: AppState) => {
  const { ownedLands, loading } = state.land
  return {
    loading,
    ownedLands,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  pushTile: bindActionCreators(pushTile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(NFT)
