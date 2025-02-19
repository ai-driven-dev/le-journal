import { IsNotEmpty, IsUUID } from 'class-validator';

export class SetupProjectDto {
  @IsUUID()
  @IsNotEmpty()
  projectId!: string;
}
