import { PrimaryKey, Property } from "@mikro-orm/postgresql";


export abstract class BaseEntity {
  
  @PrimaryKey()
  id!: number;

  @Property({default: true})
  isActive: boolean;

  @Property({defaultRaw: 'now()'})
  createdAt: Date;

  @Property({defaultRaw:'now()', onUpdate: () => new Date()})
  updatedAt: Date;
}