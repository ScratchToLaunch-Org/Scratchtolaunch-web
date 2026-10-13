import { cn } from "@/lib/utils"

export function AdminTable({
  columns,
  children,
  className,
}: {
  columns: string[]
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border bg-card", className)}>
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b bg-muted/40 text-xs font-medium text-muted-foreground">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2.5 font-medium whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  )
}

export function Td({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <td className={cn("px-3 py-2.5 align-middle", className)}>{children}</td>
}
