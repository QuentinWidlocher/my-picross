import Board from '~/components/picross/board'

type Pattern = {
  rows: number[][]
  columns: number[][]
  solution: (1 | 0)[][]
}

const chicken: Pattern = {
  rows: [
    [5],
    [2, 2],
    [1, 1, 1],
    [2, 1, 1],
    [4, 2],
    [1, 2, 1],
    [1, 1, 1],
    [2, 1],
    [1, 1, 1],
    [7],
  ],
  columns: [
    [1, 1],
    [4, 3],
    [2, 3, 1],
    [1, 1, 1],
    [1, 2, 1],
    [1, 1, 2],
    [2, 1, 1],
    [5, 1],
    [1, 1],
    [4],
  ],
  solution: [
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  ],
}

export default function Home() {
  return (
    <main class="grid place-content-center h-full">
      <Board
        rows={chicken.rows}
        columns={chicken.columns}
        solution={chicken.solution}
      />
    </main>
  )
}
