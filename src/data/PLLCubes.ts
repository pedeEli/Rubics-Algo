const pll: Record<Cube.PLLSection, Record<string, Cube.PLLCubeProps>> = {
    "Edges Only": {
        "Ua": {
            arrows: [
                {x1: 3, y1: 2, x2: 1, y2: 2},
                {x1: 1, y1: 2, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 3, y2: 2}
            ],
            right1: 3,
            bottom1: 1,
            left1: 2
        },
        "Ub": {
            arrows: [
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 1, y2: 2}
            ],
            right1: 2,
            bottom1: 3,
            left1: 1
        },
        "H": {
            arrows: [
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 1, y2: 2},
                {x1: 2, y1: 1, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 2, y2: 1}
            ],
            top1: 2,
            right1: 3,
            bottom1: 0,
            left1: 1
        },
        "Z": {
            arrows: [
                {x1: 1, y1: 2, x2: 2, y2: 1},
                {x1: 2, y1: 1, x2: 1, y2: 2},
                {x1: 2, y1: 3, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 2, y2: 3}
            ],
            top1: 3,
            right1: 2,
            bottom1: 1,
            left1: 0
        }
    },
    "Corners Only": {
        "Aa": {
            arrows: [
                {x1: 1, y1: 1, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 1, y2: 1}
            ],
            top0: 1,
            top2: 2,
            right0: 3,
            bottom2: 3,
            left0: 0,
            left2: 0
        },
        "Ab": {
            arrows: [
                {x1: 1, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 1, y2: 1}
            ],
            top0: 3,
            top2: 3,
            right0: 0,
            bottom2: 0,
            left0: 1,
            left2: 2
        },
        "E": {
            arrows: [
                {x1: 1, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 1, y2: 1},
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1}
            ],
            top0: 3,
            top2: 1,
            right0: 2,
            right2: 0,
            bottom0: 1,
            bottom2: 3,
            left0: 0,
            left2: 2
        }
    },
    "Adjacent Corner Swap": {
        "T": {
            arrows: [
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1},
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 1, y2: 2}
            ],
            top2: 1,
            right0: 2,
            right1: 3,
            right2: 0,
            bottom0: 1,
            left1: 1
        },
        "F": {
            arrows: [
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1},
                {x1: 2, y1: 1, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 2, y2: 1}
            ],
            top1: 2,
            top2: 1,
            right0: 2,
            right2: 0,
            bottom0: 1,
            bottom1: 0
        },
        "Jb": {
            arrows: [
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1},
                {x1: 3, y1: 2, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 3, y2: 2}
            ],
            top2: 1,
            right0: 2,
            right1: 2,
            right2: 0,
            bottom0: 1,
            bottom1: 1
        },
        "Ja": {
            arrows: [
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1},
                {x1: 3, y1: 2, x2: 2, y2: 1},
                {x1: 2, y1: 1, x2: 3, y2: 2}
            ],
            top1: 1,
            top2: 1,
            right0: 2,
            right1: 0,
            right2: 0,
            bottom0: 1
        },
        "Ra": {
            arrows: [
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1},
                {x1: 1, y1: 2, x2: 2, y2: 1},
                {x1: 2, y1: 1, x2: 1, y2: 2}
            ],
            top1: 3,
            top2: 1,
            right0: 2,
            right2: 0,
            bottom0: 1,
            left1: 0
        },
        "Rb": {
            arrows: [
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 3, y2: 1},
                {x1: 1, y1: 2, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 1, y2: 2}
            ],
            top2: 1,
            right0: 2,
            right2: 0,
            bottom0: 1,
            bottom1: 3,
            left1: 2
        }
    },
    "Diagonal Corner Swap": {
        "Y": {
            arrows: [
                {x1: 1, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 1, y2: 1},
                {x1: 1, y1: 2, x2: 2, y2: 1},
                {x1: 2, y1: 1, x2: 1, y2: 2}
            ],
            top0: 2,
            top1: 3,
            right2: 3,
            bottom0: 0,
            left1: 0,
            left2: 1
        },
        "V": {
            arrows:[
                {x1: 1, y1: 3, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 1, y2: 3},
                {x1: 2, y1: 3, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 2, y2: 3}
            ],
            top2: 2,
            right0: 3,
            right1: 2,
            bottom1: 1,
            bottom2: 0,
            left0: 1
        },
        "Na": {
            arrows: [
                {x1: 1, y1: 3, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 1, y2: 2}
            ],
            top2: 2,
            right0: 3,
            right1: 3,
            bottom2: 0,
            left0: 1,
            left1: 1
        },
        "Nb": {
            arrows: [
                {x1: 1, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 1, y2: 1},
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 1, y2: 2}
            ],
            top0: 2,
            right1: 3,
            right2: 3,
            bottom0: 0,
            left1: 1,   
            left2: 1
        }
    },
    "G Permutations": {
        "Ga": {
            arrows: [
                {x1: 1, y1: 1, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 1, y2: 1},
                {x1: 2, y1: 1, x2: 1, y2: 2},
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 2, y2: 1}
            ],
            top0: 1,
            top1: 3,
            top2: 2,
            right0: 3,
            right1: 0,
            bottom2: 3,
            left0: 0,
            left1: 1,
            left2: 0
        },
        "Gb": {
            arrows: [
                {x1: 1, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 1, y2: 1},
                {x1: 2, y1: 1, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 1, y2: 2},
                {x1: 1, y1: 2, x2: 2, y2: 1}
            ],
            top0: 3,
            top1: 2,
            right2: 3,
            bottom0: 0,
            bottom1: 3,
            bottom2: 1,
            left0: 2,
            left1: 0,
            left2: 2
        },
        "Gc": {
            arrows: [
                {x1: 1, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 1, y2: 1},
                {x1: 1, y1: 2, x2: 3, y2: 2},
                {x1: 3, y1: 2, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 1, y2: 2}
            ],
            top0: 3,
            right1: 2,
            right2: 3,
            bottom0: 0,
            bottom1: 3,
            bottom2: 1,
            left0: 2,
            left1: 1,
            left2: 2
        },
        "Gd": {
            arrows: [
                {x1: 1, y1: 1, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 1, y2: 3},
                {x1: 1, y1: 3, x2: 1, y2: 1},
                {x1: 2, y1: 1, x2: 1, y2: 2},
                {x1: 1, y1: 2, x2: 2, y2: 3},
                {x1: 2, y1: 3, x2: 2, y2: 1}
            ],
            top0: 1,
            top1: 3,
            top2: 2,
            right0: 3,
            bottom1: 0,
            bottom2: 3,
            left0: 0,
            left1: 2,
            left2: 0
        }
    }
}

export default pll