import each from 'jest-each';
import { verifyMovement, RobotState, Direction } from './verify-movement';

const mkState = (x: number, y: number, direction: Direction): RobotState => ({ x, y, direction });


describe('Verify Robot Movement', () => {
    it('does not move if given no actions', () => {
        const initialState: RobotState = {
            x: 0,
            y: 0,
            direction: Direction.NORTH,
        }
        const destination: RobotState = verifyMovement(initialState, '');
        expect(destination.x).toEqual(0);
        expect(destination.y).toEqual(0);
        expect(destination.direction).toEqual(Direction.NORTH);
    });

    each([
        [Direction.NORTH, Direction.EAST],
        [Direction.EAST, Direction.SOUTH],
        [Direction.SOUTH, Direction.WEST],
        [Direction.WEST, Direction.NORTH],
    ]).test('rotates right correctly', (start, end) => {
        const initialState: RobotState = { x: 0, y: 0, direction: start }
        const destination: RobotState = verifyMovement(initialState, 'R');
        expect(destination.x).toEqual(0);
        expect(destination.y).toEqual(0);
        expect(destination.direction).toEqual(end);
    });
    
    each([
        [Direction.NORTH, Direction.WEST],
        [Direction.WEST, Direction.SOUTH],
        [Direction.SOUTH, Direction.EAST],
        [Direction.EAST, Direction.NORTH],
    ]).test('rotates left correctly', (start, end) => {
        const initialState: RobotState = { x: 0, y: 0, direction: start }
        const destination: RobotState = verifyMovement(initialState, 'L');
        expect(destination.x).toEqual(0);
        expect(destination.y).toEqual(0);
        expect(destination.direction).toEqual(end);
    }); 

    each([
        [Direction.NORTH, Direction.NORTH, "LR"],
        [Direction.EAST, Direction.EAST, "LR"],
        [Direction.SOUTH, Direction.SOUTH, "LR"],
        [Direction.WEST, Direction.WEST, "LR"],
        
        [Direction.NORTH, Direction.SOUTH, "LL"],
        [Direction.NORTH, Direction.SOUTH, "RR"],
        [Direction.EAST, Direction.WEST, "LL"],
        [Direction.WEST, Direction.EAST, "RR"],
        
        [Direction.WEST, Direction.WEST, "LLLL"],
        [Direction.EAST, Direction.EAST, "RRRR"],

    ]).test('Rotates Correctly with multiple ', (start, end, instructions) => {
        const initialState: RobotState = { x: 0, y: 0, direction: start }
        const destination: RobotState = verifyMovement(initialState, instructions);
        expect(destination.x).toEqual(0);
        expect(destination.y).toEqual(0);
        expect(destination.direction).toEqual(end);
    }); 

    it('Advances Correctly North', () => {
        const initialState: RobotState = { x: 0, y: 0, direction: Direction.NORTH }
        const destination: RobotState = verifyMovement(initialState, "A");
        expect(destination.x).toEqual(0);
        expect(destination.y).toEqual(1);
        expect(destination.direction).toEqual(Direction.NORTH);
    }); 

    it('Advances Correctly South', () => {
        const initialState: RobotState = { x: 0, y: 0, direction: Direction.SOUTH }
        const destination: RobotState = verifyMovement(initialState, "A");
        expect(destination.x).toEqual(0);
        expect(destination.y).toEqual(-1);
        expect(destination.direction).toEqual(Direction.SOUTH);
    }); 
    
    it('Advances Correctly East', () => {
        const initialState: RobotState = { x: 0, y: 0, direction: Direction.EAST }
        const destination: RobotState = verifyMovement(initialState, "A");
        expect(destination.x).toEqual(1);
        expect(destination.y).toEqual(0);
        expect(destination.direction).toEqual(Direction.EAST);
    }); 
    
    it('Advances Correctly West', () => {
        const initialState: RobotState = { x: 0, y: 0, direction: Direction.WEST }
        const destination: RobotState = verifyMovement(initialState, "A");
        expect(destination.x).toEqual(-1);
        expect(destination.y).toEqual(0);
        expect(destination.direction).toEqual(Direction.WEST);
    });

    each([
        [mkState(0, 0, Direction.WEST),  "AA",     mkState(-2, 0, Direction.WEST) ],
        [mkState(5, 5, Direction.WEST),  "AA",     mkState(3, 5, Direction.WEST)  ],
        [mkState(7, 3, Direction.NORTH), "R",      mkState(7, 3, Direction.EAST)  ],
        [mkState(7, 3, Direction.NORTH), "RA",     mkState(8, 3, Direction.EAST)  ],
        [mkState(7, 3, Direction.NORTH), "RAA",    mkState(9, 3, Direction.EAST)  ],
        [mkState(7, 3, Direction.NORTH), "RAAL",   mkState(9, 3, Direction.NORTH) ],
        [mkState(7, 3, Direction.NORTH), "RAALA",  mkState(9, 4, Direction.NORTH) ],
        [mkState(7, 3, Direction.NORTH), "RAALAL", mkState(9, 4, Direction.WEST)  ],
    ]).test('Several full tests work correctly', (initialState, actions, finalState) => {
        const destination: RobotState = verifyMovement(initialState, actions);
        expect(destination.x).toEqual(finalState.x);
        expect(destination.y).toEqual(finalState.y);
        expect(destination.direction).toEqual(finalState.direction);
    });
});