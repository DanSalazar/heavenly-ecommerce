'use client'

import { useState } from 'react'
import Personal from './personal'
import Step from './step'
import Shipping from './shipping'
import Payment from './payment'

type Steps = 'Information' | 'Shipping' | 'Payment'
const steps: Steps[] = ['Information', 'Shipping', 'Payment']

const stepToComponent: Record<Steps, JSX.Element> = {
  Information: <Personal />,
  Shipping: <Shipping />,
  Payment: <Payment />
}

export default function MultiForm() {
  const [step, _setStep] = useState(0)

  return (
    <>
      <Step step={step} steps={steps} />
      {stepToComponent[steps[step]]}
    </>
  )
}
