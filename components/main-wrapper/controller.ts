import { useRouter } from 'next/router';

import { useAppSelector } from '@/store/hooks';
import { routes } from '@/utils/pages';

interface ControllerReturn {
  name?: string;
  goHome: () => void;
}

const useMainWrapperController = (): ControllerReturn => {
  const router = useRouter();
  const { name } = useAppSelector((state) => state.user);

  const goHome = () => void router.push(routes.home());

  return { name, goHome };
};

export default useMainWrapperController;
