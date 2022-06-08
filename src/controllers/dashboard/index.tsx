import { useEffect, useState } from 'react';

interface ControllerReturn {
  loading: boolean;
}

const useDashboardController = (): ControllerReturn => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { loading };
};

export default useDashboardController;
