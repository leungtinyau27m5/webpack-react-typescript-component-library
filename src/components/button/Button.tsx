import React from 'react'
import { Button } from 'antd'
import { MyButtonProps } from './types'

const MyButton = (props: MyButtonProps) => {
  return <Button type={props.type}>Button</Button>
}

export default MyButton