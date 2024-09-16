export const mockNotifications = [
  {
    id: 1,
    type: 'team',
    content: 'Man Utd seeks a striker.', // Short version for the panel
    details: {
      name: 'Manchester United',
      country: 'England',
      division: 'Premier League',
      position: 'Striker',
      financials: 'Budget: $50M',
      fullContent: 'Manchester United is currently looking for a highly skilled and experienced striker to strengthen their squad for the upcoming season.' // Long version for the modal
    },
    read: true
  },
  {
    id: 2,
    type: 'player',
    content: 'John Doe joins FC Barcelona.', // Short version for the panel
    details: {
      name: 'John Doe',
      age: 22,
      currentTeam: 'FC Barcelona',
      position: 'Midfielder',
      fullContent: 'New player assigned to the roster: John Doe, 22 years old, has officially joined FC Barcelona as a key player for the midfield position.' // Long version for the modal
    },
    read: false
  },
  {
    id: 3,
    type: 'proposal',
    content: 'Proposal for Jane Smith to Arsenal.', // Short version for the panel
    details: {
      sentPlayer: 'Jane Smith',
      sender: 'Chelsea FC',
      salary: '£100K/week',
      fullContent: 'Proposal received for Jane Smith to join Arsenal. Chelsea FC has made a substantial offer to transfer the player to their rival team in the league.' // Long version for the modal
    },
    read: false
  },
  {
    id: 4,
    type: 'team',
    content: 'Real Madrid seeks midfielder.', // Short version for the panel
    details: {
      name: 'Real Madrid',
      country: 'Spain',
      division: 'La Liga',
      position: 'Midfielder',
      financials: 'Budget: $60M',
      fullContent: 'Real Madrid is actively seeking a talented and versatile midfielder to bolster their squad ahead of the La Liga season.' // Long version for the modal
    },
    read: false
  },
  {
    id: 5,
    type: 'player',
    content: 'Michael Johnson contract negotiation.', // Short version for the panel
    details: {
      name: 'Michael Johnson',
      age: 24,
      currentTeam: 'Liverpool FC',
      position: 'Defender',
      fullContent: 'Update on player Michael Johnson: The defender, currently with Liverpool FC, is undergoing contract negotiations for a potential renewal.' // Long version for the modal
    },
    read: true
  },
  {
    id: 6,
    type: 'proposal',
    content: 'Proposal for John Doe to PSG.', // Short version for the panel
    details: {
      sentPlayer: 'John Doe',
      sender: 'Manchester United',
      salary: '£120K/week',
      fullContent: 'Proposal for John Doe to join Paris Saint-Germain. Manchester United has offered a lucrative contract to entice the player to the French club.' // Long version for the modal
    },
    read: false
  },
  {
    id: 7,
    type: 'team',
    content: 'Liverpool seeks a goalkeeper.', // Short version for the panel
    details: {
      name: 'Liverpool FC',
      country: 'England',
      division: 'Premier League',
      position: 'Goalkeeper',
      financials: 'Budget: $40M',
      fullContent: 'Liverpool is actively searching for a reliable and experienced goalkeeper to fill the critical position for the upcoming Premier League season.' // Long version for the modal
    },
    read: false
  },
  {
    id: 8,
    type: 'player',
    content: 'Alex Lee, 19, joins Manchester City.', // Short version for the panel
    details: {
      name: 'Alex Lee',
      age: 19,
      currentTeam: 'Manchester City',
      position: 'Forward',
      fullContent: 'Player assigned: Alex Lee, a 19-year-old forward, has been officially introduced as a new member of Manchester City’s attacking lineup.' // Long version for the modal
    },
    read: true
  },
  {
    id: 9,
    type: 'proposal',
    content: 'Proposal for Sarah Green to join Tottenham.', // Short version for the panel
    details: {
      sentPlayer: 'Sarah Green',
      sender: 'Chelsea FC',
      salary: '£90K/week',
      fullContent: 'Proposal received for Sarah Green: Tottenham Hotspur has made an official bid to acquire the services of the talented Chelsea player.' // Long version for the modal
    },
    read: false
  }
];
