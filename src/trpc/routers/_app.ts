import prisma from '@/lib/db';
import {  createTRPCRouter, protectedProcedure } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx})=>{
    console.log('Session user:', ctx.auth.user.id);
    return prisma.user.findMany({
      where : {
        id : ctx.auth.user.id
      }
    });
  }),
  testAi : protectedProcedure.mutation(async ()=>{
    await inngest.send({
      name : "execute/ai"
    })
    return { success : true, message : "AI execution triggered" };
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;