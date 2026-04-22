import { calculateBullsAndCows } from './gameLogic';

export type Individual = number[];

export interface GAHistory {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GAStats {
  generation: number;
  populationSize: number;
  bestFitness: number;
  totalHistory: number;
  selectedGuess: string;
  selectionReason: string;
}

export interface GAGenerationLog {
  generation: number;
  avgFitness: number;
  bestFitness: number;
  topIndividuals: string[];
}

export class GeneticAlgorithm {
  private populationSize = 100;
  private mutationRate = 0.15;
  private eliteSize = 10;
  private tournamentSize = 5;
  
  private population: Individual[] = [];
  private history: GAHistory[] = [];
  private generationLogs: GAGenerationLog[] = [];

  constructor() {
    this.initializePopulation();
  }

  private initializePopulation(): void {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push(this.generateRandomIndividual());
    }
  }

  private generateRandomIndividual(): Individual {
    const digits: number[] = [];
    const available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * available.length);
      digits.push(available[idx]);
      available.splice(idx, 1);
    }
    
    return digits;
  }

  private individualToString(individual: Individual): string {
    return individual.join('');
  }

  private calculateFitness(individual: Individual): number {
    if (this.history.length === 0) return 0;
    
    let consistentCount = 0;
    const guessString = this.individualToString(individual);
    
    for (const record of this.history) {
      const { bulls, cows } = calculateBullsAndCows(record.guess, guessString);
      if (bulls === record.bulls && cows === record.cows) {
        consistentCount++;
      }
    }
    
    return consistentCount;
  }

  private tournamentSelection(): Individual {
    const tournament: Individual[] = [];
    
    for (let i = 0; i < this.tournamentSize; i++) {
      const idx = Math.floor(Math.random() * this.population.length);
      tournament.push(this.population[idx]);
    }
    
    let best = tournament[0];
    let bestFitness = this.calculateFitness(best);
    
    for (let i = 1; i < tournament.length; i++) {
      const fitness = this.calculateFitness(tournament[i]);
      if (fitness > bestFitness) {
        best = tournament[i];
        bestFitness = fitness;
      }
    }
    
    return [...best];
  }

  private crossover(parent1: Individual, parent2: Individual): Individual {
    const crossoverPoint = Math.floor(Math.random() * 3) + 1;
    const child: number[] = [];
    const used = new Set<number>();
    
    // Take first part from parent1
    for (let i = 0; i < crossoverPoint; i++) {
      child.push(parent1[i]);
      used.add(parent1[i]);
    }
    
    // Try to fill from parent2
    for (let i = crossoverPoint; i < 4; i++) {
      if (!used.has(parent2[i])) {
        child.push(parent2[i]);
        used.add(parent2[i]);
      } else {
        // Find unused digit
        for (let digit = 0; digit <= 9; digit++) {
          if (!used.has(digit)) {
            child.push(digit);
            used.add(digit);
            break;
          }
        }
      }
    }
    
    // Ensure we have 4 unique digits
    while (child.length < 4) {
      for (let digit = 0; digit <= 9; digit++) {
        if (!used.has(digit)) {
          child.push(digit);
          used.add(digit);
          break;
        }
      }
    }
    
    return child;
  }

  private mutate(individual: Individual): Individual {
    if (Math.random() > this.mutationRate) {
      return individual;
    }
    
    const mutated = [...individual];
    const idx1 = Math.floor(Math.random() * 4);
    const idx2 = Math.floor(Math.random() * 4);
    
    [mutated[idx1], mutated[idx2]] = [mutated[idx2], mutated[idx1]];
    
    return mutated;
  }

  public evolve(maxGenerations: number = 100): GAStats {
    let generation = 0;
    let bestIndividual: Individual | null = null;
    let bestFitness = 0;
    const targetFitness = this.history.length;

    while (generation < maxGenerations) {
      generation++;
      
      // Calculate fitness for all individuals
      const fitnessScores = this.population.map(ind => ({
        individual: ind,
        fitness: this.calculateFitness(ind)
      }));
      
      // Sort by fitness
      fitnessScores.sort((a, b) => b.fitness - a.fitness);
      
      // Track best
      if (fitnessScores[0].fitness > bestFitness) {
        bestFitness = fitnessScores[0].fitness;
        bestIndividual = fitnessScores[0].individual;
      }
      
      // Log generation stats
      const avgFitness = fitnessScores.reduce((sum, f) => sum + f.fitness, 0) / fitnessScores.length;
      this.generationLogs.push({
        generation,
        avgFitness,
        bestFitness: fitnessScores[0].fitness,
        topIndividuals: fitnessScores.slice(0, 3).map(f => this.individualToString(f.individual))
      });
      
      // Check if we found a fully consistent individual
      if (bestFitness === targetFitness) {
        break;
      }
      
      // Create new population
      const newPopulation: Individual[] = [];
      
      // Elitism: keep top individuals
      for (let i = 0; i < this.eliteSize; i++) {
        newPopulation.push([...fitnessScores[i].individual]);
      }
      
      // Add some random individuals for diversity (5% of population)
      const randomCount = Math.floor(this.populationSize * 0.05);
      for (let i = 0; i < randomCount; i++) {
        newPopulation.push(this.generateRandomIndividual());
      }
      
      // Generate rest through selection, crossover, mutation
      while (newPopulation.length < this.populationSize) {
        const parent1 = this.tournamentSelection();
        const parent2 = this.tournamentSelection();
        let child = this.crossover(parent1, parent2);
        child = this.mutate(child);
        newPopulation.push(child);
      }
      
      this.population = newPopulation;
    }

    // Select the best individual that hasn't been tried before
    const fitnessScores = this.population.map(ind => ({
      individual: ind,
      fitness: this.calculateFitness(ind)
    }));
    fitnessScores.sort((a, b) => b.fitness - a.fitness);
    
    // Get set of previously tried guesses
    const triedGuesses = new Set(this.history.map(h => h.guess));
    
    // Find best individual that hasn't been tried
    let selectedIndividual = fitnessScores[0].individual;
    let selectedFitness = fitnessScores[0].fitness;
    
    for (const score of fitnessScores) {
      const guessString = this.individualToString(score.individual);
      if (!triedGuesses.has(guessString)) {
        selectedIndividual = score.individual;
        selectedFitness = score.fitness;
        break;
      }
    }
    
    // If all top individuals have been tried, generate a new random one
    const selectedGuessString = this.individualToString(selectedIndividual);
    if (triedGuesses.has(selectedGuessString)) {
      selectedIndividual = this.generateRandomIndividual();
      selectedFitness = this.calculateFitness(selectedIndividual);
    }
    
    let selectionReason = '';
    if (selectedFitness === targetFitness) {
      selectionReason = `Полностью согласована со всеми ${targetFitness} предыдущими попытками`;
    } else if (this.history.length === 0) {
      selectionReason = 'Случайная начальная попытка из эволюционировавшей популяции';
    } else {
      selectionReason = `Лучший кандидат (согласован с ${selectedFitness}/${targetFitness} попытками)`;
    }

    return {
      generation,
      populationSize: this.populationSize,
      bestFitness: selectedFitness,
      totalHistory: this.history.length,
      selectedGuess: this.individualToString(selectedIndividual),
      selectionReason
    };
  }

  public addHistory(guess: string, bulls: number, cows: number): void {
    this.history.push({ guess, bulls, cows });
  }

  public getGenerationLogs(): GAGenerationLog[] {
    return this.generationLogs;
  }

  public clearLogs(): void {
    this.generationLogs = [];
  }

  public reset(): void {
    this.history = [];
    this.generationLogs = [];
    this.initializePopulation();
  }
}