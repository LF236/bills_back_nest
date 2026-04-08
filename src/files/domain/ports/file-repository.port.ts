import { CreateFileDto } from "src/files/application/dtos/create-file.dto";
import { FileEntity } from "../entities/file.entity";

export interface FileRepositoryPort {
  save(fileToCreate: CreateFileDto) : Promise<FileEntity>;
  find(id: string) : Promise<FileEntity | null>;
  getDefaultAvatar(type: string) : Promise<FileEntity | null>;
}