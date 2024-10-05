import {useState} from "react";

export function useToggle(initialValue: boolean, callback?: { onTrue: () => void, onFalse: () => void }) {
    const { onTrue, onFalse } = callback || {}
  const [funcToggle, setToggle] = useState(initialValue)

    const on = () => {
        setToggle((isTrue) => {
            if (!isTrue) {
                onTrue?.()
                return true
            }
            return isTrue
        })
    }
    const off = () => {
        setToggle((isTrue) => {
            if (isTrue) {
                onFalse?.()
                return false
            }
            return isTrue
        })
    }
    const toggle = () => {
        funcToggle ? off(): on()
    }

  return [funcToggle, { on, off, toggle }] as const
}