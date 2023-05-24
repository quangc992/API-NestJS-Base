import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { ClientAccount } from '@prisma/client';
import { Prisma } from '@prisma/client';


@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async getAccountById(
    accountWhereUniqueInput: Prisma.ClientAccountWhereUniqueInput,
  ): Promise<ClientAccount | null> {
    return this.prisma.clientAccount.findUnique({
      where: accountWhereUniqueInput,
    });
  }

  async getAccountFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientAccountWhereUniqueInput;
    where?: Prisma.ClientAccountWhereInput;
    orderBy?: Prisma.ClientAccountOrderByWithRelationInput;
  }): Promise<ClientAccount[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.clientAccount.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAccount(data: Prisma.ClientAccountCreateInput): Promise<object> {
    return this.prisma.clientAccount.create({
      data,
    });
  }

  async updateAccount(params: {
    where: Prisma.ClientAccountWhereUniqueInput;
    data: Prisma.ClientAccountUpdateInput;
  }): Promise<ClientAccount> {
    const { where, data } = params;
    return this.prisma.clientAccount.update({
      data,
      where,
    });
  }

  async deleteAccount(
    where: Prisma.ClientAccountWhereUniqueInput,
  ): Promise<ClientAccount> {
    return this.prisma.clientAccount.delete({
      where,
    });
  }
}
