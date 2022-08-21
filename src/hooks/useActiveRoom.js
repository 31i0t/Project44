import { useStore } from '../store';

/**
 * Getter. Returns Room object.
 */
const useActiveRoom = () => {
  return useStore((state) => state.rooms[state.activeRoomId]) || {};
}

export default useActiveRoom;
