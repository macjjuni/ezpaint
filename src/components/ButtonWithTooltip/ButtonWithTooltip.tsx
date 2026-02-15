import { useState, useCallback } from 'react'
import { KButton } from 'kku-ui'
import type { KButtonProps } from 'kku-ui'
import { Tooltip } from '@/components'

interface ButtonWithTooltipProps extends Omit<KButtonProps, 'asChild'> {
  tooltipText?: string
}

const ButtonWithTooltip = ({ children, tooltipText, onMouseEnter, onMouseLeave, ...props }: ButtonWithTooltipProps) => {
  const [isTT, setTT] = useState(false)

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (tooltipText) setTT(true)
    onMouseEnter?.(e)
  }, [tooltipText, onMouseEnter])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (tooltipText) setTT(false)
    onMouseLeave?.(e)
  }, [tooltipText, onMouseLeave])

  return (
    <div className="relative">
      <KButton
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </KButton>
      {tooltipText && <Tooltip text={tooltipText} show={isTT} />}
    </div>
  )
}

export default ButtonWithTooltip
