export class Tournament {
    constructor(
      public startDate: Date,
      public endDate: Date,
      public numberOfPairs: number,
      public numberOfCourts: number,
      public user_id: string
    ) {}
  }