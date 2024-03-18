class FluorescentTube {
    private hoursBeforeBreak: number;
  
    constructor() {
      this.hoursBeforeBreak = this.rand();
    }
  
    private rand(): number {
      return Math.floor(Math.random() * (201 - 100)) + 100; // Adjusted range to include 200
    }
  
    getHoursBeforeBreak(): number {
      return this.hoursBeforeBreak;
    }
  
    useTube(): void {
      if (this.hoursBeforeBreak > 0) {
        this.hoursBeforeBreak--;
      }
    }
  
    isBroken(): boolean {
      return this.hoursBeforeBreak <= 0;
    }
  }
  
  class FluorescentTubeUnit {
    private tubes: FluorescentTube[];
  
    constructor() {
      this.tubes = Array.from({ length: 4 }, () => new FluorescentTube());
    }
  
    useUnit(): void {
      this.tubes.forEach(tube => tube.useTube());
    }
  
    hasFailed(): boolean {
      const brokenTubes = this.tubes.filter(tube => tube.isBroken()).length;
      return brokenTubes >= 2;
    }
  
    replaceUnit(): void {
      this.tubes = Array.from({ length: 4 }, () => new FluorescentTube());
    }
  
    getReplacementCost(): number {
      return this.tubes.length * 7;
    }
  }
  
  class Classroom {
    private units: FluorescentTubeUnit[];
  
    constructor() {
      this.units = Array.from({ length: 4 }, () => new FluorescentTubeUnit());
    }
  
    simulateYear(): { brokenTubes: number; replacementCost: number } {
      let brokenTubes = 0;
      let replacementCost = 0;
  
      for (let i = 0; i < 15 * 5 * 4 * 9; i++) {
        this.units.forEach(unit => {
          unit.useUnit();
          if (unit.hasFailed()) {
            brokenTubes += 4; // Adding 4 tubes to broken count since the unit has failed
            replacementCost += unit.getReplacementCost();
            unit.replaceUnit();
          }
        });
      }
  
      return { brokenTubes, replacementCost };
    }
  }
  
  const classroom = new Classroom();
// @ts-ignore
  const { brokenTubes, replacementCost } = classroom.simulateYear();
  
  console.log(`Number of broken tubes in a year: ${brokenTubes}`);
  console.log(`Cost of fluorescent tubes per year: $${replacementCost}`);
  