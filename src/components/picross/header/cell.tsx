import { createSignal, Show } from 'solid-js'

interface CellProps {
  value: string | number
}

export default function Cell(props: CellProps) {
  let [crossed, setCrossed] = createSignal(false)

  return (
    <span
      onClick={() => setCrossed((crossed) => !crossed)}
      class="relative cursor-pointer bg-slate-400 text-slate-50 rounded font-bold grid place-content-center w-cell h-cell"
    >
      {String(props.value)}
      <Show when={crossed()}>
        <svg
          class="text-slate-500 absolute"
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
      </Show>
    </span>
  )
}
