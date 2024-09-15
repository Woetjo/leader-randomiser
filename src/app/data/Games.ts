export const Games: Array<any> = [
  {
    name: 'Phantom Leader Deluxe',
    filename: 'PhantomLeader.json',
  },
  {
    name: 'Corsair Leader',
    filename: 'CorsairLeader.json',
  },
  {
    name: 'Hornet Leader: Carrier Air Operations',
    filename: 'HornetLeader.json',
  },
  {
    name: 'Zero Leader',
    filename: 'ZeroLeader.json',
  },
  {
    name: 'Israeli Airforce Leader',
    filename: 'IsraeliAirForceLeader.json',
  }
].sort((a, b) => a.name.localeCompare(b.name));
