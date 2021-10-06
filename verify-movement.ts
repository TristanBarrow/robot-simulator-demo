
export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

export type RobotState = {
    x: number
    y: number
    direction: Direction
}

const rotateRight = (state: RobotState): RobotState => {
    switch (state.direction) {
        case Direction.NORTH: return { ...state, direction: Direction.EAST };
        case Direction.WEST: return { ...state, direction: Direction.NORTH };
        case Direction.SOUTH: return { ...state, direction: Direction.WEST };
        case Direction.EAST: return { ...state, direction: Direction.SOUTH };
    }
};

const rotateLeft = (state: RobotState): RobotState => {
    switch (state.direction) {
        case Direction.NORTH: return { ...state, direction: Direction.WEST };
        case Direction.WEST: return { ...state, direction: Direction.SOUTH };
        case Direction.SOUTH: return { ...state, direction: Direction.EAST };
        case Direction.EAST: return { ...state, direction: Direction.NORTH };
    }
};

const advance = (state: RobotState): RobotState => {
    switch(state.direction) {
        case Direction.NORTH: return { ...state, y: state.y + 1 };
        case Direction.SOUTH: return { ...state, y: state.y - 1 };
        case Direction.EAST:  return { ...state, x: state.x + 1 }; 
        case Direction.WEST:  return { ...state, x: state.x - 1 };
    }
}


export const verifyMovement = (initialState: RobotState, actions: string): RobotState => {
    let state = initialState;
    actions.split('').forEach((action) => {
        if (action === 'R') state = rotateRight(state); 
        if (action === 'L') state = rotateLeft(state);
        if (action === 'A') state = advance(state);
    });

    return state;
}










// I had Rotate left and right implemented like this but I feel that this 
// implementation is not very resistant to changes in the enum and it is 
// significantly harder to read 

// const rotateRight = (direction: Direction): Direction => (direction + 1) % 4;
// const rotateLeft = (direction: Direction): Direction => {
//     if (direction === Direction.NORTH) return Direction.WEST;
//     return (direction - 1) % 4; 
// }