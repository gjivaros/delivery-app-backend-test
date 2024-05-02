import { useState } from 'react'
import { Customer } from './pages/Customer'
import { Admin } from './pages/Admin'

function App() {

  const [stat, setState] = useState<'admin' | 'customer'>('customer')

  const toggle = () => setState(v => v === 'admin' ? 'customer' : 'admin')

  return (
    <>
      <div className="Flex">
        <div className="card">
          <button type='button' className={`Button ${stat === 'admin' ? 'Active' : ''}`} onClick={toggle}>
            Admin
          </button>
        </div>

        <div className="card">
          <button type='button' className={`Button ${stat === 'customer' ? 'Active' : ''}`}  onClick={toggle}>
            Customer
          </button>
        </div>

      </div>

      {stat === 'customer' && <Customer/>}
      {stat === 'admin' && <Admin/>}

    </>
  )
}

export default App
