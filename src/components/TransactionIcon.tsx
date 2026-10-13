import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faBullseye, faCouch, faGlobe, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IconKey } from '../types';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const icons: Record<IconKey, IconDefinition> = {
  apple: faApple,
  payment: faApple,
  furniture: faCouch,
  target: faBullseye,
  coffee: faMugSaucer,
  globe: faGlobe,
};

interface TransactionIconProps {
  iconKey: IconKey;
  backgroundClass: string;
}

export const TransactionIcon = ({ iconKey, backgroundClass }: TransactionIconProps) => (
  <span
    aria-hidden="true"
    className={`flex size-11.25 shrink-0 items-center justify-center rounded-sm text-white ${backgroundClass}`}
  >
    <FontAwesomeIcon
      icon={icons[iconKey]}
      className={
        iconKey === 'target'
          ? 'text-[36px]'
          : iconKey === 'furniture'
            ? 'text-[25px]'
            : 'text-[26px]'
      }
    />
  </span>
);
