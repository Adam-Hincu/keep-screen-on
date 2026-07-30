'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const
const STRIP_COPIES = 21
const STRIP = Array.from({ length: STRIP_COPIES * 10 }, (_, index) => DIGITS[index % 10])
const STRIP_BASE = Math.floor(STRIP_COPIES / 2) * 10
const STRIP_WRAP_MIN = STRIP_BASE - 1
const STRIP_WRAP_MAX = STRIP_BASE + 10

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(value / place) % 10
  const [index, setIndex] = useState(STRIP_BASE + digit)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const stripRef = useRef<HTMLDivElement>(null)
  const prevDigitRef = useRef(digit)
  const indexRef = useRef(index)

  indexRef.current = index

  const rebaseToDigit = (targetDigit: number, animate: boolean) => {
    const nextIndex = STRIP_BASE + targetDigit
    indexRef.current = nextIndex

    if (!animate) {
      setTransitionEnabled(false)
    }

    setIndex(nextIndex)

    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true))
      })
    }
  }

  useEffect(() => {
    const prev = prevDigitRef.current
    if (prev === digit) return

    let delta = digit - prev
    if (delta > 5) delta -= 10
    if (delta < -5) delta += 10

    let fromIndex = indexRef.current
    const needsRebase =
      fromIndex < STRIP_WRAP_MIN ||
      fromIndex > STRIP_WRAP_MAX ||
      fromIndex + delta < 0 ||
      fromIndex + delta >= STRIP.length

    if (needsRebase) {
      setTransitionEnabled(false)
      fromIndex = STRIP_BASE + prev
      indexRef.current = fromIndex
      setIndex(fromIndex)

      requestAnimationFrame(() => {
        const next = fromIndex + delta
        indexRef.current = next
        setTransitionEnabled(true)
        setIndex(next)
      })

      prevDigitRef.current = digit
      return
    }

    const next = fromIndex + delta
    indexRef.current = next
    setTransitionEnabled(true)
    setIndex(next)
    prevDigitRef.current = digit
  }, [digit])

  useEffect(() => {
    const el = stripRef.current
    if (!el) return

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return

      const currentIndex = indexRef.current
      if (currentIndex < STRIP_BASE || currentIndex >= STRIP_BASE + 10) {
        rebaseToDigit(digit, false)
      }
    }

    el.addEventListener('transitionend', onEnd)
    return () => el.removeEventListener('transitionend', onEnd)
  }, [digit])

  return (
    <span className="relative inline-block h-[1lh] w-[1ch] overflow-hidden">
      <span
        ref={stripRef}
        className={cn(
          'absolute inset-x-0 top-0 flex flex-col',
          transitionEnabled && 'sliding-digit-strip'
        )}
        style={{ transform: `translateY(calc(-${index} * 1lh))` }}
      >
        {STRIP.map((number, stripIndex) => (
          <span
            key={stripIndex}
            className="flex h-[1lh] items-center justify-center"
          >
            {number}
          </span>
        ))}
      </span>
    </span>
  )
}

type SlidingNumberProps = {
  value: number
  padStart?: boolean
  decimalSeparator?: string
}

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = '.',
}: SlidingNumberProps) {
  const absValue = Math.abs(value)
  const [integerPart, decimalPart] = absValue.toString().split('.')
  const integerValue = parseInt(integerPart, 10)
  const paddedInteger = padStart
    ? integerPart.padStart(2, '0')
    : integerPart
  const integerDigits = paddedInteger.split('')
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  )

  return (
    <span className="inline-flex items-center">
      {value < 0 && '-'}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span className="flex h-[1lh] items-center justify-center">
            {decimalSeparator}
          </span>
          {decimalPart.split('').map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </span>
  )
}

export function ClockSeparator() {
  return (
    <span aria-hidden className="flex h-[1lh] items-center justify-center">
      :
    </span>
  )
}
