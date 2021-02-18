export const requisitionStates = {
  pending: { color: '#D38C22', name: 'Pending' },
  cancelled: { color: '#9E2A2B', name: 'Cancelled' },
  can_pickup: { color: '#3685B5', name: 'Ready to Pickup' },
  active: { color: '#65A550', name: 'Active' },
  returned: { color: '#4B7C3C', name: 'Returned' },
  not_returning: { color: '#325328', name: 'Not Returning' },
};

export const materialTypes = [
  { text: 'Item', value: 'item' },
  { text: 'Tool', value: 'tool' },
  { text: 'Other', value: 'other' },
];

export const materialStates = [
  { text: 'Good condition', value: 'good' },
  { text: 'Damaged', value: 'damaged' },
  { text: 'Retired', value: 'retired' },
];
export const stateColors = {
  good: 'green',
  damaged: 'orange',
  retired: 'red',
};
export const typeColors = {
  item: 'teal',
  tool: 'indigo',
  other: 'grey',
};
