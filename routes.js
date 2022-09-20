import React from 'react'

const Dashboard = React.lazy(()=> import('./layout/pages/dashboard'));
//User
const Ticket = React.lazy(()=> import('./layout/pages/ticket'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/ticket/:id', name: 'booking', element: Ticket },
]

export default routes
