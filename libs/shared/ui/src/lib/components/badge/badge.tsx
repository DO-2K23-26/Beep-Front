export enum BadgeType {
  SUCCESS = 'bg-green-500',
  DANGER = 'bg-red-500',
  WARNING = 'bg-yellow-500',
  INFO = 'bg-blue-500',
  DEFAULT = 'bg-gray-500',
  ONLINE = 'bg-green-300',
  OFFLINE = 'bg-red-300',
}

export interface BadgeProps {
  type: BadgeType
  title: string
  className?: string
}

export function Badge({ type, title, className }: BadgeProps) {
  return (
    <div
      className={`${type} ${className} text-xs leading-none font-semibold text-white rounded-full py-[6px] px-2 cursor-pointer truncate w-min`}
    >
      {title}
    </div>
  )
}
