export const OrderNumber = ({ order }: { order?: number }) => {
    return <div className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border"><span className="text-xs">{order}</span></div>

}
