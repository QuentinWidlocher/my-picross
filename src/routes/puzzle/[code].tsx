import { Switch } from 'solid-js'
import { redirect, useParams, useRouteData } from 'solid-start'
import { Link } from '~/components/button'
import Board from '~/components/picross/board'
import { runLengthUncompressBitString as uncompressBitString } from '~/utils/compression'

function sliceIntoChunks<T>(arr: Array<T>, chunkSize: number) {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}

function pivoted<T>(input: T[][]) {
  return input.map((_, colIndex) => input.map((row) => row[colIndex]))
}

export function routeData() {
  let params = useParams()

  if (params.code) {
    try {
      let decompressed = atob(params.code)

      let solution = sliceIntoChunks(uncompressBitString(decompressed), 10)

      console.log(solution)

      if (solution.length != 10 || solution.some((row) => row.length != 10)) {
        throw new Error('Invalid solution')
      }

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
    } catch (e) {
      return new Error('Invalid puzzle code')
    }
  } else {
    throw redirect('/puzzle')
  }
}

export default function PuzzleRoute() {
  let puzzle = useRouteData<typeof routeData>()

  if (puzzle instanceof Error) {
    return (
      <main class="grid place-content-center h-full space-y-5 max-sm:p-2">
        <h1 class="text-2xl font-bold text-center">Invalid puzzle code</h1>
        <Link href="/puzzle">Back to puzzles</Link>
      </main>
    )
  } else {
    return (
      <main class="grid place-content-center h-full space-y-5">
        <Board
          rows={puzzle.rows}
          columns={puzzle.columns}
          solution={puzzle.solution}
          code={puzzle.code}
        />
        <Link href="/editor">Create your own puzzle !</Link>
      </main>
    )
  }
}
