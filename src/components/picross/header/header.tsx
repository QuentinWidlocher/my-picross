import Cell from './cell'

type HeaderProps =
  | {
      direction: 'row'
      columns: (string | number)[][]
    }
  | {
      direction: 'column'
      rows: (string | number)[][]
    }

export default function Header(props: HeaderProps) {
  let lines = props.direction == 'row' ? props.columns : props.rows
  return (
    <header>
      <div
        class={`flex gap-1 items-stretch ${
          props.direction == 'row' ? 'flex-row' : 'flex-col'
        }`}
      >
        {lines.map((line) => (
          <div
            class={`flex gap-1 ${
              props.direction == 'row' ? 'flex-col' : 'flex-row'
            } justify-end`}
          >
            {line.map((value) => (
              <Cell value={value} />
            ))}
          </div>
        ))}
      </div>
    </header>
  )
}
