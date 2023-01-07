interface CellProps {
  value: string | number
}

export default function Cell(props: CellProps) {
  return (
    <span class="bg-slate-400 text-slate-50 rounded font-bold grid place-content-center w-cell h-cell">
      {String(props.value)}
    </span>
  )
}
