import {Draggable, DragDropManager} from '@dnd-kit/dom';
import {createDraggable} from './Draggable.jsx';
import {createDroppable} from './Droppable.jsx';

function createDraggable(manager) {
  // Create a DOM element (or use an existing one)
  const element = document.createElement('button');
  element.innerText = 'draggable';
  element.classList.add('btn');

  // Make the element draggable
  return new Draggable({id: 'draggable-button', element}, manager);
}

export default function DragAndDrop() {
  const manager = new DragDropManager();
  const app = document.getElementById('app');

  const draggable = createDraggable(manager);
  const droppable = createDroppable(manager);

  manager.monitor.addEventListener('dragend', (event) => {
    const {operation, canceled} = event;
    const {source, target} = operation;

    // Skip if drag operation was canceled (e.g. if escape key was pressed)
    if (canceled) return;

    // Move element to drop target if dropped on droppable
    if (target && target.id === droppable.id) {
      droppable.element.append(source.element);
    } else {
      app.prepend(source.element);
    }
  });

  app.append(draggable.element, droppable.element);
}