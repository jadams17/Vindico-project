export default class OversArray {
    Name = "";
    PracticeOvers = null;
    CompetitionOvers = null;
 
    constructor(name, practiceOvers, competitionOvers) 
    {
      this.Name = name;
      this.PracticeOvers = practiceOvers;
      this.CompetitionOvers = competitionOvers;
    }
    getName()
    {
      return this.Name;
    }
    getPracticeOvers()
    {
      return this.PracticeOvers;
    }
    getCompetitionOvers()
    {
      return this.CompetitionOvers;
    }        
}