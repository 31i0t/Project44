import { useStore } from '../store';

const useActiveRoom = () => {
  return useStore((state) => state.rooms.find(r => r.id === state.activeRoomId));
}

export default useActiveRoom;
