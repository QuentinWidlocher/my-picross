import { CellState } from './grid/cell'

type PreviewProps = {
  state: CellState[][]
}

export default function Preview(props: PreviewProps) {
  return (
    <div
      class="grid h-full w-full bg-slate-50 rounded p-1"
      style={{
        'grid-template-columns': `repeat(${props.state[0].length}, 1fr)`,
        'grid-template-rows': `repeat(${props.state.length}, 1fr)`,
      }}
    >
      {props.state.flatMap((row) =>
        row.map((cellState) => (
          <div class={`${cellState == 'full' ? 'bg-slate-700' : ''}`}></div>
        )),
      )}
    </div>
  )
}
