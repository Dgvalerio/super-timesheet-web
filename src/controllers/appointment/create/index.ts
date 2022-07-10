import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ControllerReturn {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useCreateAppointmentController = (): ControllerReturn => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { loading, setLoading };
};

export default useCreateAppointmentController;
