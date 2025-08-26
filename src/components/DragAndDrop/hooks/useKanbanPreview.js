import { useMemo, useRef, useState, useEffect, useCallback } from "react"

export function useKanbanPreview(tasks) {
  const [previewOverride, setPreviewOverride] = useState(null)
  const lastAppliedRef = useRef(new Map())

  const tasksWithPreview = useMemo(() => {
    if (!previewOverride) return tasks
    return tasks.map((t) =>
      t.id === previewOverride.id
        ? { ...t, status: previewOverride.status, index: previewOverride.index }
        : t
    )
  }, [tasks, previewOverride])

  const rafIdRef = useRef(null)
  const pendingEventRef = useRef(null)

  useEffect(() => {
    return () => {
      if (rafIdRef.current != null) {
        if (typeof window !== 'undefined' && window.cancelAnimationFrame && typeof rafIdRef.current === 'number') {
          window.cancelAnimationFrame(rafIdRef.current)
        } else {
          clearTimeout(rafIdRef.current)
        }
        rafIdRef.current = null
      }
    }
  }, [])

  const schedule = useCallback((fn) => {
    rafIdRef.current = (typeof window !== 'undefined' && window.requestAnimationFrame)
      ? window.requestAnimationFrame(() => {
          rafIdRef.current = null
          fn()
        })
      : setTimeout(() => {
          rafIdRef.current = null
          fn()
        }, 16)
  }, [])

  return {
    previewOverride,
    setPreviewOverride,
    lastAppliedRef,
    tasksWithPreview,
    schedule,
    pendingEventRef,
    rafIdRef,
  }
}


