declare namespace Offline {
  type Event = AddEvent<Cube.OLLSection> | AddEvent<Cube.PLLSection> | DeleteEvent | UpdateEvent

  interface AddEvent<Section extends Cube.OLLSection | Cube.PLLSection> {
    event: 'add',
    type: 'oll' | 'pll',
    section: Section,
    name: Section extends Cube.OLLSection ? Cube.OLLName : Cube.PLLName,
    algo: Algo.RubicsAlgorithm
  }

  interface DeleteEvent {
    event: 'delete',
    id: string
  }

  interface UpdateEvent {
    event: 'update',
    id: string,
    algo: Algo.RubicsAlgorithm
  }
}