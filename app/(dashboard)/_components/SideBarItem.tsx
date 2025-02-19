'use client'
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

interface SideBarItemProps {
  path: string,
  label: string,
}

const SideBarItem = ({
  path,
  label
}: SideBarItemProps ) => {
  const pathname = usePathname();
  const isActive = (pathname === '/' && path === '/') || pathname === path || pathname?.startsWith(`${path}/`)

  return (
    <Link
      href={path}
      className={cn(
        'relative flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive && 'border-emerald-700  hover:text-emerald-700'
      )}>  
      <div className="flex items-center gap-x-2 py-4">
        { label }
      </div>
      <div className={cn('absolute right-0 opacity-0 border-2 border-emerald-700 h-full transition-all', isActive && 'opacity-100')}/>
    </Link>
  )
}

export default SideBarItem