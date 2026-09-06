import { Legitimacy, SurvivalClassType } from './enums/survival-class.enum';

export class SurvivalClassEntity {
  constructor(
    private readonly id: number | undefined,
    private type: SurvivalClassType,
    private classNumber: string | null,
    private securityLevel: string,
    private legitimacy: Legitimacy,
    private dangerLevel: string,
    private iconUrl: string,
    private description: string,
  ) {}

  getId(): number | undefined {
    return this.id;
  }

  getType(): SurvivalClassType {
    return this.type;
  }

  getClassNumber(): string | null {
    return this.classNumber;
  }

  getSecurityLevel(): string {
    return this.securityLevel;
  }

  getLegitimacy(): Legitimacy {
    return this.legitimacy;
  }

  getDangerLevel(): string {
    return this.dangerLevel;
  }

  getIconUrl(): string {
    return this.iconUrl;
  }

  getDescription(): string {
    return this.description;
  }

  changeType(newType: SurvivalClassType): void {
    this.type = newType;
  }

  changeClassNumber(newClassNumber: string | null): void {
    this.classNumber = newClassNumber;
  }

  changeSecurityLevel(newSecurityLevel: string): void {
    this.securityLevel = newSecurityLevel;
  }

  changeLegitimacy(newLegitimacy: Legitimacy): void {
    this.legitimacy = newLegitimacy;
  }

  changeDangerLevel(newDangerLevel: string): void {
    this.dangerLevel = newDangerLevel;
  }

  changeIconUrl(newIconUrl: string): void {
    this.iconUrl = newIconUrl;
  }

  changeDescription(newDescription: string): void {
    this.description = newDescription;
  }
}
