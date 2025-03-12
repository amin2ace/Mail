import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'File' })
export class File {
  @PrimaryColumn('uuid')
  fileId: string;

  @Column()
  userId: string;

  @Column()
  fileSize: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @BeforeInsert()
  generateFileId() {
    this.fileId = uuidv4();
  }
}
