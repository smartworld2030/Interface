import React from 'react'
import Button from 'antd/lib/button'
import { CopyOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import Tooltip from 'antd/lib/tooltip'
import notification from 'antd/lib/notification'

const StyledButton = styled(Button)`
  align-items: baseline;
  padding: 2px;
  margin-bottom: 5px;
`

interface RefButtonProps {
  project: string
  link: string
}

export const RefButton: React.FC<RefButtonProps> = ({ project, link }) => (
  <Tooltip title="Copy your refferal link!">
    <StyledButton
      type="primary"
      icon={<CopyOutlined />}
      onClick={() => {
        if (navigator.clipboard) navigator.clipboard.writeText(link)
        else {
          var textField = document.createElement('textarea')
          textField.innerText = link
          document.body.appendChild(textField)
          textField.select()
          document.execCommand('copy')
          textField.remove()
        }
        notification.success({
          message: 'Reffral Link Copied!',
          placement: 'bottomRight',
          duration: 2,
          closeIcon: <div></div>,
        })
      }}
    >
      Your {project} refferal link!
    </StyledButton>
  </Tooltip>
)
