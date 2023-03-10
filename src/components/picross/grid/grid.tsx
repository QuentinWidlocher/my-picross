import Cell, { CellState } from './cell'

type GridProps = {
  rows: number
  columns: number
  boardState: CellState[][]
  onCellClick: (rowIndex: number, columnIndex: number) => void
  onCellRightClick: (rowIndex: number, columnIndex: number) => void
  disabled?: boolean
}

export default function Grid(props: GridProps) {
  return (
    <main
      class="grid bg-slate-200 gap-1"
      style={{
        'grid-template-columns': `repeat(${props.columns}, var(--cell-size))`,
        'grid-template-rows': `repeat(${props.rows}, var(--cell-size))`,
      }}
    >
      {props.boardState.flatMap((row, rowIndex) =>
        row.map((cellState, columnIndex) => (
          <Cell
            state={cellState}
            onClick={() => {
              props.disabled || props.onCellClick(rowIndex, columnIndex)
            }}
            onRightClick={() => {
              props.disabled || props.onCellRightClick(rowIndex, columnIndex)
            }}
          />
        )),
      )}
    </main>
  )
}
