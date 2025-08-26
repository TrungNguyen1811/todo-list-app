import { useSensors, useSensor, TouchSensor, MouseSensor } from "@dnd-kit/core"

export function useKanbanSensors() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  )

  return sensors
}


