import { NotFoundError } from "../erros/index.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  userName: string;
  weightInGrams: number;
  heightInCentimeters: number;
  age: number;
  bodyFatPercentage: number;
}

interface OutputDto {
  userId: string;
  userName: string;
  weightInGrams: number;
  heightInCentimeters: number;
  age: number;
  bodyFatPercentage: number;
}

export class UpsertUserTrainData {
  async execute(dto: InputDto): Promise<OutputDto> {
    const user = await prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundError("Workout session not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: dto.userId },
      data: {
        weightInGrams: dto.weightInGrams,
        heightInCentimeters: dto.heightInCentimeters,
        age: dto.age,
        bodyFatPercentage: dto.bodyFatPercentage,
      },
    });

    return {
      userId: updatedUser.id,
      userName: updatedUser.name!,
      weightInGrams: updatedUser.weightInGrams!,
      heightInCentimeters: updatedUser.heightInCentimeters!,
      age: updatedUser.age!,
      bodyFatPercentage: updatedUser.bodyFatPercentage!,
    };
  }
}
