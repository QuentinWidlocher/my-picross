import { A, redirect, useLocation, useParams, useRouteData } from 'solid-start'
import Board from '~/components/picross/board'

function sliceIntoChunks<T>(arr: Array<T>, chunkSize: number) {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}

function uncompressBitString(compressed: string) {
  let result: (1 | 0)[] = []

  let indexInStr = 0
  let indexInChunks = 0
  while (indexInStr < compressed.length) {
    let lengthStr = compressed.split('w').flatMap((x) => x.split('b'))[
      indexInChunks
    ]
    let length = parseInt(lengthStr)
    let bit = compressed[indexInStr + lengthStr.length] == 'b' ? 1 : 0

    result.push(...Array.from({ length }).map(() => bit as 1 | 0))
    indexInStr += lengthStr.length + 1
    indexInChunks++
  }

  return sliceIntoChunks(result, 10)
}

function pivoted<T>(input: T[][]) {
  return input.map((_, colIndex) => input.map((row) => row[colIndex]))
}

export function routeData() {
  let params = useParams()

  if (params.code) {
    let decrompressed = atob(params.code)
    let solution = uncompressBitString(decrompressed)

    let rows: number[][] = []

    for (const row of solution) {
      let i = rows.push([]) - 1
      let currentBit = 0
      let currentLength = 0
      for (const bit of row) {
        if (currentLength == 0) {
          currentBit = bit
          currentLength = 1
        } else if (currentBit != bit) {
          if (currentBit == 1) {
            rows[i].push(currentLength)
          }
          currentBit = bit
          currentLength = 1
        } else {
          currentLength++
        }
      }
      if (currentBit == 1) {
        rows[i].push(currentLength)
      }

      if (rows[i].length == 0) {
        rows[i].push(0)
      }
    }

    let columns: number[][] = []

    for (const column of pivoted(solution)) {
      let i = columns.push([]) - 1
      let currentBit = 0
      let currentLength = 0
      for (const bit of column) {
        if (currentLength == 0) {
          currentBit = bit
          currentLength = 1
        } else if (currentBit != bit) {
          if (currentBit == 1) {
            columns[i].push(currentLength)
          }
          currentBit = bit
          currentLength = 1
        } else {
          currentLength++
        }
      }
      if (currentBit == 1) {
        columns[i].push(currentLength)
      }

      if (columns[i].length == 0) {
        columns[i].push(0)
      }
    }

    return {
      rows,
      columns,
      solution,
      code: params.code,
    }
  } else {
    throw redirect('/puzzle')
  }
}

export default function PuzzleRoute() {
  let puzzle = useRouteData<typeof routeData>()
  return (
    <main class="grid place-content-center h-full">
      <Board
        rows={puzzle.rows}
        columns={puzzle.columns}
        solution={puzzle.solution}
        code={puzzle.code}
      />
      <A
        href="/editor"
        class="bg-slate-100 text-slate-400 hover:bg-slate-200 transform active:translate-y-px mt-5 px-1 py-2 rounded mx-5 text-center"
      >
        Create your own puzzle !
      </A>
    </main>
  )
}
