import { motion } from 'framer-motion'
import useTilt from '../hooks/useTilt'

export default function Tilt({ children, max = 8, as = 'div', className = '', ...rest }) {
  const tilt = useTilt(max)
  const Tag = motion[as]
  return (
    <Tag className={className} {...tilt} {...rest}>
      {children}
    </Tag>
  )
}
