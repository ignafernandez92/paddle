const availableCourts = 5; // Number of available courts
const courtStartTime = 9 * 60; // Court availability starts at 9:00 AM (in minutes)
const courtEndTime = 18 * 60; // Court availability ends at 6:00 PM (in minutes)
const gameDuration = 90; // Duration of each game in minutes
const breakDuration = 15; // Break time between games in minutes
const couples = [
  { name: 'Player 1', timePreference: 480 }, // Example couples with time preferences
  { name: 'Player 2', timePreference: 540 },
  { name: 'Player 3', timePreference: 600 },
  // Add more couples as needed
];

// Calculate the total number of games that can be scheduled
const totalGames = (courtEndTime - courtStartTime) / (gameDuration + breakDuration);

if (totalGames < 1) {
  console.error('No time available to schedule games.');
} else {
  // Sort couples by their time preferences
  const sortedCouples = couples.sort((a, b) => a.timePreference - b.timePreference);

  // Create a schedule for each couple
  const schedule = [];
  for (let i = 0; i < sortedCouples.length; i += 2) {
    const couple1 = sortedCouples[i];
    const couple2 = sortedCouples[i + 1];
    if (couple1 && couple2) {
      // Calculate game start times based on time preferences
      const startTime1 = Math.max(couple1.timePreference, courtStartTime);
      const startTime2 = Math.max(couple2.timePreference, courtStartTime);
      
      // Check if there's enough time to schedule the game
      if (startTime1 + gameDuration <= courtEndTime && startTime2 + gameDuration <= courtEndTime) {
        schedule.push({
          couple1: couple1.name,
          couple2: couple2.name,
          court: i % availableCourts + 1, // Assign courts in a round-robin fashion
          startTime: Math.min(startTime1, startTime2),
        });
      }
    }
  }

  if (schedule.length === 0) {
    console.error('No games could be scheduled based on the constraints.');
  } else {
    console.log('Tournament Schedule:');
    schedule.forEach((game, index) => {
      console.log(`Game ${index + 1}:`);
      console.log(`  ${game.couple1} vs. ${game.couple2}`);
      console.log(`  Court ${game.court}`);
      const startHour = Math.floor(game.startTime / 60);
      const startMinute = game.startTime % 60;
      console.log(`  Start Time: ${startHour}:${startMinute}`);
      console.log();
    });
  }
}
