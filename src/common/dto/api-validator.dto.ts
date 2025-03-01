import { IsNumberString } from "class-validator";

export class IdParamDto {
  @IsNumberString()
  id: number;
}

export class EmisorParamDto {
  @IsNumberString()
  emisorId: number;
}

export class EmisorRelationParamDto {
  @IsNumberString()
  emisorId: number;

  @IsNumberString()
  id: number;
}