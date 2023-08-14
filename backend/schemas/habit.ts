import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'habit',
  title: 'Habit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'bestStreak',
      title: 'BestStreak',
      type: 'number',
    }),
    defineField({
      name: 'currentStreak',
      title: 'CurrentStreak',
      type: 'number',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: {type: 'user'},
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'array',
      of: [
        {
          name: 'dateOfHabit',
          title: 'DateOfHabit',
          type: 'object',
          fields: [{name: 'date', type: 'string', title: 'date'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
