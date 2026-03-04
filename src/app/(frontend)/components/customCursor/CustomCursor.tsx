'use client'
import React, { useEffect, useRef, useState } from 'react'
import css from './CustomCursor.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const CustomCursor = () => {
  // Reference to the cursor element
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const hoverTl = useRef(gsap.timeline({ paused: true }))

  // State to track cursor position
  const [lockPosition, setLockPosition] = useState(false)
  const wheelEventEndTimeout = useRef<NodeJS.Timeout | null>(null)
  const [position, setPosition] = useState({ x: -100, y: -100 })
  // State to track click event
  const [clicked, setClicked] = useState(false)

  useGSAP(() => {
    if (!hoverTl.current) return

    hoverTl.current.to(dotRef.current, { scale: 2, duration: 0.25, ease: 'circ.out' })
    hoverTl.current.to(cursorRef.current, {
      borderColor: 'rgba(255, 255, 255, 1)',
      scale: 1.25,
      duration: 0.25,
      ease: 'circ.out',
    }, "<")
  })

  useEffect(() => {
    if (clicked) gsap.to(dotRef.current, { scale: 10, duration: 0.25 })
    else gsap.to(dotRef.current, { scale: 1, duration: 0.25 })
  }, [clicked])

  useEffect(() => {
    // Event listener for mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (lockPosition) return
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }
    // Event listener for mouse click
    const handleMouseDown = () => {
      if (document.querySelector('.slider-wheeling')) return

      setClicked(true)
      setTimeout(() => setClicked(false), 250)
    }
    const handleMouseUp = () => {
      setClicked(false)
    }

    const handleWheel = () => {
      if(!document.querySelector('.slider-wheeling')) return

      setClicked(false)
      setLockPosition(true)
      if(wheelEventEndTimeout.current) clearTimeout(wheelEventEndTimeout.current)
      wheelEventEndTimeout.current = setTimeout(() => {
        setLockPosition(false)
      }, 100)
    }

    const handleMouseOut = () => {
      setPosition({
        x: -1000,
        y: -1000,
      })
    }

    // Event listener for mouseover (hover) on HTML elements
    const handleMouseOver = (e: MouseEvent) => {
      if (!hoverTl.current) return
      const el = e.target as HTMLElement | null
      const isInteractive = !!el?.closest('button')


      if (isInteractive) hoverTl.current.restart()
      else hoverTl.current.reverse()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('wheel', handleWheel)
    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [hoverTl, lockPosition]) // useEffect runs only once on mount

  return (
    <div className={css.root} ref={cursorRef} style={{ top: position.y, left: position.x }}>
      <div className={css.dot} ref={dotRef} />
    </div>
  )
}

export default CustomCursor
