import { Image } from '../../image/domain/Image';
import { Legitimacy, SurvivalClassType } from './enums/survival-class.enum';

export class SurvivalClassEntity {
  constructor(
    private readonly id: number | undefined,
    private type: SurvivalClassType,
    private classNumber: string | null,
    private securityLevel: string,
    private legitimacy: Legitimacy,
    private dangerLevel: string,
    private iconImage: Image,
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

  getIconImage(): Image {
    return this.iconImage;
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

  changeIconImage(newIconImage: Image): void {
    this.iconImage = newIconImage;
  }

  changeDescription(newDescription: string): void {
    this.description = newDescription;
  }
}
