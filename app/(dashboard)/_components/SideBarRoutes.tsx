'use client';
import React from 'react'
import { BarChart, Compass, Layout, List } from 'lucide-react'
import SideBarItem from './SideBarItem';
import { usePathname } from 'next/navigation';

const studentRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    path: '/'
  },
  {
    icon: Compass,
    label: 'Browse',
    path: '/search'
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    path: '/teacher/courses'
  },
  {
    icon: BarChart,
    label: 'Analytics',
    path: '/teacher/analytics'
  },
]

const SideBarRoutes = () => {
  const pathname = usePathname()
  const isTeacher = pathname?.includes('/teacher')
  const routes = isTeacher ? teacherRoutes : studentRoutes;

  return (
    <div className="flex flex-col w-full">
      {
        routes.map((e) => {
          return (
            <SideBarItem 
              key={e.label}
              path={e.path}
              label={e.label}
            />
          )
        })
      }
    </div>
  )
}

export default SideBarRoutes