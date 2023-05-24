import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { ClientLogin } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async getAuthById(
    authWhereUniqueInput: Prisma.ClientLoginWhereUniqueInput,
  ): Promise<ClientLogin | null> {
    return this.prisma.clientLogin.findUnique({
      where: authWhereUniqueInput,
    });
  }

  async getSingleAuthByLoginName(params: {
    LoginName?: string;
  }): Promise<ClientLogin | null> {
    const { LoginName } = params;
    const singleAuth = await this.prisma.clientLogin.findFirst({
      where: {
        LoginName,
      },
    });
    return singleAuth ?? null;
  }
  
  async getMany(): Promise<any> {
    const singleAuth = await this.prisma.clientLogin.findMany();
    return singleAuth ;
  }
  
  async getAuthFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientLoginWhereUniqueInput;
    where?: Prisma.ClientLoginWhereInput;
    orderBy?: Prisma.ClientLoginOrderByWithRelationInput;
  }): Promise<ClientLogin[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.clientLogin.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAuth(data: Prisma.ClientLoginCreateInput): Promise<ClientLogin> {
    return this.prisma.clientLogin.create({
      data,
    });
  }

  async updateAuth(params: {
    where: Prisma.ClientLoginWhereUniqueInput;
    data: Prisma.ClientLoginUpdateInput;
  }): Promise<ClientLogin> {
    const { where, data } = params;
    return this.prisma.clientLogin.update({
      data,
      where,
    });
  }

  async deleteAuth(
    where: Prisma.ClientLoginWhereUniqueInput,
  ): Promise<ClientLogin> {
    return this.prisma.clientLogin.delete({
      where,
    });
  }
}
