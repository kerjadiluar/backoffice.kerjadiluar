import type React from "react"
interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-sm md:text-base text-gray-600 mt-2">{description}</p>}
        </div>
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  )
}
