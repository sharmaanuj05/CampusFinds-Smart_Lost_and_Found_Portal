import {
  Backpack,
  BookOpen,
  Cpu,
  CreditCard,
  KeyRound,
  Package,
  Shirt,
  Wallet,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const categoryStyles = {
  Electronics: { icon: Cpu, bg: 'bg-sky-50', fg: 'text-sky-600' },
  Bags: { icon: Backpack, bg: 'bg-amber-50', fg: 'text-amber-600' },
  Clothing: { icon: Shirt, bg: 'bg-violet-50', fg: 'text-violet-600' },
  'ID Cards': { icon: CreditCard, bg: 'bg-sky-50', fg: 'text-sky-600' },
  Books: { icon: BookOpen, bg: 'bg-emerald-50', fg: 'text-emerald-600' },
  Keys: { icon: KeyRound, bg: 'bg-orange-50', fg: 'text-orange-600' },
  Accessories: { icon: Wallet, bg: 'bg-rose-50', fg: 'text-rose-600' },
  Other: { icon: Package, bg: 'bg-gray-100', fg: 'text-gray-600' },
}

export default function CategoryPlaceholder({ category, name, className }) {
  const style = categoryStyles[category] || categoryStyles.Other
  const Icon = style.icon
  return (
    <div
      role="img"
      aria-label={name ? `${name} placeholder image` : `${category} placeholder`}
      className={cn(
        'flex h-full w-full items-center justify-center',
        style.bg,
        className,
      )}
    >
      <Icon className={cn('size-12', style.fg)} aria-hidden="true" />
    </div>
  )
}