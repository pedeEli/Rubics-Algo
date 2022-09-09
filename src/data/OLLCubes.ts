const oll: Record<Cube.OLLSection, Partial<Record<Cube.OLLName, Cube.OLLCubeProps>>> = {
    "All Corners Oriented": {
        "OLL 20": {
            "top": 1,
            "right": 1,
            "bottom": 1,
            "left": 1
        },
        "OLL 28": {
            "right": 1,
            "bottom": 1
        },
        "OLL 57": {
            "top": 1,
            "bottom": 1
        }
    },
    "All Edges Oriented": {
        "OLL 21": {
            "topLeft": 1,
            "topRight": 2,
            "bottomLeft": 2,
            "bottomRight": 1
        },
        "OLL 22": {
            "topLeft": 1,
            "topRight": 1,
            "bottomLeft": 2,
            "bottomRight": 2
        },
        "OLL 23": {
            "bottomLeft": 1,
            "bottomRight": 2
        },
        "OLL 24": {
            "topLeft": 2,
            "bottomLeft": 1
        },
        "OLL 25": {
            "topRight": 2,
            "bottomLeft": 1
        },
        "OLL 26": {
            "topLeft": 1,
            "bottomLeft": 1,
            "bottomRight": 1
        },
        "OLL 27": {
            "topLeft": 2,
            "topRight": 2,
            "bottomRight": 2
        }
    },
    "P Shapes": {
        "OLL 31": {
            "topLeft": 2,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 32": {
            "topRight": 1,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1
        },
        "OLL 43": {
            "right": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 44": {
            "topRight": 2,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1
        }
    },
    "W Shapes": {
        "OLL 36": {
            "topRight": 1,
            "bottom": 1,
            "bottomLeft": 2,
            "left": 1
        },
        "OLL 38": {
            "topLeft": 2,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1
        }
    },
    "T Shapes": {
        "OLL 33": {
            "topLeft": 2,
            "top": 1,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 45": {
            "topLeft": 1,
            "top": 1,
            "bottom": 1,
            "bottomLeft": 2
        }
    },
    "Square Shapes": {
        "OLL 5": {
            "topRight": 2,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 6": {
            "topLeft": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        }
    },
    "Fish Shapes": {
        "OLL 9": {
            "topLeft": 1,
            "topRight": 1,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 10": {
            "topLeft": 2,
            "topRight": 2,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 35": {
            "top": 1,
            "topRight": 2,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 37": {
            "topRight": 2,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 1
        }
    },
    "C Shapes": {
        "OLL 34": {
            "topLeft": 2,
            "right": 1,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 46": {
            "topRight": 2,
            "right": 1,
            "bottomRight": 1,
            "left": 1
        }
    },
    "Small Lightning Bolts": {
        "OLL 7": {
            "topLeft": 2,
            "topRight": 2,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1
        },
        "OLL 8": {
            "topLeft": 1,
            "topRight": 1,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 11": {
            "topLeft": 2,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 12": {
            "topRight": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        }
    },
    "Big Lightning Bolts": {
        "OLL 39": {
            "topLeft": 1,
            "top": 1,
            "bottomRight": 2,
            "bottom": 1
        },
        "OLL 40": {
            "top": 1,
            "topRight": 2,
            "bottom": 1,
            "bottomLeft": 1
        }
    },
    "L Shapes": {
        "OLL 47": {
            "topLeft": 2,
            "topRight": 1,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 48": {
            "topLeft": 1,
            "topRight": 1,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 49": {
            "topLeft": 1,
            "topRight": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 2,
            "left": 1
        },
        "OLL 50": {
            "topLeft": 2,
            "topRight": 2,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 53": {
            "topLeft": 1,
            "topRight": 2,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 54": {
            "topLeft": 1,
            "topRight": 2,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2,
            "left": 1
        }
    },
    "Knight Move Shapes": {
        "OLL 13": {
            "topLeft": 2,
            "top": 1,
            "topRight": 2,
            "bottomRight": 2,
            "bottom": 1
        },
        "OLL 14": {
            "topLeft": 1,
            "top": 1,
            "topRight": 1,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 15": {
            "top": 1,
            "topRight": 2,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 16": {
            "topLeft": 1,
            "top": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 1
        }
    },
    "I Shapes": {
        "OLL 51": {
            "topLeft": 2,
            "top": 1,
            "topRight": 2,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2
        },
        "OLL 52": {
            "topLeft": 1,
            "topRight": 1,
            "right": 1,
            "bottomRight": 2,
            "bottomLeft": 2,
            "left": 1
        },
        "OLL 55": {
            "topLeft": 2,
            "top": 1,
            "topRight": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 56": {
            "topLeft": 1,
            "top": 1,
            "topRight": 2,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2
        }
    },
    "Awkward Shapes": {
        "OLL 29": {
            "topLeft": 2,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 1
        },
        "OLL 30": {
            "topRight": 1,
            "bottomRight": 2,
            "bottom": 1,
            "left": 1
        },
        "OLL 41": {
            "topLeft": 2,
            "topRight": 1,
            "right": 1,
            "bottom": 1
        },
        "OLL 42": {
            "topLeft": 1,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 2
        }
    },
    "No Edges Oriented": {
        "OLL 1": {
            "topLeft": 1,
            "top": 1,
            "topRight": 2,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2,
            "left": 1
        },
        "OLL 2": {
            "topLeft": 2,
            "top": 1,
            "topRight": 1,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2,
            "left": 1
        },
        "OLL 3": {
            "topLeft": 2,
            "top": 1,
            "topRight": 2,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1,
            "left": 1
        },
        "OLL 4": {
            "topLeft": 1,
            "top": 1,
            "topRight": 1,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 17": {
            "top": 1,
            "topRight": 2,
            "right": 1,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 18": {
            "top": 1,
            "right": 1,
            "bottomRight": 2,
            "bottom": 1,
            "bottomLeft": 1,
            "left": 1
        },
        "OLL 19": {
            "top": 1,
            "right": 1,
            "bottomRight": 1,
            "bottom": 1,
            "bottomLeft": 2,
            "left": 1
        }
    }
}

export default oll