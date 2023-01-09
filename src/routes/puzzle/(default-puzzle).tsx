import { A, useLocation, useRouteData } from 'solid-start'
import { Link } from '~/components/button'
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

export function routeData() {
  return chicken
}

export default function PuzzleRoute() {
  let puzzle = useRouteData<typeof routeData>()
  return (
    <main class="grid place-content-center h-full space-y-5 max-sm:p-2">
      <Board
        rows={puzzle.rows}
        columns={puzzle.columns}
        solution={puzzle.solution}
        code="default"
      />
      <Link href="/editor">Create your own puzzle !</Link>
    </main>
  )
}
