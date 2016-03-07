const DATA = {
  name: 'ROOT',
  children: [
    {
      name: 'A',
      children: [
        {
          name: 'AA',
          children: [
            {
              name: 'AAA',
              value: 4
            },
            {
              name: 'BBB',
              value: 8
            },
            {
              name: 'CCC',
              value: 16
            },
          ]
        },
      ]
    },
    {
      name: 'B',
      children: [
        {
          name: '1',
          value: 10
        },
        {
          name: '2',
          value: 20
        },
        {
          name: '3',
          value: 30
        },
      ]
    },
    {
      name: 'C',
      value: 15
    },
    {
      name: 'D',
      children: [
        {
          name: '000',
          value: 5,
        },
        {
          name: '001',
          value: 6,
        },
        {
          name: '010',
          value: 7,
        },
        {
          name: '011',
          value: 8,
        },
      ]
    }
  ]
};
export default DATA;
