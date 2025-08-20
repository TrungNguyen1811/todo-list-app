import {
  DragDropManager,
  KeyboardSensor,
  PointerSensor,
} from '@dnd-kit/dom';

// Manual registration
const cleanup = manager.registry.register(draggable);
cleanup(); // Or manager.registry.unregister(draggable);

const element = document.createElement('div');
const handle = document.createElement('div');
handle.classList.add('handle');
handle.innerHTML = '⋮'; // Three dots menu icon for drag handle

element.appendChild(handle);

// Auto-registration with manager reference
const draggable = new Draggable({
  id: 'draggable-1',
  element,
  type: 'item',
  feedback: 'clone', 
  handle, // Only allow dragging from the handle
  //   register: false
}, manager);

// Opt out of auto-registration


const manager = new DragDropManager({
  // Sensors detect drag interactions
  sensors: [
    PointerSensor,  // Handles mouse and touch
    KeyboardSensor, // Enables keyboard navigation
  ],

  // Plugins extend functionality
  plugins: [
    AutoScroller,   // Automatic scrolling during drag
    Accessibility,  // ARIA attributes management
  ],

  // Modifiers customize drag behavior
  modifiers: [
    restrictToWindow, // Keeps dragged items within window bounds
  ],
});

// Observe drag start
manager.monitor.addEventListener('beforedragstart', (event) => {
  // Optionally prevent dragging
  if (shouldPreventDrag(event.operation.source)) {
    event.preventDefault();
  }
});

// Track movement
manager.monitor.addEventListener('dragmove', (event) => {
  const {source, position} = event.operation;
  console.log(`Dragging ${source.id} to ${position.current}`);
});

// Detect collisions
manager.monitor.addEventListener('collision', (event) => {
  const [firstCollision] = event.collisions;
  if (firstCollision) {
    console.log(`Colliding with ${firstCollision.id}`);
  }
});

// Listen for when dragging ends
manager.monitor.addEventListener('dragend', (event) => {
  const {source, target, canceled} = event.operation;
  if (!canceled && target) {
    console.log(`Dropped ${source.id} onto ${target.id}`);
  }
});