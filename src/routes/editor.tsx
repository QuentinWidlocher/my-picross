import { createSignal, Match, Switch } from 'solid-js'
import Board from '~/components/picross/board'
import Preview from '~/components/picross/preview'

function compressBitString(bitString: (1 | 0)[]) {
  let result = ''
  let currentBit = 0
  let currentLength = 0

  for (const bit of bitString) {
    if (currentLength == 0) {
      currentBit = bit
      currentLength = 1
    } else if (currentBit != bit) {
      result = result + `${currentLength}${currentBit ? 'b' : 'w'}`
      currentBit = bit
      currentLength = 1
    } else {
      currentLength++
    }
  }
  result += `${currentLength}${currentBit ? 'b' : 'w'}`

  return result
}

export default function EditorPage() {
  let [boardState, setBoardState] = createSignal<
    ('full' | 'empty' | 'crossed')[][] | null
  >(null)

  let [copied, setCopied] = createSignal(false)

  let generatedCode = () => {
    if (!boardState()) return null

    let serialized = boardState()!.flatMap((row) =>
      row.map((cell) => (cell == 'full' ? 1 : 0)),
    )

    return btoa(compressBitString(serialized))
  }

  let generatedUrl = () => {
    if (!generatedCode()) return null
    return `${window.location.origin}/puzzle/${generatedCode()}`
  }

  let generatedShareData = (): ShareData | null => {
    if (!generatedUrl()) return null
    return {
      title: 'Check out my Picross puzzle !',
      url: generatedUrl()!,
    }
  }

  return (
    <main class="grid place-content-center h-full">
      <Switch>
        <Match when={!generatedCode()}>
          <Board
            rows={Array.from({ length: 10 }).map(() => [1])}
            columns={Array.from({ length: 10 }).map(() => [1])}
            solution={Array.from({ length: 10 }).map(() =>
              Array.from({ length: 10 }).map(() => 1),
            )}
            editorMode
            onEditorSave={setBoardState}
          />
        </Match>
        <Match when={generatedCode() && boardState()}>
          <div class="w-full md:w-full aspect-square">
            <Preview state={boardState()!} />
          </div>
          <div class="m-5">
            <strong>Your puzzle link :</strong> <br />
            <div class="flex flex-col">
              <input
                onClick={(e) => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(generatedUrl()!)
                  } else {
                    e.currentTarget.select()
                    document.execCommand('copy')
                  }

                  setCopied(true)
                }}
                readOnly
                value={generatedUrl()!}
                class="min-w-fit cursor-pointer font-mono border-2 border-slate-200 rounded-lg px-2 py-1 -mx-1"
              />
              <small class="text-slate-500">
                {copied() ? 'Link copied to clipboard !' : 'Click to copy'}
              </small>
            </div>
            {'share' in navigator &&
            navigator.canShare(generatedShareData()!) ? (
              <button
                class="bg-slate-400 hover:bg-slate-500 transform active:translate-y-px mt-5 text-white px-1 py-2 rounded mx-5"
                onClick={() => {
                  navigator.share(generatedShareData()!)
                }}
              >
                Share your puzzle
              </button>
            ) : null}
          </div>
        </Match>
      </Switch>
    </main>
  )
}
