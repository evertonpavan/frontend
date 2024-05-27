import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export const QuantityCell = ({ getValue, row, column, table }: any) => {
  const supplyId = row.original.supply.id as string
  const initialQuantity = getValue()
  const [newQuantity, setNewQuantity] = useState<number>(initialQuantity)

  useEffect(() => {
    setNewQuantity(initialQuantity)
  }, [initialQuantity])

  function handleUpdateQuantity(newQuantityToUpdate: number) {
    setNewQuantity(newQuantityToUpdate)

    console.log({
      initialQuantity, newQuantityToUpdate
    })

    if (initialQuantity === null && newQuantityToUpdate === 0) {
      table.options.meta?.updateData(row.index, column.id, null)
    }

    // if(initialQuantity === newQuantityToUpdate) {
    //   return
    // }

    table.options.meta?.updateData(row.index, column.id, newQuantityToUpdate, supplyId)
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <Input
        className="max-w-[100px]"
        type="number"
        placeholder={initialQuantity ? initialQuantity : '0'}
        // defaultValue={initialQuantity ? initialQuantity : ''}
        onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
        value={newQuantity}
      />
      <p className={initialQuantity !== newQuantity ? 'visible' : 'collapse'}>
      Anterior:
      <span className="text-red-500">
        {' '}{initialQuantity ? initialQuantity : '0'}
      </span>
      </p>
    </div>
  )
}