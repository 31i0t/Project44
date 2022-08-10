import { useStore } from '../store';

const useActiveRoom = () => {
  return useStore((state) => state.rooms[state.activeRoomId]);
}

export default useActiveRoom;
