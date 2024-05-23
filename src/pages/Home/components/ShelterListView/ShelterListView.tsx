import React, { Fragment } from 'react';
import { CircleAlert, ListFilter, X } from 'lucide-react';

import {
  Alert,
  NoFoundSearch,
  SearchInput,
  ShelterListItem,
} from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IShelterListViewProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const ShelterListView = React.forwardRef<HTMLDivElement, IShelterListViewProps>(
  (props, ref) => {
    const {
      count,
      data,
      loading = false,
      searchValue = '',
      hasMoreItems = false,
      onSearchValueChange,
      onCitiesChange,
      onFetchMoreData,
      className = '',
      onOpenModal,
      onClearSearch,
      filterData,
      ...rest
    } = props;

    const [searchParams] = useSearchParams();

    return (
      <div className={cn(className, 'flex flex-col gap-2')}>
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Abrigos disponíveis ({count})
        </h1>
        <Alert
          description="Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações."
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
        <SearchInput
          value={searchValue}
          onChange={(ev) =>
            onSearchValueChange
              ? onSearchValueChange(ev.target.value ?? '')
              : undefined
          }
        />
        <div className="flex flex-wrap gap-1 items-center">
          {filterData.cities?.map((item) => (
            <div
              className="flex items-center px-4 py-1 font-normal text-sm md:text-md rounded-3xl bg-gray-300 justify-center cursor-pointer hover:opacity-80 transition-all duration-200"
              key={item}
              onClick={() =>
                onCitiesChange?.(filterData.cities.filter((it) => it !== item))
              }
            >
              <span className="pr-1">{item}</span> <X className="h-4 w-4" />
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap">
          <div className='flex items-center'>
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-2 items-center text-blue-500 hover:text-blue-600 active:text-blue-700"
              onClick={onOpenModal}
            >
              <ListFilter className="h-5 w-5 stroke-blue-500" />
              Filtros
            </Button>
            {searchParams.toString() && (
              <Button
                variant="ghost"
                size="sm"
                className="flex gap-2 items-center text-blue-500 hover:text-blue-600 active:text-blue-700"
                onClick={onClearSearch}
              >
                <CircleAlert className="h-5 w-5 stroke-blue-500" />
                Limpar Filtros
              </Button>
            )}
          </div>
          <div className='flex items-center flex-wrap gap-1 md:gap-2'>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 px-1 gap-2 items-center rounded-full sm:text-sm sm:px-3"
              onClick={() => {}}
            >
              Aceita pets
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 px-3 gap-2 items-center rounded-full sm:text-sm"
              onClick={() => {}}
            >
              Disponível
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 px-3 gap-2 items-center rounded-full sm:text-sm"
              onClick={() => {}}
            >
              Precisa de voluntários
            </Button>
          </div>
        </div>
        <main ref={ref} className="flex flex-col gap-4" {...rest}>
          {loading ? (
            <LoadingSkeleton amountItems={4} />
          ) : data.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {data.map((s, idx) => (
                <ShelterListItem key={idx} data={s} />
              ))}
              {hasMoreItems ? (
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700"
                  size="sm"
                  loading={loading}
                  onClick={onFetchMoreData}
                >
                  Carregar mais
                </Button>
              ) : (
                <p className="text-muted-foreground font-semibold">
                  Não há mais registros
                </p>
              )}
            </Fragment>
          )}
        </main>
      </div>
    );
  }
);

export { ShelterListView };
