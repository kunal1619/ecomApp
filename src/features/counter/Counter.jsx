import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  increment,
  incrementAsync,
  selectCount,
} from './counterSlice'


export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div >
        <span >{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />

        <button
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>

      </div>
    </div>
  )
}
