export type BitString = (1 | 0)[]

function detectCompression(compressed: string): 'runlength' | 'hex' {
  return compressed.includes(';') ? 'hex' : 'runlength'
}

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
  let binaryString = bitString.join('')

  let [binaryString1, binaryString2] = [
    binaryString.slice(0, 50),
    binaryString.slice(50, binaryString.length),
  ]

  let [binaryNumber1, binaryNumber2] = [
    parseInt(binaryString1, 2),
    parseInt(binaryString2, 2),
  ]

  let hexNumber = binaryNumber1.toString(16) + ';' + binaryNumber2.toString(16)

  return hexNumber
}

export function hexUncompressBitString(compressed: string): BitString {
  let [hexString1, hexString2] = compressed.split(';')

  let [parsedHexNumber1, parsedHexNumber2] = [
    parseInt(hexString1, 16),
    parseInt(hexString2, 16),
  ]

  let [parsedBinaryString1, parsedBinaryString2] = [
    parsedHexNumber1.toString(2),
    parsedHexNumber2.toString(2),
  ]

  let parsedBinaryString =
    parsedBinaryString1.padStart(50, '0') +
    parsedBinaryString2.padStart(50, '0')

  return parsedBinaryString.split('').map((x) => parseInt(x) as 1 | 0)
}

export function autoDecompress(compressed: string) {
  let compression = detectCompression(compressed)
  if (compression == 'runlength') {
    return runLengthUncompressBitString(compressed)
  } else {
    return hexUncompressBitString(compressed)
  }
}
