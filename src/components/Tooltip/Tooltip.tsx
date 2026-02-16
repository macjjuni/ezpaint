interface ITooltip {
  text: string
  show: boolean
}

const Tooltip = ({ text, show }: ITooltip) => {
  return (
    <div
      className={`
        absolute top-full mt-3 left-1/2 -translate-x-1/2
        text-xs font-medium px-2.5 py-1.5 rounded-md
        text-white bg-gray-900/95
        whitespace-nowrap opacity-0
        shadow-lg backdrop-blur-sm
        pointer-events-none
        ${text !== '' ? 'block z-[10000]' : 'hidden -z-10'}
        ${show ? 'tooltip-active' : 'tooltip-inactive'}
      `}
    >
      {text}
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900/95 rotate-45" />
    </div>
  )
}

export default Tooltip
