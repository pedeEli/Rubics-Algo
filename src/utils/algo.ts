export const turnToString = (turn: Algo.Turn) => {
    let str = turn.side
    if (turn.double)
        str += '2'
    if (turn.prime)
        str += '\''
    return str
}