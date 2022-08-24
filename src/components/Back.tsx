import {useRouter} from 'next/router'
import Link from 'next/link'
import LeftChevron from '@/components/svg/LeftChevron'

interface BackProps {
  href: string
}

const Back = ({href}: BackProps) => {
  return (
    <Link href={href}>
      <div className="appearance-none no-underline w-full bg-background dark:bg-background-dark px-2 py-4 shadow-[0_4px_16px_hsl(0,0%,0%,.2)]
    flex items-center fill-font dark:fill-font-dark gap-1 fixed hover-highlight top-0 z-10 select-none cursor-pointer" style={{height: 'var(--back-button-height)'}}>
        <LeftChevron height="3rem"/>
        <div className="text-3xl -translate-y-0.5">Back</div>
      </div>
    </Link>
  )
}

// .back-button:active {
//   text-decoration: none;
// }
// .text {
//   font-size: 2rem;
//   transform: translateY(-3%);
// }

export default Back