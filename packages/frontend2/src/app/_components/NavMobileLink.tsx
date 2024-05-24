import { type ActiveLinkProps, useActiveLink } from '~/utils/active-link'
import { cn } from '~/utils/cn'

export type NavMobileLinkProps = (
  | { title: string; children?: undefined }
  | { children: React.ReactNode; title?: undefined }
) &
  ActiveLinkProps

export function NavMobileLink({
  title,
  href,
  activeBehavior,
}: NavMobileLinkProps) {
  const active = useActiveLink({ href, activeBehavior })

  return (
    <a href={href}>
      <li
        className={cn(
          'flex flex-col justify-center h-full relative px-2 font-medium text-base md:px-4 md:text-lg',
          active && 'text-pink-900 dark:text-pink-200',
        )}
      >
        {title}
        {active && (
          <div className="absolute bottom-0 w-full h-[3px] left-0 bg-pink-900" />
        )}
      </li>
    </a>
  )
}
