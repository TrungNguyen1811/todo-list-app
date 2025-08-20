import {Droppable, DragDropManager} from '@dnd-kit/dom';

export function createDroppable(manager) {
  const element = document.createElement('div');
  element.classList.add('droppable');

  const droppable = new Droppable({
    element,
    id: 'droppable-container', // Required - must be unique
    effects(){
      return [
        () => droppable.isDropTarget
          ? element.classList.add('active')
          : element.classList.remove('active')
      ];
    }
  }, manager);

  return droppable;
}