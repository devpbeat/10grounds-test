function rand(): number {
    return Math.floor(Math.random() * (201 - 100)) + 100; // Rango ajustado para incluir 200
}

function createFluorescentTube(): { hoursBeforeBreak: number, useTube: () => void, isBroken: () => boolean } {
    let hoursBeforeBreak = rand();

    function useTube(): void {
        if (hoursBeforeBreak > 0) {
            hoursBeforeBreak--;
        }
    }

    function isBroken(): boolean {
        return hoursBeforeBreak <= 0;
    }

    return { hoursBeforeBreak, useTube, isBroken };
}

function createFluorescentTubeUnit(): { tubes: { hoursBeforeBreak: number, useTube: () => void, isBroken: () => boolean }[], useUnit: () => void, hasFailed: () => boolean, replaceUnit: () => void, getReplacementCost: () => number } {
    let tubes = Array.from({ length: 4 }, () => createFluorescentTube());

    function useUnit(): void {
        tubes.forEach(tube => tube.useTube());
    }

    function hasFailed(): boolean {
        const brokenTubes = tubes.filter(tube => tube.isBroken()).length;
        return brokenTubes >= 2;
    }

    function replaceUnit(): void {
        tubes = Array.from({ length: 4 }, () => createFluorescentTube());
    }

    function getReplacementCost(): number {
        return tubes.length * 7;
    }

    return { tubes, useUnit, hasFailed, replaceUnit, getReplacementCost };
}

function simulateYear(units: { tubes: { hoursBeforeBreak: number, useTube: () => void, isBroken: () => boolean }[], useUnit: () => void, hasFailed: () => boolean, replaceUnit: () => void, getReplacementCost: () => number }[]): { brokenTubes: number, replacementCost: number } {
    let brokenTubesCount = 0;
    let totalReplacementCost = 0;

    for (let i = 0; i < 15 * 5 * 4 * 9; i++) {
        units.forEach(unit => {
            unit.useUnit();
            if (unit.hasFailed()) {
                brokenTubesCount += 4; // Se agregan 4 tubos al contador de roturas ya que la unidad ha fallado
                totalReplacementCost += unit.getReplacementCost();
                unit.replaceUnit();
            }
        });
    }

    return { brokenTubes: brokenTubesCount, replacementCost: totalReplacementCost };
}

const units = Array.from({ length: 4 }, () => createFluorescentTubeUnit());
// @ts-ignore
const { brokenTubes, replacementCost } = simulateYear(units);

console.log(`Number of broken tubes in a year: ${brokenTubes}`);
console.log(`Cost of fluorescent tubes per year: $${replacementCost}`);