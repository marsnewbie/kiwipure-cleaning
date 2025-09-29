import React from 'react'
import { clsx } from 'clsx'

const Select = ({ value, onValueChange, children }) => {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      {children}
    </select>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue = ({ placeholder }) => <>{placeholder}</>

const SelectContent = ({ children }) => <>{children}</>

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => (
  <option
    ref={ref}
    value={value}
    className={clsx(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:text-accent-foreground focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </option>
))
SelectItem.displayName = 'SelectItem'

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
