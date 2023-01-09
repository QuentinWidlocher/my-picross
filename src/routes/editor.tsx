import { createSignal, Match, Switch } from 'solid-js'
import { Button, Link } from '~/components/button'
import Board from '~/components/picross/board'
import Preview from '~/components/picross/preview'
import { runLengthCompressBitString as compressBitString } from '~/utils/compression'

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

    console.log({ serialized })
    console.log({ compressed: compressBitString(serialized) })

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
    <Switch>
      <Match when={!generatedCode()}>
        <main class="grid place-content-center h-full w-full space-y-5 max-sm:p-2">
          <Board
            rows={Array.from({ length: 10 }).map(() => [1])}
            columns={Array.from({ length: 10 }).map(() => [1])}
            solution={Array.from({ length: 10 }).map(() =>
              Array.from({ length: 10 }).map(() => 1),
            )}
            editorMode
            onEditorSave={setBoardState}
          />
        </main>
      </Match>
      <Match when={generatedCode() && boardState()}>
        <main class="grid sm:place-content-center h-full w-full space-y-5 max-sm:p-2">
          <div class="w-full md:w-full aspect-square mt-auto">
            <Preview state={boardState()!} />
          </div>
          <div class="flex flex-col space-y-5">
            <div class="flex flex-col">
              <strong>Your puzzle link :</strong>
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
            <Link class="w-full" href={generatedUrl()!}>
              Try your puzzle
            </Link>
            {'share' in navigator &&
            navigator.canShare(generatedShareData()!) ? (
              <Button
                onClick={() => {
                  navigator.share(generatedShareData()!)
                }}
              >
                Share your puzzle
              </Button>
            ) : null}
          </div>
        </main>
      </Match>
    </Switch>
  )
}
