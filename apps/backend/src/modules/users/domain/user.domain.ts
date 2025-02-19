import { User, UserRole } from '@le-journal/shared-types';
import { Exclude } from 'class-transformer';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class UserDomain extends User {
  @Property('id')
  id!: string;

  @Property('email', "User's email")
  email!: string;

  @Property('role', "User's role")
  role!: UserRole;

  @Property('name', "User's name")
  name!: string;

  @Property('createdAt', 'Creation date')
  createdAt!: Date;

  @Property('updatedAt', 'Last update date')
  updatedAt!: Date;

  // TODO rien à faire ici ça
  @Exclude()
  googleRefreshToken!: string;

  // TODO rien à faire ici ça
  @Exclude()
  googleScopes!: string[];

  @Property('avatar', "User's avatar URL")
  avatar!: string;

  @Property('googleId', "User's Google ID")
  googleId!: string;

  constructor(user: UserDomain) {
    super();
    Object.assign(this, user);
  }
}
