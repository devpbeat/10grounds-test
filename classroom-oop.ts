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

  public getBrokenTubes(): FluorescentTube[] {
    return this.tubes.filter(tube => tube.isBroken());
  }
}

class Classroom {
  private units: FluorescentTubeUnit[];

  constructor() {
    this.units = Array.from({ length: 4 }, () => new FluorescentTubeUnit());
  }

  simulateYear(): { brokenDueToLife: number; brokenDueToRule: number; replacementCost: number } {
    let brokenDueToLife = 0;
    let brokenDueToRule = 0;
    let replacementCost = 16 * 7; // Initial cost of 16 tubes

    for (let i = 0; i < 15 * 5 * 4 * 9; i++) {
        this.units.forEach(unit => {
            unit.useUnit(); // Updates the lifespan of all tubes in the unit

            // Track breakage with 'getBrokenTubes'
            const brokenTubes = unit.getBrokenTubes(); 
            brokenDueToLife += brokenTubes.length;

            if (brokenTubes.length >= 2) { 
                brokenDueToRule += 4; 
                replacementCost += unit.getReplacementCost();
                unit.replaceUnit();
            }
        });
    }

    return { brokenDueToLife, brokenDueToRule, replacementCost };
  }
}

const classroom = new Classroom();
const { brokenDueToLife, brokenDueToRule, replacementCost } = classroom.simulateYear();

console.log(`Number of tubes broken due to reaching lifespan: ${brokenDueToLife}`);
console.log(`Number of tubes broken due to the 2-tube rule: ${brokenDueToRule}`);
console.log(`Cost of fluorescent tubes per year: $${replacementCost}`);