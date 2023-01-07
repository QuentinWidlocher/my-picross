import { createEffect, createSignal, on } from 'solid-js'
import { createStore } from 'solid-js/store'
import { CellState, cellStates } from './grid/cell'
import Grid from './grid/grid'
import Header from './header/header'
import Preview from './preview'

type BoardProps = {
  rows: (string | number)[][]
  columns: (string | number)[][]
  solution: (1 | 0)[][]
}

function getAssertGridSize(props: BoardProps) {
  let rowLength = props.rows.length
  let columnLength = props.columns.length
  let maxRowLength = Math.max(...props.rows.map((row) => row.length))
  let maxColumnLength = Math.max(
    ...props.columns.map((column) => column.length),
  )

  if (maxRowLength > columnLength || maxColumnLength > rowLength) {
    throw new Error(
      `Grid size is not correct: ${maxRowLength}x${maxColumnLength} instead of ${columnLength}x${rowLength}`,
    )
  }

  return [rowLength, columnLength]
}

function nextCellState(state: CellState): CellState {
  return cellStates[(cellStates.indexOf(state) + 1) % cellStates.length]
}

export default function Board(props: BoardProps) {
  let [rowLength, columnLength] = getAssertGridSize(props)

  let [boardState, setBoardState] = createStore<CellState[][]>(
    Array.from({ length: rowLength }).map(() =>
      Array.from({ length: columnLength }).map(() => 'empty'),
    ),
  )

  let [boardStateUpdate, setBoardStateUpdate] = createSignal(0)

  createEffect(
    on(boardStateUpdate, () => {
      let done = boardState.every((row, rowIndex) =>
        row.every((cellState, columnIndex) => {
          let solution = props.solution[rowIndex][columnIndex]

          return (
            (cellState == 'full' && solution == 1) ||
            (cellState == 'empty' && solution == 0) ||
            (cellState == 'crossed' && solution == 0)
          )
        }),
      )

      if (done) {
        alert('You win!')
      }
    }),
  )

  return (
    <section class="grid grid-cols-[1fr,auto] grid-rows-[1fr,auto] bg-slate-200 p-2 md:m-5 gap-1 rounded-lg md:w-fit overflow-auto">
      <div class="col-start-1 row-start-1 mr-1 mb-1">
        <Preview state={boardState} />
      </div>
      <div class="col-start-2 row-start-1 bg-slate-200 sticky top-0">
        <Header direction="row" columns={props.columns} />
      </div>
      <div class="col-start-1 row-start-2 bg-slate-200 sticky left-0">
        <Header direction="column" rows={props.rows} />
      </div>
      <div class="col-start-2 row-start-2">
        <Grid
          rows={rowLength}
          columns={columnLength}
          boardState={boardState}
          onCellClick={(rowIndex, colIndex) => {
            setBoardState(
              rowIndex,
              colIndex,
              nextCellState(boardState[rowIndex][colIndex]),
            )
            setBoardStateUpdate((i) => i + 1)
          }}
        />
      </div>
    </section>
  )
}
