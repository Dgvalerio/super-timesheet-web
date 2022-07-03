import { FC } from 'react';

import Styles from '@/components/loading/style';

const Loading: FC = () => (
  <Styles.Container>
    <div id="clock" aria-label="Loading">
      <div id="hour-hand" />
      <div id="minute-hand" />
    </div>
  </Styles.Container>
);

export default Loading;
