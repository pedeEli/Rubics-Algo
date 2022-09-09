import {createProtectedRouter} from './protected-router'
import z, {ZodType} from 'zod'

import {ollNameRegex, ollSectionRegex, pllNameRegex, pllSectionRegex} from '@/utils/cube'
import EventEmitter from 'events'

const fullHandSide = z.enum(['R', 'r', 'L', 'l'])
const singleFingerSide = z.enum(['U', 'u', 'D', 'd', 'F', 'f', 'B', 'b', 'x', 'y', 'z', 'M', 'E', 'S'])
const finger = z.enum(['Thumb', 'Index Finger', 'Middle Finger', 'Ring Finger', 'Pinky Finger'])
const hand = z.enum(['Left Hand', 'Right Hand'])
const thumbPosition = z.enum(['Front', 'Top', 'Back', 'Bottom'])

const turn = z.object({
  side: fullHandSide,
  prime: z.boolean(),
  double: z.boolean(),
  info: z.object({
    thumbPosition: thumbPosition
  }).optional()
}).or(z.object({
  side: singleFingerSide,
  prime: z.boolean(),
  double: z.literal(false),
  info: z.object({
    finger, hand
  }).optional()
}).or(z.object({
  side: singleFingerSide,
  prime: z.boolean(),
  double: z.literal(true),
  info: z.object({
    first: z.object({finger, hand}),
    second: z.object({finger, hand})
  }).optional()
})))

const algo = z.object({
  info: z.string().optional(),
  turns: z.array(
    turn.or(z.object({
      info: z.string().optional(),
      turns: z.array(turn)
    }))
  )
})

const ee = new EventEmitter()

export const algorithms = createProtectedRouter()
  .mutation('add', {
    input: z.object({
      type: z.literal('oll'),
      section: z.string().regex(ollSectionRegex) as ZodType<Cube.OLLSection>,
      name: z.string().regex(ollNameRegex) as ZodType<Cube.OLLName>,
      algo
    }).or(z.object({
      type: z.literal('pll'),
      section: z.string().regex(pllSectionRegex) as ZodType<Cube.PLLSection>,
      name: z.string().regex(pllNameRegex) as ZodType<Cube.PLLName>,
      algo
    })),
    resolve: async ({input, ctx}) => {
      const algo = await ctx.prisma.algorithm.create({
        data: {
          algorithm: input.algo,
          name: input.name,
          section: input.section,
          type: input.type,
          user: {
            connect: {id: ctx.session.user.id} 
          }
        },
        include: {
          user: true
        }
      })

      console.log(algo.algorithm)
    }
  })