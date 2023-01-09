export type BitString = (1 | 0)[]

export function runLengthCompressBitString(bitString: BitString): string {
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

export function runLengthUncompressBitString(compressed: string): BitString {
  let result: BitString = []

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

  return result
}

/**
 * Compresses a bit string into a hex string.
 * It does this by splitting the bit string in half and converting each half to a hex string.
 * Else we would suffer from precision loss.
 */
export function hexCompressBitString(bitString: BitString): string {
  let str = bitString.join('')
  let [part1, part2] = [
    str.slice(0, Math.floor(str.length / 2)),
    str.slice(Math.floor(str.length / 2), str.length),
  ]

  return parseInt(part1, 2).toString(16) + parseInt(part2, 2).toString(16)
}

export function hexUncompressBitString(compressed: string): BitString {
  console.log({ compressed })
  console.log(parseInt(compressed, 16).toString(2).length)

  let middleIndex =
    compressed
      .split('')
      .findIndex((x, i) => i >= Math.floor(compressed.length / 2) && x == '0') +
    1

  let [part1, part2] = [
    compressed.slice(0, middleIndex).padEnd(compressed.length, '0'),
    compressed.slice(middleIndex, compressed.length),
  ]

  console.log({ part1, part2 })

  return (parseInt(part1, 16) + parseInt(part2, 16))
    .toString(2)
    .split('')
    .map((x) => parseInt(x) as 1 | 0)
}
