import { useContext, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
import { IShelterCategoryItemsProps } from './types';
import { cn, getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus } from '@/components';
import { Button } from '@/components/ui/button';
import { SupplyPriority } from '@/service/supply/types';
import { SessionContext } from '@/contexts';
import { Badge } from '@/components/ui/badge';

const ShelterCategoryItems = (props: IShelterCategoryItemsProps) => {
  const {
    priority = SupplyPriority.NotNeeded,
    tags,
    onSelectTag,
    selectedTags = [],
  } = props;
  const { session } = useContext(SessionContext);
  const [opened, setOpened] = useState<boolean>(false);
  const maxVisibleSupplies: number = 10;
  const visibleSupplies = useMemo(
    () => (opened ? tags : tags.slice(0, maxVisibleSupplies)),
    [opened, tags]
  );
  const { className: circleClassName, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority]
  );

  const Icon = opened ? ChevronUp : ChevronDown;
  const btnLabel = opened ? 'Ver menos' : 'Ver todos';

  const [localTags, setLocalTags] = useState(tags);

  const handleMinusClick = (idx: number) => {
    const updatedTags = [...localTags];
    updatedTags[idx].quantity = Math.max(0, (updatedTags[idx].quantity || 0) - 1);
    setLocalTags(updatedTags);
  };

  const handlePlusClick = (idx: number) => {
    const updatedTags = [...localTags];
    updatedTags[idx].quantity = (updatedTags[idx].quantity || 0) + 1;
    setLocalTags(updatedTags);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center flex-wrap">
        <div className='flex items-center gap-2'>
          <CircleStatus className={circleClassName} />
          <h3>
            {label} ({tags.length})
          </h3>
        </div>

        <Button variant="ghost"
          className="gap-1 text-blue-600 hover:text-blue-500 active:text-blue-700
          m-0 p-1 text-xs items-center
        "
        >
          <Plus className="h-3 w-3 stroke-blue-600" />
          Adicionar item
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {visibleSupplies.map((tag, idx) => {
          return (
            <Badge
              key={idx}
              className={cn(
                circleClassName,
                `pl-4 pr-1 items-center gap-4 h-10`,
                session && ['DistributionCenter', 'Admin'].includes(session.accessLevel) &&
                'cursor-pointer',
                selectedTags.includes(tag)
                  ? 'ring-2'
                  : '',
              )}
              variant={'outline'}
            >
              <span
                onClick={
                  () => {
                    session && ['DistributionCenter', 'Admin'].includes(session.accessLevel) &&
                      onSelectTag ? onSelectTag(tag) : undefined
                  }
                }
              >
                {tag.label}
              </span>
              {tag.quantity !== null &&
                tag.quantity !== undefined &&
                (
                  <div
                    className={cn(`${circleClassName}`, 'hover:bg-none h-8 w-20 px-4 text-xs gap-2 text-secondary flex items-center bg-primary rounded-full')}
                  >
                    <Button
                      name={`button-minus-${idx}`}
                      variant="link"
                      size={"icon"}
                      className="m-0 p-0 curso hover:bg-none w-10"
                      onClick={() => handleMinusClick(idx)}
                  >
                    <Minus className="h-3 w-3 stroke-red-400" />
                  </Button>
                  {tag.quantity}
                  <Button
                      name={`button-plus-${idx}`}
                      variant="link"
                      size={"icon"}
                      className="m-0 p-0 curso hover:bg-none w-10"
                      onClick={() => handlePlusClick(idx)}
                    >
                      <Plus className="h-3 w-3 stroke-emerald-400" />
                    </Button>
                  </div>
                )}
            </Badge>
          );
        })}
      </div>

      {tags.length > maxVisibleSupplies && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center"
            onClick={() => setOpened((v) => !v)}
          >
            <span className="text-lg font-normal text-blue-500">
              {btnLabel}
            </span>
            <Icon className="h-5 w-5 stroke-blue-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { ShelterCategoryItems };
