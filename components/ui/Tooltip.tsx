import React, { ReactNode } from "react"

type TooltipProps = {
  children: ReactNode
  content: string
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => (
  <div className="relative group inline-block">
    {children}
    <div className="pointer-events-none absolute left-1/2 z-20 max-w-xs w-full -translate-x-1/2 translate-y-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 bg-red-800 text-white text-xs rounded-lg px-4 py-2 shadow-xl mt-2 whitespace-pre-line border border-gray-200 after:content-[''] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:-translate-y-full after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-red-800">
      {content}
    </div>
  </div>
)

export default Tooltip