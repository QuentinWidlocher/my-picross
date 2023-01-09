import { createSignal, Match, Switch } from 'solid-js'

type CellProps = {
  state: CellState
  onClick: () => void
  onRightClick: () => void
}

export const cellStates = ['empty', 'full', 'crossed'] as const
export type CellState = typeof cellStates[number]

export default function Cell(props: CellProps) {
  return (
    <div
      class="h-cell w-cell cursor-pointer bg-white rounded grid"
      onclick={() => props.onClick()}
      onContextMenu={(e) => {
        e.preventDefault()
        props.onRightClick()
      }}
    >
      <Switch>
        <Match when={props.state == 'full'}>
          <div class="bg-slate-600 rounded"></div>
        </Match>
        <Match when={props.state == 'crossed'}>
          <svg
            class="text-slate-600"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
          >
            <path
              d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </Match>
      </Switch>
    </div>
  )
}
