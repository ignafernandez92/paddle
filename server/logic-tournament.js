
const connection = require('../db');

const getUserClubQuery = `SELECT club_id FROM users WHERE user_id = ?`;

db.query(getUserClubQuery, [user.id], (getUserClubError, userClubRows) => {
  if (getUserClubError) {
    console.error("Error while fetching user's club ID: ", getUserClubError);
  } else {
    const userClubId = userClubRows[0].club_id;

    const getCourtsQuery = `SELECT courtId FROM courts WHERE club_id = ?`;

    db.query(getCourtsQuery, [userClubId], (getCourtsError, courtRows) => {
      if (getCourtsError) {
        console.error("Error while fetching courts: ", getCourtsError);
      } else {
        const availableCourts = courtRows.length;

        console.log(`Club ID ${userClubId} has ${availableCourts} available courts.`);
      }
    });
  }
});